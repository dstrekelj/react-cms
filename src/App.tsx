import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { Context as CmsContext } from "./cms/context/CmsContext";
import { DataTable } from "./components/DataTable";

function App() {
  const ctx = useContext(CmsContext);
  const [state, setState] = useState({
    data: [],
    meta: { offset: 1, limit: 10, total: 100, totalPages: 10 },
  });
  const location = useLocation();

  useEffect(() => {
    fetch("https://api.mock/api/users" + location.search)
      .then((response) => response.json())
      .then((json) => setState(json));
  }, [location.search]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. {ctx.theme}
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
            <DataTable<{ id: number; username: string }>
              data={state.data}
              meta={state.meta}
            />
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
