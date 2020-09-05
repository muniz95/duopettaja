import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import { store } from "./redux/store";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV !== "production") {
  // tslint:disable-next-line: no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React);
}

/* eslint-disable no-undef */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root"));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
