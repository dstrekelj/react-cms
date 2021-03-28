import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to="/">Index</Link>
        <Link to="/users">Users</Link>
        <Switch>
          <Route exact path="/users">
            Users
          </Route>
          <Route exact path="/">
            Index
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
