/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { About, ActionComp, Home, Comp5, RandomPic } from "../../components";
import { rowStyle, styles } from "../common";
// import { JsonForm } from "../../../components/json-form/JsonForm";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // JsonForm,
};

// components section

export const routes = {};

routes.routeOne = {
  "1.container": {
    // col no
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
          colSize: 1,
        },
        "1.2.1.bodyHeaderRow": {
          rowConfig: {
            // rowSize: 1,
            rowStyle: rowStyle,
          },
          bodyHeader: {
            colSize: 1,
            idx: "About",
            label: "bodyHeader-changed at 1st",
          },
        },
      },
    },
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
    },
    "1.2.bodyCol": {
      rowConfig: {
        // rowSize: 1,
        // rowStyle: rowStyle,
      },
      layout: {
        colConfig: {
          colSize: 1,
        },
        "1.2.1.bodyHeaderRow": {
          bodyHeader: {
            // colSize: 1,
            idx: "About",
            label: "bodyHeader-changed at 2nd",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: "10%",
              backgroundColor: "skyblue",
            },
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            // colSize: 1,
            idx: "About",
            label: "bodyContent",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: "85%",
              backgroundColor: "red",
            },
          },
        },
        "1.2.3.bodyFooterRow": {
          bodyFooter: {
            // colSize: 1,
            idx: "Home",
            label: "bodyFooter",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              backgroundColor: "yellow",
              height: "5%",
            },
          },
        },
      },
    },
  },
};

routes.routeThree = {
  // row no
  "1.container": {
    // col no
    "1.1.leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "none" },
        },
      },
    },
    "1.2.bodyCol": {
      rowConfig: {
        // rowSize: 1,
        // rowStyle: rowStyle,
      },
      layout: {
        colConfig: {
          colSize: 1,
        },
        "1.2.1.bodyHeaderRow": {
          rowConfig: {
            // rowSize: 1,
            rowStyle: { display: "none" },
          },
        },
        "1.2.2.bodyContentRow": {
          rowConfig: {
            // rowSize: 1,
            rowStyle: { height: "100%" },
          },
          bodyContent: {
            // colSize: 1,
            idx: "About",
            label: "bodyContent-changed1",
            colStyle: {
              borderColor: "cyan",
              borderWidth: 4,
              height: "100%",
              backgroundColor: "red",
            },
          },
        },
        "1.2.3.bodyFooterRow": {
          rowConfig: {
            // rowSize: 1,
            rowStyle: { display: "none" },
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
};

export const appConfig = {
  /// 1st layout
  componentsSet,
  links,
  layout: {
    // row no
    "1.container": {
      rowConfig: {
        // rowSize: 1,
        // rowStyle: { height: "100%" },
      },
      // col no
      "1.1.leftNavCol": {
        layout: {
          // colConfig: {
          //   colSize: 1,
          //   colStyle: { backgroundColor: "grey" },
          // },
          "1.1.leftNavHeaderRow": {
            // row no
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: {
                borderColor: "cyan",
                borderWidth: 4,
                height: "100%",
                backgroundColor: "lightgreen",
              },
            },
          },
        },
      },
      "1.2.bodyCol": {
        rowConfig: {
          // rowSize: 1,
          // rowStyle: { height: "100%" },
        },
        layout: {
          colConfig: {
            colSize: 2,
            colStyle: {
              backgroundColor: "grey",
            },
          },
          "1.2.1.bodyHeaderRow": {
            rowConfig: {
              // rowSize: 1,
              // rowStyle: { height: "100%" },
            },
            bodyHeader: {
              // col no
              colSize: 2,
              idx: "About",
              label: "bodyHeader",
              colStyle: {
                borderColor: "cyan",
                alignSelf: "center",
                borderWidth: 4,
                height: "100%",
                backgroundColor: "skyblue",
              },
            },
          },
        },
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
  "leftNavHeader-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeOne"]);
    },
  },

  "bodyHeader-changed at 1st-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeTwo"]);
    },
  },
  "bodyContent-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeThree"]);
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