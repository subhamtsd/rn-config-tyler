/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  AlertBox,
  Comp5,
  Home,
  JsonForm,
  ListEntities,
  NavigationBar,
  RandomPic,
  RenderList,
  TabComponent,
} from "../../components";
import { rowStyle, styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  JsonForm,
  ListEntities,
  RenderList,
  NavigationBar,
  TabComponent,
  AlertBox,
};
export const routes = {};
routes.routeOne = {
  // row no
  "1container": {
    // col no
    "11leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "none" },
        },
      },
    },
    "12bodyCol": {
      layout: {
        colConfig: {
          colSize: 11,
        },
        "121bodyHeaderRow": {
          rowConfig: {
            rowSize: 2,
            rowStyle: rowStyle,
          },
          bodyHeader: {
            colSize: 1,
            idx: "About",
            label: "bodyHeader-changed at 1st",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "none",
              borderWidth: 4,
              height: "100%",
              backgroundColor: "skyblue",
            },
          },
        },
      },
    },
  },
};

routes.routeTwo = {
  // row no
  "1container": {
    // col no
    "11leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "none" },
        },
      },
    },
    "12bodyCol": {
      layout: {
        colConfig: {
          colSize: 11,
        },
        "121bodyHeaderRow": {
          rowConfig: {
            rowSize: 2,
            rowStyle: rowStyle,
          },
          bodyHeader: {
            colSize: 1,
            idx: "About",
            label: "bodyHeader-changed at 2nd",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "none",
              borderWidth: 4,
              height: "50%",
              backgroundColor: "skyblue",
            },
          },
          bodyHeader1: {
            colSize: 1,
            idx: "About",
            label: "bodyHeader1",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "none",
              borderWidth: 4,
              height: "50%",
              backgroundColor: "red",
            },
          },
        },
        "122bodyContentRow": {
          bodyContent: {
            colSize: 1,
            idx: "Home",
            label: "bodyContent",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "none",
              borderWidth: 4,
              height: "50%",
              backgroundColor: "yellow",
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
            colStyle: { display: "none" },
          },
          bodyHeader1: {
            colSize: 11,
            idx: "About",
            label: "bodyHeader1-changed 1st",
            colStyle: {
              height: "100%",
            },
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            colStyle: {
              display: "none",
            },
          },
        },
      },
    },
  },
};

// show listing below the form
routes.showListing = () => {
  return {
    "1container": {
      "12bodyCol": {
        layout: {
          "121bodyHeaderRow": {
            bodyHeader: {
              idx: "Comp5",
              label: "bodyContent-changed",
            },
          },
        },
      },
    },
  };
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

const _formData = {
  phone: 8654787549,
  otp: 654789,
};

const schema = {
  type: "object",
  properties: {
    phone: { type: "number" },
    otp: { type: "number" },
  },
};

const uiSchema = {
  phone: {
    "ui:title": "Phone No. ",
  },
};

export const appConfig = {
  /// 1st layout
  componentsSet,
  links, // FIXME: links mess up the styling in dynamic page transitions. pls look at the fix
  layout: {
    // row no
    "1container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      // col no
      "11leftNavCol": {
        layout: {
          colConfig: {
            colSize: 3,
            colStyle: { backgroundColor: "grey" },
          },
          "11leftNavHeaderRow": {
            // row no
            rowConfig: {
              rowSize: 1,
            },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "NavigationBar",
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
      "12bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
          },
          "121bodyHeaderRow": {
            rowConfig: {
              rowSize: 8,
            },
            bodyHeader: {
              // col no
              idx: "JsonForm",
              label: "bodyHeader",
              colStyle: {
                borderColor: "cyan",
                backgroundColor: "skyblue",
              },
              passProps: {
                _formData: { ..._formData },
                schema,
                uiSchema,
              },
            },
          },
          "122notificationRow": {
            rowConfig: {
              rowSize: 2.5,
            },
            notification: {
              // col no
              idx: "AlertBox",
              label: "notification",
              passProps: {
                color: "danger",
                message: "Lorem ipsum idorm message.",
                heading: "Message Below",
                messageAction: "Close",
              },
              colStyle: {
                margin: 5,
              },
            },
          },
          "122bodyContentRow": {
            rowConfig: {
              rowSize: 12,
            },
            bodyContent: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "bodyContent",
              colStyle: {
                borderColor: "red",
                height: "90%",
                backgroundColor: "lightgray",
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
  // FIXME: fix the below logic to be run in component load phase for each mounting like componentDidMount
  $appInit: () => {},

  // the below logic to be run in component load phase for each mounting like componentDidMount
  "bodyHeader-$init": () => {
    // setAppState({
    //   $global: {
    //     key: "Loaded...",
    //   },
    // });
  },

  //<label>-<element-id> : <handler>
  "leftNavHeader-button-one": {
    // <event> :: <handler>
    onPress: () => {
      // components section
    },
  },
  "bodyHeader-form": {
    // form data mutator
    onSuccess: (setLayoutConfig, setAppState, appState, args) => {
      console.log(args.params.values);
      // PREPARING THE DATA
      // FIXME: MOVE THIS TO EVENT MANAGEMENT SIDE
    },
    // onSubmit: (setLayoutConfig) => {
    //   console.log("submitted");
    //   // FIXME: fill in data
    //   // setLayoutConfig(routes.showListing);
    // },
  },
  "bodyHeader-changed at 1st-btn-one": {
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeTwo"]);
    },
  },
  "bodyHeader1-btn-one": {
    onPress: (setLayoutConfig) => {
      setLayoutConfig(routes["routeThree"]);
    },
  },
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (elId, setLayoutConfig, setAppState, appState) => {
  console.log(`elId is ${elId}`);
  const elEvents = {};
  events[elId] &&
    Object.keys(events[elId]).map((eventName) => {
      elEvents[eventName] = (args) => {
        return events[elId] &&
          events[elId][eventName] &&
          events[elId][eventName]
          ? events[elId][eventName](
              setLayoutConfig,
              setAppState,
              appState,
              args
            )
          : {};
      };
    });
  return elEvents;
};

// logic for init logic for components `<label>-$init` in events object
export const getInitEvents = (elId, setLayoutConfig, setAppState, appState) => {
  if (elId && events[elId]) {
    events[elId](setLayoutConfig, setAppState, appState);
  }
};
