import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import EachShoutOut from "./components/EachShoutOut";
import Header from "./components/Header";
import ShoutOutList from "./components/ShoutOutList";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/routes/:to">
            <EachShoutOut />
          </Route>
          <Route path="/">
            <ShoutOutList />
          </Route>
        </Switch>
      </div>{" "}
    </Router>
  );
}

export default App;
