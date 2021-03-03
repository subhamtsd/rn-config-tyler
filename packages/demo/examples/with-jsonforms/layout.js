/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { About, Home, NavigationBar, JsonForm } from "../../components";
import { rowStyle, styles } from "../common";
// All component which will be rendered
export const componentsSet = {
  Home,
  About,
  JsonForm,
  NavigationBar,
};

// FIXME: uncomment below for remote config
// export const fetchConfig = {
//   method: "GET",
//   url: "http://l77vj.mocklab.io/json/config/with-jsonforms",
//   mode: "cors",
// };

// components section
const _formData = {
  phone: 8654787549,
  otp: 654789,
};

const schema = {
  type: "object",
  properties: {
    phone: { type: "number" },
    phone1: { type: "number" },
    otp: { type: "number" },
  },
};

const uiSchema = {
  phone: {
    "ui:title": "Phone No. ",
  },
  otp: {
    "ui:otp": "OTP",
  },
};
// render a grid layout as per the configuration
export const getComponents = () => {
  return {
    Home,
    About,
    JsonForm,
    NavigationBar,
  };
};

export const routes = {};
routes.routeOne = {
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
              height: "100vh",
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
              height: "50vh",
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
              height: "50vh",
              backgroundColor: "red",
            },
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            colSize: 1,
            idx: "Home",
            label: "bodyContent",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "none",
              borderWidth: 4,
              height: "50vh",
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
              height: "100vh",
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

// *************************************************
//  Layout config
// *************************************************

// links row
export const links = {
  "/": {
    containerStyle: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Home",
  },
  "/about": {
    containerStyle: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Feed",
  },
  "/contact": {
    containerStyle: styles.navItem,
    linkStyle: styles.tabName,
    linkText: "Messages",
  },
};

export const appConfig = {
  links,
  componentsSet,
  /// 1st layout
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
            colSize: 3,
            colStyle: { backgroundColor: "grey" },
          },
          "1.1.leftNavHeaderRow": {
            // row no
            rowConfig: {
              rowSize: 1,
              rowStyle: rowStyle,
            },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: {
                borderColor: "cyan",
                borderWidth: 4,
                height: "100vh",
                backgroundColor: "lightgreen",
              },
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
            colStyle: {
              backgroundColor: "grey",
            },
          },
          "1.2.1.bodyHeaderRow": {
            rowConfig: {
              rowSize: 1,
              rowStyle: rowStyle,
            },
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "JsonForm",
              label: "bodyHeader",
              colStyle: {
                borderColor: "cyan",
                alignSelf: "center",
                borderWidth: 4,
                height: "80vh",
                backgroundColor: "skyblue",
              },
              passProps: {
                _formData,
                schema,
                uiSchema,
                _onSuccess: (e) => {},
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

console.log(routes);
