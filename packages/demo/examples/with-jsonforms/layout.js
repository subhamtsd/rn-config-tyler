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
  phone1: 8888888888,
  otp: 654789,
  recievemsgs: true,
};

const schema = {
  type: "object",
  properties: {
    phone: { type: "number" },
    phone1: { type: "number" },
    otp: { type: "number" },
    recievemsgs: { type: "boolean" },
  },
};

const uiSchema = {
  phone: {
    "ui:title": "Phone No. ",
  },
  phone1: {
    "ui:title": "Phone No. ",
  },
  otp: {
    "ui:otp": "OTP",
  },
  recievemsgs: {
    "ui:title": "Are you okay if you recieve emails from our side?",
    "ui:widget": "radio",
    // "ui:widgetProps": {
    //   style: { backgroundColor: "lightgrey" },
    // },
    "ui:options": {
      inline: "true",
    },
    // "ui:containerProps": {
    //   style: { paddingTop: 10 },
    // },
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
routes.routeOne = {};

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

// export const appConfig = {
//   links,
//   componentsSet,
//   /// 1st layout
//   layout: {
//     // row no
//     "1.container": {
//       "1.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 3,
//             colStyle: { backgroundColor: "grey" },
//           },
//           "1.1.leftNavHeaderRow": {
//             // row no
//             // rowConfig: {
//             //   rowSize: 1,
//             //   rowStyle: rowStyle,
//             // },
//             leftNavHeader: {
//               // col no
//               colSize: 1,
//               idx: "Home",
//               label: "leftNavHeader",
//               colStyle: {
//                 borderColor: "cyan",
//                 borderWidth: 4,
//                 height: "100vh",
//                 backgroundColor: "skyblue",
//               },
//             },
//           },
//         },
//       },
//       "1.2.bodyCol": {
//         // rowConfig: {
//         //   rowSize: 1,
//         //   rowStyle: rowStyle,
//         // },
//         layout: {
//           colConfig: {
//             colSize: 11,
//             colStyle: {
//               backgroundColor: "grey",
//             },
//           },
//           "1.2.1.bodyHeaderRow": {
//             // rowConfig: {
//             //   rowSize: 1,
//             //   rowStyle: rowStyle,
//             // },
//             bodyHeader: {
//               // col no
//               colSize: 1,
//               idx: "JsonForm",
//               label: "bodyHeader",
//               colStyle: {
//                 borderColor: "cyan",
//                 alignSelf: "center",
//                 borderWidth: 4,
//                 height: "80vh",
//                 backgroundColor: "lightgreen",
//               },
//               passProps: {
//                 _formData,
//                 schema,
//                 uiSchema,
//                 _onSuccess: (e) => {},
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

export const appConfig = {
  tw: true,
  componentsSet,
  layout: {
    0: {
      0: {
        idx: "Home",
        label: "headerBar",
        size: 2,
        colClass: "bg-white-500 p-1 text-sm text-red",
      },
    },
    1: {
      0: {
        idx: "About",
        label: "navigationBar",
        size: 15,
        colClass: "bg-red-500 p-1 text-sm text-red",
      },
      1: {
        layout: {
          0: {
            0: {
              idx: "Home",
              label: "actionComponent",
              size: 5,
              colClass: "bg-yellow-500 p-1 text-sm text-red",
            },
          },
          1: {
            0: {
              idx: "About",
              label: "tabComponent",
              size: 5,
              colClass: "bg-green-500 p-1 text-sm text-red",
            },
          },
          2: {
            0: {
              idx: "Home",
              label: "jsonForm",
              size: 30,
              colClass: "bg-pink-500 p-1 text-sm text-red",
            },
            1: {
              idx: "About",
              label: "defaultScreen",
              size: 60,
              colClass: "bg-purple-500 p-1 text-sm text-red",
            },
          },
          layoutConfig: {
            size: 83,
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

export const events = {};

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
