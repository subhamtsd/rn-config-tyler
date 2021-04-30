import React from "react";
import { Text, View } from "react-native";

const rowStyle = {};
const styles = {};

export const routes = {};

const Home = ({ label }) => {
  return (
    <View>
      <Text style={{}}>Home *** {label}</Text>
    </View>
  );
};

const About = ({ label }) => {
  return (
    <View>
      <Text style={{}}>About *** {label}</Text>
    </View>
  );
};

export const componentsSet = {
  Home,
  About,
};

export const appConfig = {
  tw: true,
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
  colClass: "bg-gray-700 border text-2xl h-150 w-100",
  layout: {
    // row no
    0: {
      colClass: "h-150",
      // col no
      0: {
        colClass: "p-1 h-144 w-80",
        layout: {
          0: {
            colClass: "p-1 h-14 mb-14 w-80",
            0: {
              // col no
              idx: "Home",
              label: "left-nav",
              colClass: "bg-red-500 border p-2 text-2xl h-14",
            },
          },
          1: {
            colClass: "p-1 h-84 mb-84",
            0: {
              // col no
              idx: "Home",
              label: "body",
              colClass: "bg-red-300 border p-2 text-2xl h-84",
            },
          },
          2: {
            colClass: "p-1 h-14 mb-14",
            0: {
              // col no
              idx: "About",
              label: "footer-1",
              colClass: "bg-red-400 border p-2 text-2xl h-14",
            },
          },
        },
      },

      // col no
      1: {
        colClass: "p-1 h-144 w-420",
        layout: {
          0: {  
            colClass: "p-1 h-14 mb-14 w-420",
            0: {
              // col no
              idx: "Home",
              label: "left-nav",
              colClass: "bg-red-500 border p-2 text-2xl h-14",
            },
          },
          1: {
            colClass: "p-1 h-84 mb-84",
            0: {
              // col no
              idx: "Home",
              label: "body",
              colClass: "bg-red-300 border p-2 text-2xl h-84",
            },
          },
          2: {
            colClass: "p-1 h-14 mb-14",
            0: {
              // col no
              idx: "About",
              label: "footer-1",
              colClass: "bg-red-400 border p-2 text-2xl h-14",
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
