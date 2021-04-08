/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const routes = {};

routes.routeOne = {
  // row no
  "1.container": {
    "1.1.leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "none" },
        },
      },
    },
    "1.2.bodyCol": {
      layout: {
        colConfig: {
          colSize: 11,
        },
        "1.2.1.bodyHeaderRow": {
          bodyHeader: {
            colSize: 2,
            idx: "About",
            label: "bodyHeader",
            children: <Text testID="c2">Hi user</Text>, //children 

            colStyle: { borderWidth: 2, height: "100vh" },
          },
          bodyHeader1: {
            colSize: 8,
            idx: "About",
            label: "bodyHeader1",
            colStyle: { borderWidth: 2, height: "100vh" },
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            colStyle: { display: "none" },
          },
          bodyContent1: {
            colStyle: { display: "none" },
          },
          bodyContent2: {
            colStyle: { display: "none" },
          },
        },
      },
    },
  },
  "2.container": {
    footer: {
      colSize: 1,
      idx: "Home",
      label: "home",
      colStyle: { borderWidth: 4 },
    },
  },
};

const links = {
  "/": {
    style: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Home",
  },
  "/about": {
    style: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Feed",
  },
};

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
  /// 1st layout
  componentsSet,
  links,
  layout: {
    "1.container": {
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 3,
          },
          "1.1.leftNavHeaderRow": {
            leftNavHeader: {
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: { borderWidth: 1, height: "14vh" },
            },
          },
          "1.1.leftNavBodyRow": {
            leftNavBody: {
              colSize: 1,
              idx: "Home",
              label: "leftNavBody",
              children: <Text testID="c1">Hi</Text>, //children 

              colStyle: { borderWidth: 1, height: "86vh" },
            },
          },
        },
      },
      "1.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
          },
          "1.2.1.bodyHeaderRow": {
            rowConfig: {
              rowSize: 1,
              rowStyle: rowStyle,
            },
            bodyHeader: {
              colSize: 6,
              idx: "RandomPic",
              label: "bodyHeader",

              colStyle: { borderWidth: 1, height: "40vh" },
            },
            bodyHeader1: {
              idx: "Home",
              label: "bodyHeader1",
              colStyle: { borderWidth: 2, height: "15vh" },
            },
          },
          "1.2.2.bodyContentRow": {
            bodyContent: {
              colSize: 5,
              idx: "Home",
              label: "bodyContent",
              colStyle: { borderWidth: 3, borderColor: "blue" },
            },
            bodyContent1: {
              colSize: 2,
              idx: "About",
              label: "bodyContent1",
              colStyle: { borderWidth: 3, borderColor: "red" },
            },
            bodyContent2: {
              colSize: 4,
              idx: "RandomPic",
              label: "bodyContent2",
              colStyle: { borderWidth: 4, borderColor: "black" },
            },
          },
        },
      },
    },
    "2.container": {
      footer: {
        colSize: 1,
        idx: "ActionComp",
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
      setLayoutConfig(routes["routeOne"]);
    },
  },
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (elId, setLayoutConfig, setAppState) => {
  const elEvents = {};
  events[elId] &&
    Object.keys(events[elId]).map((eventName) => {
      elEvents[eventName] = () =>
        events[elId] && events[elId][eventName] && events[elId][eventName]
          ? events[elId][eventName](setLayoutConfig, setAppState)
          : {};
    });
  return elEvents;
};
