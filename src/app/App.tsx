import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { UsersFeature } from "../features/users/UsersFeature";
import { PostsFeature } from "../features/posts/PostsFeature";
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
          <UsersFeature />
        </Route>
        <Route exact path="/posts">
          <PostsFeature />
        </Route>
        <Route>
          <Redirect to="/users" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
