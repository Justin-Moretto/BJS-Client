import React from "react";
import Hand from "./Hand"

import './CSS/Table.css'

import { checkResult } from "../hooks/helpers.js"

export default function Table(props) {
  // const deck = props.deck;
  const dealer = props.dealer;
  const hands = props.hand;

  const activeHandHighlight = (index) => {
    return (index === props.currentHand)
  }

  const dealerCount = dealer.cards.length;


  const displayHands = hands.map((hand, index) => {

    if (hand.cards.length > 1) hand.result = checkResult(hands[index], dealer)

    return (
      <Hand
        name={`Hand${index + 1}`}
        cardLibrary={props.cardLibrary}
        value={hands[index].value}
        cards={hands[index].cards}
        active={activeHandHighlight(index)}
        result={hand.result}
        dealerCount={dealerCount}
        bet={hands[index].bet}
        turn={props.turn}
      />
    );
  })


  const winPercentage = () => {
    if (props.stats.totalHands > 0) {
      return Math.floor((props.stats.totalWins / props.stats.totalHands).toFixed(2) * 100)
    } else {
      return "0"
    }
  }
  const blackjackPercentage = () => {
    if (props.stats.totalHands > 0) {
      return Math.floor((props.stats.totalBlackjacks / props.stats.totalHands).toFixed(2) * 100)
    } else {
      return "0"
    }
  };

  return (
    <section>
      
      <div id="stats">
        <p>Wins: {props.stats.totalWins}</p>
        <p>Win percentage: {winPercentage()}%</p>
        <p>Blackjacks: {props.stats.totalBlackjacks}</p>
        <p>Blackjack percentage: {blackjackPercentage()}%</p>
      </div>

      <div id="dealer">
        <Hand
          name="Dealer"
          cardLibrary={props.cardLibrary}
          value={dealer.value}
          cards={dealer.cards}
          turn={props.turn}
        />
      </div>

      <div id="player" >
        {displayHands}
      </div>


    </section>
  );
}