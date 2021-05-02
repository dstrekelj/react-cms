import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { UsersList } from "../features/users";
import { PostsList } from "../features/posts";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/users">
          <UsersList />
        </Route>
        <Route exact path="/posts">
          <PostsList />
        </Route>
        <Route>
          <Redirect to="/users" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
