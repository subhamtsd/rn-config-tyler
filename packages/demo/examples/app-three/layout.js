import React from "react";
import { Text } from "react-native";
import { About } from "../../components/About";
import { ActionComp } from "../../components/ActionComp";
import { Comp5 } from "../../components/Comp5";
// import { JsonForm } from "./components/JsonForm";
import { Home } from "../../components/Home";
import { RandomPic } from "../../components/RandomPic";
import { rowStyle, styles } from "../common";
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

routes.routeOne = {
  "1.container": {
    // col no
    "1.1.leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "block" },
        },
      },
      // layout: null,
    },
    // "1.2.bodyCol": {
    //   layout: {
    //     colConfig: {
    //       colSize: 11,
    //     },
    //     "1.2.1.bodyHeaderRow": {
    //       bodyHeader: {
    //         idx: "ActionComp",
    //       },
    //     },
    //     "1.2.2.bodyContentRow": {
    //       bodyContent: {
    //         idx: "RandomPic",
    //       },
    //     },
    //     "1.2.3.bodyFooterRow": {
    //       bodyFooter: {
    //         idx: "About",
    //       },
    //     },
    //   },
    // },
  },
};

routes.routeTwo = {
  // row no
  "1.container": {
    // col no
    "1.1.leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "none" },
        },
      },
      // layout: null,
    },
    "1.2.bodyCol": {
      layout: {
        colConfig: {
          colSize: 11,
        },
        "1.2.1.bodyHeaderRow": {
          bodyHeader: {
            idx: "ActionComp",
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            idx: "RandomPic",
          },
        },
        "1.2.3.bodyFooterRow": {
          bodyFooter: {
            idx: "About",
          },
        },
      },
    },
  },
};

// *************************************************
//  Layout config
// *************************************************

// links row
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
  "/contact": {
    style: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Messages",
  },
};

export const appConfig = {
  /// 1st layout
  componentsSet,
  links, // FIXME: links mess up the styling in dynamic page transitions. pls look at the fix
  layout: {
    // row no
    "1.container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      // col no
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          //   "1.1.leftNavHeaderRow": {
          //     // row no
          //     rowConfig: {
          //       rowSize: 0.5,
          //       rowStyle: rowStyle,
          //     },
          //     leftNavHeader: {
          //       // col no
          //       colSize: 1,
          //       idx: "Home",
          //       label: "leftNavHeader",
          //       colStyle: { borderWidth: 1, height: "10vh" },
          //     },
          //   },
          "1.1.leftNavBodyRow": {
            rowConfig: {
              rowSize: 5,
              // rowStyle: rowStyle,
            },
            leftNavBody: {
              // col no
              colSize: 1,
              idx: "NavigationBar",
              label: "navBar",
              colStyle: { borderWidth: 1, height: "100vh" },
            },
          },
        },
      },
      "1.2.bodyCol": {
        rowConfig: {
          rowSize: 1,
          rowStyle: rowStyle,
        },
        layout: {
          colConfig: {
            colSize: 11,
            colStyle: { borderColor: "cyan", borderWidth: 4 },
          },
          "1.2.1.bodyHeaderRow": {
            rowConfig: {
              rowSize: 1,
              // rowStyle: rowStyle,
              rowStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
            },
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "TabComponent",
              label: "tabComponent",
              colStyle: { borderColor: "blue", borderWidth: 0, height: "10vh" },
            },
          },
          "1.2.2.bodyContentRow": {
            rowConfig: {
              rowSize: 12,
              // rowStyle: rowStyle,
              rowStyle: { borderColor: "red", borderWidth: 2, height: "80vh" },
            },
            bodyContent: {
              // col no
              idx: "Home",
              colSize: 1,
              label: "bodyContent",
              colStyle: { borderColor: "blue", borderWidth: 0, height: "80vh" },
            },
          },
          //   "1.2.3.bodyFooterRow": {
          //     rowConfig: {
          //       rowSize: 1,
          //       // rowStyle: rowStyle,
          //       rowStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
          //     },
          //     bodyFooter: {
          //       // col no
          //       idx: "Home",
          //       colSize: 1,
          //       label: "bodyFooter",
          //       colStyle: { borderColor: "blue", borderWidth: 0, height: "10vh" },
          //     },
          //   },
        },
      },
    },
    "2.container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
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
      setLayoutConfig(routes["routeTwo"]);
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
  },

  "bodyHeader-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setLayoutConfig(routes["routeOne"]);
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
