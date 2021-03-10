/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  JsonForm,
  Charts,
} from "../../components";
import { styles, rowStyle } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  JsonForm,
  Charts,
};

// components section

export const routes = {};

routes.routeOne = {
  "1.container": {
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
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "bar",
            },
          },
          bodyHeader1: {
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader1",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "pie",
              data: [
                {
                  name: "Total cases",
                  recovery: 50,
                  color: "grey",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Total deaths",
                  recovery: 6,
                  color: "red",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Total recoverd",
                  recovery: 20,
                  color: "yellow",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Active cases",
                  recovery: 4,
                  color: "green",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Closed cases",
                  recovery: 20,
                  color: "orange",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
              ],
              ChartConfig: {
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "red",
                backgroundGradientTo: "blue",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              },
              // height: 200,
              // ChartWidth: 450,
            },
          },
        },
        "1.2.2.bodyHeaderRow": {
          rowConfig: {
            rowSize: 1,
            rowStyle: rowStyle,
          },
          bodyHeader2: {
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader2",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "stacked",
            },
          },
          bodyHeader3: {
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader3",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "contribution",
            },
          },
        },
        "1.2.3.bodyHeaderRow": {
          rowConfig: {
            rowSize: 1,
            rowStyle: rowStyle,
          },
          bodyHeader4: {
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader4",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "progress",
            },
          },
          bodyHeader5: {
            colSize: 5,
            idx: "Charts",
            label: "bodyHeader5",
            colStyle: {
              borderColor: "cyan",
              alignSelf: "center",
              borderWidth: 4,
              height: 300,
              backgroundColor: "skyblue",
            },
            //react-native-chart-kit -- https://github.com/indiespirit/react-native-chart-kit
            passProps: {
              type: "line",
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

export const appConfig = {
  /// 1st layout
  componentsSet,
  links, // FIXME: links mess up the styling in dynamic page transitions. pls look at the fix
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
                height: 700,
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
              idx: "About",
              label: "bodyHeader",
              colStyle: {
                borderColor: "cyan",
                alignSelf: "center",
                borderWidth: 4,
                height: 500,
                backgroundColor: "skyblue",
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
