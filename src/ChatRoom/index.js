import React from "react";
import { Redirect } from "react-router-dom";
import List from "./List";
import Submit from "./Submit";
import PusherListener from "./PusherListener";

function ChatRoom() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <List />
      <Submit />
      <PusherListener />
    </div>
  );
}

export default ChatRoom;
