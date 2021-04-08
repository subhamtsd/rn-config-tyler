import React from "react";
import { Text } from "react-native";
import { About } from "../../components/About";
import { ActionComp } from "../../components/ActionComp";
import { Comp5 } from "../../components/Comp5";
// import { JsonForm } from "./components/JsonForm";
import { Home } from "../../components/Home";
import { RandomPic } from "../../components/RandomPic";
import { NavigationBar } from "../../components/NavigationBar";
import { TabComponent } from "../../components/TabComponent";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  NavigationBar,
  TabComponent,
  // JsonForm
};

// components section
const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

export const routes = {};

// *************************************************
//  Layout config
// *************************************************



export const appConfig = {
  componentsSet,
  layout: {
    "1.container": {
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "1.1.leftNavBodyRow": {
            leftNavBody: {
              colSize: 1,
              idx: "NavigationBar",
              label: "navBar",
              colStyle: { borderWidth: 1, height: "100vh" },
            },
          },
        },
      },
      "1.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 10,
            colStyle: { borderColor: "cyan", borderWidth: 4  },
          },
          "1.2.1.bodyHeaderRow": {
            bodyHeader: {
              colSize: 1,
              idx: "TabComponent",
              label: "tabComponent",
              colStyle: { borderColor: "blue", borderWidth: 1, height: "5vh" },
            },
          },
          "1.2.2.bodyContentRow": {
            bodyContent: {
              idx: "Home",
              colSize: 1,
              label: "bodyContent",
              colStyle: { borderColor: "blue", borderWidth: 1, height: "95vh" },
            },
          },
        },
      },
    },
    "2.container": {
      footer: {
        // colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 },
      },
    },
  },
};