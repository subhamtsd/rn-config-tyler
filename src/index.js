/* global __DEV__ */
import WrappedApp from "./WrappedApp";
import React from "react";

// **************************************************
// TODO uncomment below, and comment section at very bottom for non-codesandbox
// **************************************************
// const { registerRootComponent } = require("expo");
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

// **************************************************
// TODO: below section to make it run on codesandbox.io
// **************************************************
const { render } = require("react-dom");
const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  rootElement
);
