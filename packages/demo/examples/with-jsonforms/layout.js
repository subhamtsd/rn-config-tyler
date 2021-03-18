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
  phone1:8888888888,
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
  phone1:{
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
};


// *************************************************
//  Layout config
// *************************************************

// links row
const links = {
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
