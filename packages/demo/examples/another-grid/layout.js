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
  // JsonForm
};
export const routes = {};

// components section
const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};
routes.routeOne = {
  0: {
    0: {
      // layout: null // evict the earlier 1st column, other way is to hide it
      layout: {
        colConfig: {
          // colSize: 0, // *** change the colSize

          colStyle: { display: "none" }, // *** hide the 1st column
        },
      },
    },
    1: {
      layout: {
        colConfig: {
          colSize: 8, // *** change the colSize
        },

        1: {
          // *** below we are adding a new row(this will replace current layout config values), and this will have 2 columns
          0: {
            // col no
            colSize: 10,
            idx: "RandomPic",
            label: "comp5 >> changed at runtime 1",
          },
          1: {
            // col no
            colSize: 10,
            idx: "RandomPic",
            label: "comp5 >> changed at runtime 2",
          },
        },
      },
    },
  },
};

routes.routeTwo = {
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
        colConfig: {
          colSize: 3, // *** change the colSize
        },

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

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
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
    "/contact": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Messages",
    },
  },
  layout: {
    colConfig: {
      colSize: 1,
    },
    // row no
    0: {
      rowConfig: {
        rowSize: 1,
        style: rowStyle,
      },
      // col no
      0: {
        layout: {
          colConfig: {
            colSize: 2,
          },
          0: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "home",
              colStyle: { borderWidth: 4 },
            },
          },
          1: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "About",
              label: "about",
              colStyle: { borderWidth: 4 },
            },
            1: {
              // col no
              colSize: 1,
              idx: "Comp5",
              label: "comp5",
              colStyle: { borderWidth: 4 },
            },
          },
          2: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 4,
              idx: "RandomPic",
              label: "rpic",
              colStyle: { borderWidth: 4 },
            },
          },
        },
      },
      1: {
        layout: {
          colConfig: {
            colSize: 5,
          },
          0: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 24,
              idx: "Comp5",
              label: "comp5.11",
              schema,
              colStyle: { borderWidth: 4 },
            },
          },
          1: {
            // row no
            rowConfig: {
              rowSize: 12,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Comp5",
              label: "comp5.12",
              schema,
              colStyle: { borderWidth: 4 },
            },
          },
          2: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Comp5",
              label: "comp5.13",
              schema,
              colStyle: { borderWidth: 4 },
            },
          },
        },
      },
    },
    1: {
      // row no
      rowConfig: {
        rowSize: "0.21",
        style: rowStyle,
      },
      0: {
        // col no
        colSize: 1,
        idx: "ActionComp",
        label: "actioncomp",
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
      // setLayoutConfig(routes["routeTwo"]);
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
  //<label>-<element-id>
  "leftNavHeader-btn-two": {
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
