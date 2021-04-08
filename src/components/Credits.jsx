import { Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Popup.css";
import "./CSS/Rules.css";

export default function Credits({ onClose }) {
  return (
    <div>
        <h1> Created by: </h1>
        <ul>
          <li>
            <a href="https://github.com/Justin-Moretto" target="_blank">
              Justin Moretto
            </a>
          </li>
          <li>
            <a href="https://github.com/Josh-lerner" target="_blank">
              Josh Lerner
            </a>
          </li>
        </ul>
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
