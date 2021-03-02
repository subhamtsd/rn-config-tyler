/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Text } from "react-native";
import { removeKeyFromUrl } from "../../helper/helper";
import { routes } from "../routes/routesConfig";

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
      console.log("args.params.values : : : : : ", args.params.values);
      const body = args.params.values;
      const res1 = fetch(
        `http://localhost:8080/transaction-web/${appState.global.tsdApp.activeAction.endPoint}`,
        {
          method: appState.global.tsdApp.activeAction.httpMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((res) => res.json())
        .then((_data) => {
          const _formData = args.params.values;
          setAppState({
            global: {
              tsdApp: {
                listComponent: {
                  data: _data,
                },
              },
            },
          });
          console.log(appState?.$global?.list_of_complaints?.data);
          setLayoutConfig(routes["search"]);
        });
    },
  },
  "editComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, args) => {
      console.log("args.params.values : : : : : ", args.params.values);

      console.log("appState in Edit event1 : : : ", appState);
      const keyName = appState.global.tsdApp.activeTab.name.toLowerCase();
      console.log("keyName : : : :", keyName); // Organisation --> organisation
      const res1 = fetch(
        `http://localhost:8080/transaction-web/${
          appState.global.tsdApp.editComponent.action.endPoint
        }${
          appState.global.tsdApp.listComponent.selectedRowKey[`${keyName}Key`]
        }`,
        {
          method: appState.global.tsdApp.editComponent.action.httpMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args.params.values),
        }
      )
        .then((res) => res.json())
        .then((_data) => {
          // setAppState({
          //   global: {
          //     tsdApp: {
          //       listComponent: {
          //         data: _data,
          //       },
          //     },
          //   },
          // });

          setAppState({
            global: {
              tsdApp: {
                listComponent: {
                  selectedRowKey: _data,
                },
              },
            },
          });
          console.log("response from edit api : : : :: ", _data);
          setLayoutConfig(routes["detail"]);
        });
    },
  },
  "detailComponent-edit": {
    onPress: (setLayoutConfig, setAppState, appState) => {
      console.log("setLayoutConfig : : : : ", setLayoutConfig);
      console.log("setAppState : : : : ", setAppState);
      console.log("appState : : : : ", appState);
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
