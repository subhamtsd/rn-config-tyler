/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
} from "../../../components";
import { styles, rowStyle } from "../../common";
import merge from "deepmerge";
import { nextTick } from "process";

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
};
export const routes = {};

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
    "1container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      "12bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
          },
          "121bodyHeaderRow": {
            rowConfig: {
              rowSize: 4,
            },
            bodyHeader: {
              // col no
              idx: "About",
              label: "bodyHeader",
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
  $appInit: (setLayoutConfig, setAppState) => {},

  // the below logic to be run in component load phase for each mounting like componentDidMount
  "bodyHeader-$init": (setLayoutConfig, setAppState, appState) => {
    setAppState({ $global: { ...appState?.$global, key: "Loaded..." } });
  },

  //<label>-<element-id> : <handler>
  "leftNavHeader-button-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState, appState) => {
      // components section
    },
  },
  "bodyHeader-form": {
    // form data mutator
    onSuccess: (setLayoutConfig, setAppState, appState, args) => {
      console.log(args.params.values);
      // PREPARING THE DATA
      // FIXME: MOVE THIS TO EVENT MANAGEMENT SIDE
      const res = fetch(
        "https://run.mocky.io/v3/15c75559-42b2-45ed-bcf2-06c48aa51bdf"
      )
        .then((res) => res.json())
        .then((_data) => {
          const _formData = args.params.values;

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

          console.log(`*** _data.ticketDetails`);
          console.log(_data.ticketDetails);

          setAppState({
            $global: {
              list_of_complaints: {
                data: _data.ticketDetails,
              },
              bodyHeader: {
                form: {
                  formData: args.params.values,
                  schema,
                  uiSchema,
                },
              },
            },
          });
          console.log(appState?.$global?.list_of_complaints?.data);

          setLayoutConfig(
            {
              // "1container.12bodyCol.layout.121bodyHeaderRow.bodyHeader.idx":
              //   "Home",
              "1container.12bodyCol.layout.122bodyContentRow.bodyContent.idx":
                "RenderList",
              "1container.12bodyCol.layout.122bodyContentRow.bodyContent.label":
                "bodyContent-changed",
              "1container.12bodyCol.layout.122bodyContentRow.bodyContent.passProps": {
                data: appState?.$global?.list_of_complaints?.data,
                searchFields: [
                  "name",
                  "description",
                  "category",
                  "subCategory",
                ],
                visibleKeys: ["name", "category", "subCategory"],
                titleStyle: null,
                dataStyle: { color: "darkblue" },
              },
            },
            true
          );
        });
      // FIXME: below change is not immedeately reflected , fix the bug
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
    console.log(`*** getInitEvents ${elId}`);
    events[elId](setLayoutConfig, setAppState, appState);
  }
};
