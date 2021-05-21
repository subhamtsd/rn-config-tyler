/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { About, ActionComp, Home, Comp5, RandomPic } from "../../components";
import TailwindForm from "../../components/TailwindForm";
import { styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  TailwindForm,
};

// components section

export const routes = {};
routes.one = {};

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
  componentsSet,
  links,
  layout: {
    "1.container": {
      "1.1.leftNavCol": {
        colClass:
          "border-rounded-1 text-bg-blue-100 border-blue-400 text-blue-700",
        layout: {
          "1.1.leftNavHeaderRow": {
            leftNavHeader: {
              colSize: 1,
              idx: "TailwindForm",
              label: "home",
              colStyle: {
                height: "100%",
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
