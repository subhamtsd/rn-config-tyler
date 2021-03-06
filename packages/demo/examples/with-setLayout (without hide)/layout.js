/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Platform } from "react-native";
import { About, ActionComp, Home, Comp5, RandomPic } from "../../components";
import { rowStyle, styles } from "../common";
// import { JsonForm } from "../../../components/json-form/JsonForm";

// FIXME: move this to f/w
const dim = (dimensionNo) => {
  if (Platform.OS === "web") {
    return dimensionNo+"pc";
  } else {
    return dimensionNo+"%";
  }
}

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
};

// components section

export const routes = {};

routes.routeZero = {
  "1.container": {
    "1.1.leftNavCol": {
      layout: {
        "1.1.leftNavHeaderRow": {
          leftNavHeader: {
            colSize: 1,
            idx: "Home",
            label: "home",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: dim(70),
              backgroundColor: "lightgreen",
            },
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
      colStyle: { height: dim(20) },
    },
  },
};

routes.routeOne = {
  "1.container": {
    "1.1.leftNavCol": {
      layout: {
        "1.1.leftNavHeaderRow": {
          leftNavHeader: {
            colSize: 1,
            idx: "About",
            label: "about",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: dim(60),
              backgroundColor: "red",
            },
          },
        },
      },
    },
  },
  "2.container": {
    footer: {
      colSize: 1,
      idx: "ActionComp",
      label: "footer1",
      colStyle: { height: dim(20) },
    },
  },
};

routes.routeTwo = {
  "1.container": {
    "1.1.leftNavCol": {
      layout: {
        "1.1.leftNavHeaderRow": {
          leftNavHeader: {
            colSize: 1,
            idx: "About",
            label: "about changed -1",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: dim(50),
              backgroundColor: "red",
            },
          },
        },
        "1.2.leftNavHeaderRow": {
          leftNavHeader1: {
            colSize: 1,
            idx: "RandomPic",
            label: "randompic",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: dim(50),
              backgroundColor: "blue",
            },
          },
        },
      },
    },
  },
  "2.container": {
    footer: {
      colSize: 1,
      idx: "ActionComp",
      label: "footer2",
      colStyle: { height: dim(20) },
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
};

export const appConfig = {
  /// 1st layout
  componentsSet,
  links,
  layout: {
    // row no
    "1.container": {
      // rowConfig: {
      //   rowSize: 1,
      //   rowStyle: { height: "100%" },
      // },
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 1,
            colStyle: { backgroundColor: "grey", height: dim(70) },
          },
          "1.1.leftNavHeaderRow": {
            // rowConfig: {
            //   rowSize: 1,
            //   rowStyle: { height: "100%" },
            // },
            leftNavHeader: {
              colSize: 1,
              idx: "Home",
              label: "home",
              colStyle: {
                borderColor: "cyan",
                borderWidth: 4,
                height: dim(70),
                backgroundColor: "lightgreen",
              },
            },
          },
        },
      },
    },
    "2.container": {
      // rowConfig: {
      //   rowSize: 0.2,
      // },
      footer: {
        // col no
        colSize: 1,
        idx: "ActionComp",
        label: "footer",
        colStyle: { height: dim(5) },
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
  //<label>-<element-id> : <handler>
  "home-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeOne"]);
    },
  },



  "footer-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeOne"]);
    },
  },

  "about-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeTwo"]);
    },
  },

  "footer1-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeTwo"]);
    },
  },

  "footer1-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeZero"]);
    },
  },

  "footer2-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
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
