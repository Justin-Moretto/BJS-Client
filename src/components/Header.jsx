import React, { useEffect, useState } from "react"
import Popup from "./Popup"
import Rules from './Rules';
import Strategy from './Strategy';
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Header.css";
import "./CSS/Popup.css"
import "./CSS/NewHeader.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header(props, send) {

  const [selectedMenu, setSelectedMenu] = useState(null)

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Nav className="mr-auto">
              <button onClick={() => setSelectedMenu("rules")}>Rules </button>
              <Popup open={selectedMenu === "rules"} onClose={() => setSelectedMenu(null)}>
                <Rules onClose={() => setSelectedMenu(null)}></Rules>
              </Popup>

              <button onClick={() => setSelectedMenu("strategy")}>Strategy</button>
              <Popup open={selectedMenu === "strategy"} onClose={() => setSelectedMenu(null)}>
                <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
              </Popup>
          </Nav>
      </Navbar>
    )
  }
