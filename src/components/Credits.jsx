import { Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Popup.css";
import "./CSS/Rules.css";
import "./CSS/Credits.css";
import Josh from "./images/linkedin.jpg"
import Justin from "./images/linkedin.jpg"


export default function Credits({ onClose }) {
  return (
    <div>
        <h1> Created by: </h1>
          <img src={Josh} alt="DP" class="DP" />
            <a href="https://github.com/Justin-Moretto" target="_blank" class="name">
              <span>  Justin Moretto </span>
            </a>
                      <img src={Josh} alt="DP" class="DP" />
            <a href="https://github.com/Josh-lerner" target="_blank"class="name">
              <span>  Josh Lerner </span>
            </a>
        <Row>
          <Col>
            <Button variant="outline-danger" onClick={onClose}>
              close
            </Button>
          </Col>
        </Row>
    </div>
  );
}
