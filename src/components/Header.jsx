import React, { useEffect, useState } from "react"
import Popup from "./Popup"
import Login from "./Login"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import Registration from "./Registration"
import Leaderboard from "./Leaderboard"
import Rules from './Rules';
import Strategy from './Strategy';
import { Navbar, NavDropdown, Nav, Button } from "react-bootstrap"
import axios from 'axios';
import useApplicationData from "../hooks/useApplicationData"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./CSS/Header.css";
import "./CSS/Popup.css"
import "./CSS/NewHeader.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header(props, send) {

  const [selectedMenu, setSelectedMenu] = useState(null)

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setSelectedMenu("rules")}>Rules</NavDropdown.Item>
              <Popup open={selectedMenu === "rules"} onClose={() => setSelectedMenu(null)}>
                <Rules onClose={() => setSelectedMenu(null)}></Rules>
              </Popup>
              <NavDropdown.Item onClick={() => setSelectedMenu("strategy")}>Strategy</NavDropdown.Item>
              <Popup open={selectedMenu === "strategy"} onClose={() => setSelectedMenu(null)}>
                <Strategy onClose={() => setSelectedMenu(null)}></Strategy>
              </Popup>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
