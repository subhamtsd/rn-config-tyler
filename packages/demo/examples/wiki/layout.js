/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { About, Home } from "../../components";

// All component which will be rendered
export const componentsSet = {
  Home,
  About,
};

export const routes = {};
routes.routeOne = {
  containerOne: {
    f1: {
      layout: {
        colConfig: {
          colSize: 3,
          colStyle: { backgroundColor: "white" },
        },
        col1: {
          left: {
            colSize: 1, 
            idx: "About", 
            label: "routeChanged", 
            colStyle: { borderWidth: 1, height: "100vh" }, 
          },
        },
      },
    },

    f2: {
      layout: {
        colConfig: {
          colSize: 9,
          colStyle: { backgroundColor: "green" },
        },
        col2: {
          right: {
            colSize: 1,
            idx: "About",
            label: "right",
            colStyle: { borderWidth: 1, height: "100vh" },
          },
        },
      },
    },
  },
};

routes.routeTwo = {
  "containerOne.f1.layout.col1.left.idx":"Home",
  "containerOne.f1.layout.colConfig.colSize":5,
  "containerOne.f1.layout.colConfig.colStyle.backgroundColor":"yellow",
  "containerOne.f1.layout.col1.left.label":"dotted-layout-left-label",
  "containerOne.f2.layout.col2.right.idx":"About",
  "containerOne.f2.layout.colConfig.colSize":5,
  "containerOne.f2.layout.colConfig.colStyle.backgroundColor":"white",
  "containerOne.f2.layout.col2.right.label":"dotted-layout-right-label",
}

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
  //using exported componentsSet
  componentsSet,
  //must initialise this attribute.It is like a canvas on which we will be designing our ui
  //if you forget this then you will see loading on page and wont't able to see you ui
  layout: {
    containerOne: {
      f1: {
        layout: {
          colConfig: {
            colSize: 3,
            colStyle: { backgroundColor: "blue" },
          },
          col1: {
            left: {
              colSize: 1, // Size to column
              idx: "Home", // components which you have to use from componentsSet has to be write in front of idx attribute
              label: "left", //it will help you to inspect your element also require for getEvents
              colStyle: { borderWidth: 1, height: "100vh" }, //styling specific to column
            },
          },
        },
      },

      f2: {
        layout: {
          colConfig: {
            colSize: 9,
            colStyle: { backgroundColor: "green" },
          },
          col2: {
            right: {
              colSize: 1,
              idx: "About",
              label: "right",
              colStyle: { borderWidth: 1, height: "100vh" },
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
  "left-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig) => {
      // setLayoutConfig(routes["routeOne"],"sustain");
      // setLayoutConfig(routes["routeOne"],"copy");
      setLayoutConfig(routes["routeOne"]);


    },
  },
  "routeChanged-btn-one":{
    onPress: (setLayoutConfig) => {
      // setLayoutConfig(routes["routeTwo"],"sustain");
      // setLayoutConfig(routes["routeTwo"],"copy");
      // setLayoutConfig(routes["routeTwo"]);
      setLayoutConfig(routes["routeTwo"],"dotted");
    }
  }
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (elId, setLayoutConfig) => {
  const elEvents = {};
  events[elId] &&
    Object.keys(events[elId]).map((eventName) => {
      elEvents[eventName] = () =>
        events[elId] && events[elId][eventName] && events[elId][eventName]
          ? events[elId][eventName](setLayoutConfig)
          : {};
    });
  return elEvents;
};
