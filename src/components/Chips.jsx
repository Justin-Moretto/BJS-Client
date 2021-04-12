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
          <input type="image" class="token" onClick={props.addBet5} src={five} alt="Wrong path" height="72" length="72" />
          <input type="image" class="token" onClick={props.addBet25} src={twentyFive} alt="Wrong path" height="72" length="72" />
          <input type="image" class="token" onClick={props.addBet100} src={oneHundred} alt="Wrong path" height="72" length="72" />
          <input type="image" class="token" onClick={props.addBet500} src={fiveHundred} alt="Wrong path" height="72" length="72" />
          <input type="image" class="token" onClick={props.maxBet} src={max} alt="Wrong path" height="72" length="72" />
          <input type="image" class="token" onClick={props.clearBet} src={clear} alt="Wrong path" />
        </span>
      </div>

    </div>
  )
}