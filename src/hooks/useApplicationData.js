import { useState, useEffect } from "react";
import axios from "axios";
import { checkResult, calculateBankrollChange } from "./helpers.js"
import { Hand } from "../helpers/cardLogic";

export default function useApplicationData() {

  const [state, setState] = useState({
    cards: [],
    hand: [],
    dealer: {},
    currentHand: -1,
    turn: null,
    winnings: 0,
    bankroll: 10000,
    bet: 0,
    initBankroll: 10000,
    actions: {
      reset: {
        name: "New Bet",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      deal: {
        name: "Deal",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      switch: {
        name: "Switch",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      split: {
        name: "Split",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      double: {
        name: "Double",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      stay: {
        name: "Stay",
        enabled: false,
        execute: () => console.log("action function error"),
      },
      hit: {
        name: "Hit",
        enabled: false,
        execute: () => console.log("action function error"),
      },
    },
    stats: {
      totalWins: 0,
      totalLosses: 0,
      totalDraws: 0,
      totalBlackjacks: 0,
      totalHands: 0
    },
    connectingToServer: true
  })

  const recordStats = (hands) => {
    //  console.log(`Record Stats before: wins ${totalWins} losses ${totalLosses} draws ${totalDraws} `)
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let blackjacks = 0;
    let turnHands = 0;

    for (const hand of hands) {
      turnHands++;
      switch (hand.result) {
        case "WIN":
          wins++;
          break;
        case "LOSS":
          losses++;
          break;
        case "BUST":
          losses++;
          break;
        case "PUSH":
          draws++;
          break;
        case "BLACKJACK":
          wins++;
          blackjacks++;
          break;
      }
    }

    let stats = {
      totalWins: state.stats.totalWins + wins,
      totalLosses: state.stats.totalLosses + losses,
      totalDraws: state.stats.totalDraws + draws,
      totalBlackjacks: state.stats.totalBlackjacks + blackjacks,
      totalHands: state.stats.totalHands + turnHands
    }

    setState(prev => ({ ...prev, stats: stats }));
  }

  //Get's our card informations
  useEffect(() => {
    Promise.all([
      axios.get('https://blackjack-switch-server.herokuapp.com/api/cards',
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    ]).then((all) => {
      let hand = []
      hand[0] = new Hand();
      hand[1] = new Hand();
      let dealer = new Hand();
      let updateActions = state.actions
      updateActions.deal.enabled = true;
      setState(prev => ({
        ...prev,
        cards: all[0].data,
        hand: hand,
        dealer: dealer,
        turn: "bet",
        actions: updateActions,
        connectingToServer: false
      }))
    });
  }, []);


  const sendBankroll = () => {
    let bankroll = state.bankroll;
    return bankroll;
  }

  //betting / money handling
  const updateBankroll = (newBankroll) => {
    setState(prev => ({ ...prev, bankroll: newBankroll, initBankroll: newBankroll }));
  }

  const addBet = (amount) => {
    let bankroll = state.bankroll;
    if (amount * 2 > bankroll) {
      window.alert(`Insufficient funds! you are missing $${(amount * 2 - bankroll)}`)
    } else {
      bankroll = state.bankroll - (amount * state.hand.length);
      let bet = state.bet + amount;
      let hands = state.hand;
      for (const hand of hands) {
        hand.bet = bet;
      }
      setState(prev => ({ ...prev, hand: hands, bankroll: bankroll, bet: bet }));
    }
  }

  //updateBet is called on splits and double-downs
  const updateBet = (amount) => {
    let bankroll = state.bankroll - amount;
    setState(prev => ({ ...prev, bankroll: bankroll }));
  }

  const clearBet = () => {
    let initBankroll = state.initBankroll
    let hand = []
    hand[0] = new Hand();
    hand[1] = new Hand();
    let dealer = new Hand();
    setState(prev => ({ ...prev, bankroll: initBankroll, bet: 0, hand: hand, dealer: dealer }));
  }

  ///Hand manipulation
  const updateHand = (hand) => {
    let value = 0;
    let aces = hand.ace;
    //first calculates this hand's value and aces
    for (const card of hand.cards) {
      let cardInfo = state.cards.find(info => info.name === card);
      value += cardInfo.value;
      if (cardInfo.ace === true) aces++;
    }
    for (let i = aces; i > 0; i--) {
      if (value > 21) {
        value -= 10;
      }
    }
    //checks if splitting should be possible
    if (state.turn !== "dealer") {
      if (hand.cards.length === 2) {
        let card1value = state.cards.find(x => x.name === hand.cards[0]).value;
        let card2value = state.cards.find(x => x.name === hand.cards[1]).value;
        if (card1value === card2value) {
          hand.canSplit = true;
        } else {
          hand.canSplit = false;
        }
      } else {
        hand.canSplit = false;
      }
    }
    hand.value = value;
    setState(prev => ({ ...prev, [hand]: hand }));
  }

  const spawnSplitHand = (newHand) => {
    let updateHands = state.hand;
    let currentHand = state.currentHand
    if (currentHand < updateHands.length) {
      updateHands.splice((currentHand + 1), 0, newHand)
    } else {
      updateHands.push(currentHand);
    }
    setState(prev => ({ ...prev, hand: updateHands }))
  }

  const verifyResults = async (hands) => {
    let hand = hands;
    for (let i = 0; i < hand.length; i++) {
      hand[i].result = checkResult(hand[i], state.dealer);
      updateHand(hand[i]);
    }
    return hand;
  }

  //updateActions sets available actions for the player based on the current turn/phase.
  //player's bankroll is updated in back-end databse on reveal phase
  const updateActions = (currentHand, phase) => {
    let updateActions = state.actions
    switch (phase) {
      case "reveal":
        updateActions.reset.enabled = true;
        updateActions.split.enabled = false;
        verifyResults(state.hand).then(res => {
          calculateBankrollChange(res, state.bankroll).then(res => {
            updateBankroll(res);
          })
        })
        break;
      case "bet":
        updateActions.deal.enabled = true;
        updateActions.reset.enabled = false;
        updateActions.split.enabled = false;
        break;
      case "deal":
        updateActions.deal.enabled = false;
        updateActions.reset.enabled = false;
        updateActions.split.enabled = false;
        break;
      case "player":
        let swapStatus = (currentHand === 0 && state.hand[1].cards.length === 2 && state.hand.length === 2)
        updateActions.deal.enabled = false;
        updateActions.hit.enabled = true;
        updateActions.stay.enabled = true;
        updateActions.split.enabled = state.hand[currentHand].canSplit;
        updateActions.switch.enabled = swapStatus;
        updateActions.double.enabled = true;
        break;
      case "dealer":
        updateActions.deal.enabled = false;
        updateActions.hit.enabled = false;
        updateActions.stay.enabled = false;
        updateActions.split.enabled = false;
        updateActions.switch.enabled = false;
        updateActions.double.enabled = false;
        break;
      default:
        updateActions.deal.enabled = false;
        updateActions.hit.enabled = false;
        updateActions.stay.enabled = false;
        updateActions.split.enabled = false;
        updateActions.switch.enabled = false;
        updateActions.double.enabled = false;
    }
    setState(prev => ({ ...prev, currentHand: currentHand, actions: updateActions, turn: phase }))
  }

  return {
    state, updateHand,
    spawnSplitHand, updateActions,
    updateBankroll, addBet, clearBet, updateBet, sendBankroll, recordStats
  }
}