import React, { Component } from "react";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";
import rootStore from "./store";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={rootStore()}>
          <Route />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
