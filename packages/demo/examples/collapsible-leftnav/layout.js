import React from "react";
import { Text } from "react-native";
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  JsonForm,
  ListEntities,
  RenderList,
  NavigationBar,
  TabComponent,
  Cal,
} from "../../components";
import { styles, rowStyle } from "../common";
// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
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

// dotted notation config route
routes.routeOne = {
  "1container.11leftNavCol.layout.colConfig.colStyle.display": "block",
  "1container.12bodyCol.layout.colConfig.colSize": 11,
  "1container.12bodyCol.layout.121bodyHeaderRow.bodyHeader.idx": "ActionComp",
  "1container.12bodyCol.layout.122bodyContentRow.bodyContent.idx": "RandomPic",
  "1container.12bodyCol.layout.123bodyFooterRow.bodyFooter.idx": "ActionComp",
};

// dotted notation config route
routes.routeTwo = {
  "1container.11leftNavCol.layout.colConfig.colStyle.display": "none",
  "1container.12bodyCol.layout.colConfig.colSize": 11,
  "1container.12bodyCol.layout.121bodyHeaderRow.bodyHeader.idx": "ActionComp",
  "1container.12bodyCol.layout.122bodyContentRow.bodyContent.idx": "RandomPic",
  "1container.12bodyCol.layout.123bodyFooterRow.bodyFooter.idx": "About",
};

// expanded (non-dottend notation) route config
routes.routeThree = {
  // row no
  "1container": {
    "11leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "block" },
        },
      },
      // layout: null,
    },
    // col no
    "12bodyCol": {
      layout: {
        colConfig: {
          colSize: 18,
        },
        "122bodyContentRow": {
          bodyContent: {
            idx: "Home",
          },
        },
      },
    },
  },
};

// *************************************************
//  Layout config
// *************************************************



export const appConfig = {
  /// 1st layout
  componentsSet,
  layout: {

    "1container": {
      "11leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "11leftNavHeaderRow": {
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "11leftNavBodyRow": {
            leftNavBody: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavBody",
              colStyle: { borderWidth: 1, height: "90vh" },
            },
          },
        },
      },
      "12bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
            colStyle: { borderColor: "cyan", borderWidth: 4 },
          },
          "121bodyHeaderRow": {

            bodyHeader: {
              // col no
              colSize: 1,
              idx: "About",
              label: "bodyHeader",
              colStyle: { borderColor: "blue", borderWidth: 0, height: "10vh" },
            },
          },
          "122bodyContentRow": {

            bodyContent: {
              idx: "Home",
              colSize: 1,
              label: "bodyContent",
              colStyle: { borderColor: "blue", borderWidth: 0, height: "80vh" },
            },
          },
          "123bodyFooterRow": {

            bodyFooter: {
              idx: "Home",
              colSize: 1,
              label: "bodyFooter",
              colStyle: { borderColor: "blue", borderWidth: 0, height: "10vh" },
            },
          },
        },
      },
    },
    "2container": {

      footer: {
        // col no
        colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 },
      },
    },
  },
};

// *************************************************
//  "../applications/app-one/screen-one";
// *************************************************
// bind events to
//  logic that binds

export const events = {
  /// <label>
  //<label>-<element-id> : <handler>
  "leftNavHeader-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setLayoutConfig(routes["routeTwo"], "dotted");
    },
  },
  //<label>-<element-id>
  "leftNavHeader-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      // setLayoutConfig(routes["routeOne"]);
      setAppState({
        bodyFooter: {
          ui: "ActionComp",
          props: { label: "bodyFooter" },
          children: <Text>Hello from RandomPic</Text>,
        },
        bodyContent: {
          ui: "RandomPic",
          props: { label: "actioncomp-2" },
          children: null,
        },
      });
    },

    "bodyContentFooter-btn-one": {
      // <event> :: <handler>
      onPress: (setLayoutConfig, setAppState) => {
        setLayoutConfig(routes["routeTwo"]);
      },
    },
  },

  "bodyHeader-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setLayoutConfig(routes["routeOne"], "dotted");
    },
  },

  // <label>
  "leftNavBody-btn-two": {},
  "leftNavBody-btn-one": {},
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (elId, setLayoutConfig, setAppState) => {
  const elEvents = {};
  events[elId] &&
    Object.keys(events[elId]).map((eventName) => {
      // console.log({ [eventName]: events[elId][eventName] });
      elEvents[eventName] = () =>
        events[elId] && events[elId][eventName] && events[elId][eventName]
          ? events[elId][eventName](setLayoutConfig, setAppState)
          : {};
    });
  // console.log(elEvents);
  return elEvents;
};
