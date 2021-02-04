import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Popup.css"
import strategy from "./images/bj_switch.gif"


export default function Strategy( { onClose } ) {
    return (

        <div>
                <div>
                    <img src={strategy} alt="Whoops"></img>
                </div>
                <Button variant="outline-danger" onClick={onClose} >close</Button>
        </div>
    )
}



