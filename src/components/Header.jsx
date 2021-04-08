import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import Rules from "./Rules";
import Strategy from "./Strategy";
import Credits from "./Credits";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Header.css";
import "./CSS/Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header(props, send) {
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <button onClick={() => setSelectedMenu("rules")}>Rules </button>
        <Popup
          open={selectedMenu === "rules"}
          onClose={() => setSelectedMenu(null)}
        >
          <Rules onClose={() => setSelectedMenu(null)}></Rules>
        </Popup>

        <button onClick={() => setSelectedMenu("strategy")}>Strategy</button>
        <Popup
          open={selectedMenu === "strategy"}
          onClose={() => setSelectedMenu(null)}
        >
          <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
        </Popup>

        <button onClick={() => setSelectedMenu("credits")}>Credits</button>
        <Popup
          open={selectedMenu === "credits"}
          onClose={() => setSelectedMenu(null)}
        >
          <Credits onClose={() => setSelectedMenu(null)}></Credits>
        </Popup>

        <button onClick={() => setSelectedMenu("credits")}>Statistics</button>
        <Popup
          open={selectedMenu === "credits"}
          onClose={() => setSelectedMenu(null)}
        >
          <Credits onClose={() => setSelectedMenu(null)}></Credits>
        </Popup>
      </Nav>

      <h3>
        <span id="bj"> Blackjack </span>
        <span id="switch"> Switch! </span>
      </h3>
    </Navbar>
  );
}
