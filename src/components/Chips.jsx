import five from "./images/chip5.png"
import twentyFive from "./images/chip25.png"
import oneHundred from "./images/chip100.png"
import fiveHundred from "./images/chip500.png"
import max from "./images/linkedin.jpg"
import clear from "./images/delete.png"

import './CSS/Chips.css'
export default function Chips(props) {

  let totalBet = 0;
  let bankroll = props.bankroll;
  let tokens = "tokens";
  let message = ""

  for (const hand of props.hand) {
    totalBet += hand.bet;
  }
  if (props.turn !== "bet") {
    tokens = tokens + "-hidden"
  }

  if (bankroll === 0) {
    message = "Refresh to reset bankroll"
  } else {
    message = `Bankroll: $${bankroll}`
  }


  return (
    <div class="betting">
      <div class="Chips">
        <div class="bankroll">
          <h2> {message} </h2>
          <h2 class="totalBet"> Total bet: ${totalBet} </h2>
        </div>
        <span class={tokens}>
          <input type="button" class="token" id="five"onClick={props.addBet5} value="5"/>
          <input type="button" class="token" id="twenty-five"onClick={props.addBet25} value="25" />
          <input type="button" class="token" id="one-hundred"onClick={props.addBet100} value="100"/>
          <input type="button" class="token" id="five-hundred"onClick={props.addBet500}  value="500"/>
          <input type="button" class="token" id="max" onClick={props.maxBet} value="Max"/>
          <input type="button" class="token" id="clear"onClick={props.clearBet}  value="Clear"/>
        </span>
      </div>

    </div>
  )
}