import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Login from "./Login";

function Router() {
  return (
    <Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/chat" component={ChatRoom} />
    </Fragment>
  );
}

export default Router;
