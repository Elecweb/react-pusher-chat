import { Component } from "react";
import Pusher from "pusher-js";
import { compose } from "ramda";
import { inject, observer } from "mobx-react";
import { baseUrl } from "../services/constants";

Pusher.logToConsole = true;

class PusherListener extends Component {
  handleNewEvent = data => {
    const { store } = this.props;
    store.messages.addMessage(data.username, data.message, data.created, false);
  };

  handlePrivateEvent = data => {
    const { store } = this.props;
    store.messages.addMessage(data.username, data.message, data.created, true);
  };

  subscribeToPusher = () => {
    this.pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
      cluster: "ap1",
      authEndpoint: baseUrl + "/pusher/auth",
      auth: {
        headers: {
          Authorization: `${sessionStorage.getItem("token") || ""}`
        }
      }
    });
    this.subscribeToPublicChannel();
    this.subscribeToPrivateChannel();
  };

  subscribeToPublicChannel = () => {
    const messageChannel = this.pusher.subscribe("message");
    messageChannel.bind("new", this.handleNewEvent);
  };

  subscribeToPrivateChannel = () => {
    const messageChannel = this.pusher.subscribe("private-message");
    messageChannel.bind("new", this.handlePrivateEvent);
  };

  componentDidMount() {
    this.subscribeToPusher();
  }

  componentWillUnmount() {
    this.pusher.unsubscribe("message");
    this.pusher.unsubscribe("private-message");
  }

  render() {
    return null;
  }
}

export default compose(
  inject("store"),
  observer
)(PusherListener);
