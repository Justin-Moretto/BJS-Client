import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
import Rules from "./components/Rules";
import Strategy from "./components/Strategy";
import { useEffect } from "react";
import firebase from "./Firebase";

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });


db.collection("users").get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
  })
})

//   .add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   })
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });

function App() {
  useEffect(() => {
    document.title = "Blackjack Switch";
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <div id="portal"></div>
      </div>
    </Router>
  );
}

export default App;
