import { Button, Form, Col, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Popup.css"
import "./CSS/Rules.css"

export default function Rules( { onClose } ) {


    return (
        <div>
            <Form>
                <h1> Blackjack Switch Rules</h1>
                <div class="rules">
                <ul>
                    <li>All rules are based on conventional blackjack unless otherwise noted.</li>
                    <li>Each player is dealt two face-up hands from 6 shuffled decks.</li>
                    <li>The player must have equal bets for both hands.</li>
                    <li>The second card of each hand can be switched prior to any other moves being made.</li>
                    <li>Blackjack pays even money.</li>
                    <li>Dealer must hit on soft 17.</li>
                    <li>If dealer has 22 it's a push, unless player has blackjack.</li>
                    <li>The European no-hole-card rule is used. Meaning the dealer is only dealt one card originally and doesn't check for Blackjack if he has a 10 or ace.</li>
                </ul>
                </div>
                <Row>
                    <Col>
                        <Button variant="outline-danger" onClick={onClose} >close</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}



