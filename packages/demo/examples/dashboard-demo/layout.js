/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  JsonForm,
    NavigationBar,
} from "../../components/index";
import { TabDashboard } from "./component-for-dashboard/TabDashboard";
import { ActionDashboard } from "./component-for-dashboard/ActionDashboard";
import { JsonFormDashboard } from "./component-for-dashboard/JsonFormDashboard";
import { DefaultScreen } from "./component-for-dashboard/DefaultScreen";
import { NavigationBarDashboard } from "./component-for-dashboard/NavigationBarDashboard";
import { HeaderDashboard } from "./component-for-dashboard/HeaderDashboard";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  JsonForm,
    NavigationBar,

  // Dashboard Demo Example Component
  TabDashboard,
  ActionDashboard,
  JsonFormDashboard,
  DefaultScreen,
  NavigationBarDashboard,
  HeaderDashboard,
};

export const routes = {};

routes.routeOne={
  "1.container": {
    "1.1.leftNavCol": {
      layout: {
        "1.1.leftNavBodyRow": {
          Header: {
            colSize: 1,
            idx: "HeaderDashboard",
            label: "header-label",
            colStyle: { borderWidth: 1, height: "10vh" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 2,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBarDashboard",
            label: "navigationBar",
            colStyle: { borderWidth:1, height: "98vh" },
            // colStyle: { borderWidth:1, height: "100vh" },

          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: { backgroundColor:"skyblue",borderWidth:1,height: "1vh" },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: { backgroundColor:"skyblue",borderWidth:1, height: "1vh" },
          },
        },
      },
    },
    "2.2.bodyCol": {
      layout: {
        colConfig: {
          colSize: 10,
        },
        "2.2.1.BodyRow": {
          actionView: {
            idx: "ActionDashboard",
            label: "actionComponent",
            colStyle: { borderWidth: 1, height: "10vh" },
          },
        },
        "2.2.2.BodyRow": {
          tabView: {
            idx: "TabDashboard",
            label: "tabComponent",
            colStyle: { borderWidth: 1, height: "10vh" },
          },
        },
        "2.2.3.BodyRow": {
          jsonFormComponent: {
            colSize: 2,
            idx: "JsonFormDashboard",
            label: "jsonFormComponent",
            colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
          },
          emptyComponent: {
            colSize: 1,
            idx: "Home",
            label: "DefaultScreenComponent",
            colStyle: { borderWidth: 1 },
          },
        },
      },
    },
  },
}

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
          "1.1.leftNavBodyRow": {
            Header: {
              colSize: 1,
              idx: "HeaderDashboard",
              label: "header-label",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
        },
      },
    },
    "2.container": {
      "2.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "2.1.leftNavBodyRow": {
            leftNavBody: {
              idx: "NavigationBarDashboard",
              label: "navigationBar",
              colStyle: { borderWidth:1, height: "98vh" },
              // colStyle: { borderWidth:1, height: "100vh" },

            },
          },
          "2.2.leftNavBodyRow": {
            leftNavBody2: {
              idx: "DefaultScreen",
              // label: "1",
              colStyle: { backgroundColor:"skyblue",borderWidth:1,height: "1vh" },
            },
          },
          "2.3.leftNavBodyRow": {
            leftNavBody3: {
              idx: "DefaultScreen",
              // label: "2",
              colStyle: { backgroundColor:"skyblue",borderWidth:1, height: "1vh" },
            },
          },
        },
      },
      "2.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 10,
          },
          "2.2.1.BodyRow": {
            actionView: {
              idx: "ActionDashboard",
              label: "actionComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.2.BodyRow": {
            tabView: {
              idx: "TabDashboard",
              label: "tabComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.3.BodyRow": {
            jsonFormComponent: {
              colSize: 2,
              idx: "JsonFormDashboard",
              label: "jsonFormComponent",
              colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
            },
            emptyComponent: {
              colSize: 1,
              idx: "DefaultScreen",
              label: "DefaultScreenComponent",
              colStyle: { borderWidth: 1 },
            },
          },
        },
      },
    },
  },
};


export const events = {
  /// <label>
  //<label>-<element-id> : <handler>
  "header-label-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
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