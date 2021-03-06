import { About } from "../../components/About";
import { ActionComp } from "../../components/ActionComp";
import { Comp5 } from "../../components/Comp5";
// import { JsonForm } from "./components/JsonForm";
import { Home } from "../../components/Home";
import { RandomPic } from "../../components/RandomPic";
import { styles } from "../common";

export const getInitEvents = () => {
  /** */
};

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // JsonForm
};

export const routes = {};

routes.routeOne = {
  0: {
    0: {
      // layout: null // evict the earlier 1st column, other way is to hide it
      layout: {
        colConfig: {
          // colSize: 0, // *** change the colSize
          colStyle: { display: "block" }, // *** hide the 1st column
        },
      },
    },
    1: {
      layout: {
        1: {
          // *** below we are adding a new row(this will replace current layout config values), and this will have 2 columns
          0: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 1",
          },
          1: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 2",
          },
        },
      },
    },
  },
};

routes.routeTwo = {
  "1.container": {
    "1.1.leftNavCol": {
      layout: null, // evict the earlier 1st column, other way is to hide it
      // layout: {
      //   colConfig: {
      //     // colSize: 0, // *** change the colSize
      //     colStyle: { display: "none" }, // *** hide the 1st column
      //   },
      // },
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
            idx: "About",
          },
        },
        "1.2.3.bodyFooterRow": {
          bodyFooter: {
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
  links: {
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
  },
  layout: {
    colConfig: {
      colSize: 1,
    },
    // row no
    "1.container": {
      //   rowConfig: {
      //     rowSize: 1,
      //     style: rowStyle,
      //   },
      // col no
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 3,
          },
          "1.1.leftNavHeaderRow": {
            // row no
            // rowConfig: {
            //   // rowSize: 1,
            //   rowStyle: {
            //     height: "10vh",
            //   },
            // },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "home",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "1.1.leftNavBodyRow": {
            // row no
            // rowConfig: {
            //   // rowSize: 1,
            //   rowStyle: {
            //     height: "90vh",
            //   },
            // },
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
      "1.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
          },
          "1.2.1.bodyHeaderRow": {
            // row no
            // rowConfig: {
            //   rowStyle: { height: "80vh" },
            // },
            bodyHeader: {
              // col no
              //   colSize: 9,
              idx: "RandomPic",
              label: "bodyHeader",
              colStyle: { borderWidth: 1, height: "40vh", flex: 0.6 },
            },
            bodyHeader1: {
              // col no
              //   colSize: 2,
              idx: "Home",
              label: "bodyHeader1",
              colStyle: { borderWidth: 2, height: "8vh", flex: 0.4 },
            },
          },
          //   bodyHeader2: {
          //     // col no
          //     colSize: 9,
          //     idx: "Home",
          //     label: "bodyHeader2",
          //     schema,
          //     colStyle: { borderWidth: 2, height: "20vh" },
          //   },

          //   "1.2.2.bodyContentCol": {
          //     layout: {
          //       colConfig: {
          //         colSize: 11,
          //       },

          "1.2.2.bodyContentRow": {
            // row no
            // rowConfig: {
            //   rowStyle: { height: "10vh" },
            // },
            // colStyle: { height: "60vh" },
            bodyContent: {
              // col no
              colSize: 5,
              idx: "Home",
              label: "bodyContent",
              colStyle: { borderWidth: 3, height: "60vh", borderColor: "blue" },
            },
            bodyContent1: {
              // col no
              colSize: 2,
              idx: "About",
              label: "aboutComponent",
              colStyle: { borderWidth: 3, borderColor: "red" },
            },
            bodyContent2: {
              // col no
              colSize: 4,
              idx: "RandomPic",
              label: "rpic",
              colStyle: { borderWidth: 4, borderColor: "black" },
            },
          },
          //     },
          //   },
        },
      },
    },
    "2.container": {
      //   // row no
      //   rowConfig: {
      //     rowSize: "0.21",
      //     style: rowStyle,
      //   },
      footer: {
        // col no
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
  "home-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      // setLayoutConfig(routes["routeTwo"]);
      setAppState({
        bodyHeader: {
          ui: "About",
          props: { label: "bodyHeader" },
          //   children: <Text>Hello from RandomPic</Text>,
        },
        bodyContent: {
          ui: "RandomPic",
          props: { label: "bodyContent" },
          children: null,
        },
      });
    },
  },
  //<label>-<element-id>
  "leftNavBody-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setLayoutConfig(routes["routeTwo"]);
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
