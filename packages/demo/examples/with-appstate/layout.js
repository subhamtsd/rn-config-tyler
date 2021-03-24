/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // JsonForm,
} from "../../components";

import { styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
};

export const getInitEvents = () => {
};

export const routes = {};

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
  /// 1st layout
  componentsSet,
  layout: {
    colConfig: {
      colSize: 1,
    },
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
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "1.1.leftNavBodyRow": {
            leftNavBody: {
              colSize: 1,
              idx: "Home",
              label: "leftNavBody",
              colStyle: { borderWidth: 1, height: "90vh" },
            },
          },
        },
      },
     c
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

export const events = {
  //<label>-<element-id> : <handler>
  "leftNavHeader-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setAppState({
        bodyHeader: {
          ui: "About",
          props: { label: "bodyHeader" },
        },
        bodyContent: {
          ui: "RandomPic",
          props: { label: "bodyContent" },
        },
      });
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
