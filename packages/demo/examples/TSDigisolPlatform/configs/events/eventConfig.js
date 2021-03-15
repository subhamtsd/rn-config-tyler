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

      console.log(
        "appState.global.tsdApp.activeAction.name : : ::  ",
        appState.global.tsdApp.activeAction.name
      );

      // const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
      //   const res1 = fetch(
      //     `http://localhost:8080/transaction-web/${endPoint}`,
      //     {
      //       method: httpMethod,
      //       // method: "POST",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(body),
      //     }
      //   )
      //     .then((res) => res.json())
      //     .then((_data) => {
      //       const _formData = args.params.values;
      //       setAppState({
      //         global: {
      //           tsdApp: {
      //             listComponent: {
      //               data: _data,
      //             },
      //           },
      //         },
      //       });
      //       // console.log(appState?.$global?.list_of_complaints?.data);
      //       setLayoutConfig(routeToRedirect);
      //     });
      // };

      const saveCreateComponentData = async (tabName, body) => {
        console.log("tabName in saveCreateComponentData : :: : : ", tabName);
        setAppState({
          global: {
            tsdApp: {
              createComponent: {
                [tabName]: body,
              },
            },
          },
        });
        // await saveCreateComponentFormLayout();
      };

      if (appState.global.tsdApp.activeAction.name === "Search") {
        body["page"] = {
          pageSize: "10",
          lastRecordKey: "0",
        };
        setAppState({
          global: {
            tsdApp: {
              searchComponent: {
                searchPayload: body,
              },
            },
          },
        });
        setLayoutConfig(routes["search"]);
        // fetchApi(
        //   appState.global.tsdApp.activeAction.endPoint,
        //   appState.global.tsdApp.activeAction.httpMethod,
        //   body,
        //   routes["search"]
        // );
      } else {
        if (appState.global.tsdApp.activeAction.name === "Create") {
          if (
            appState.global.tsdApp.activeModule.name === "Catalog" &&
            appState.global.tsdApp.activeTab.name === "Category"
          ) {
            console.log(appState.global.tsdApp.activeModule.name);
            saveCreateComponentData(
              appState.global.tsdApp.activeTab.name,
              body
            );
          }
          if (
            appState.global.tsdApp.activeModule.name === "Catalog" &&
            appState.global.tsdApp.activeTab.name === "Product"
          ) {
            console.log(appState.global.tsdApp.activeModule.name);
            saveCreateComponentData(
              appState.global.tsdApp.activeTab.name,
              body
            );
          }
        }
      }
    },
  },
  "editComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, args) => {
      // console.log("args.params.values : : : : : ", args.params.values);

      // console.log("appState in Edit event1 : : : ", appState);
      const keyName = appState.global.tsdApp.editComponent.action.uriParams;
      console.log(
        "Hello world : : : :",
        appState.global.tsdApp.viewComponent.selectedRowKey[keyName],
        "\n name of the key ::::",
        keyName,
        "\n appState ::: ",
        appState
      ); // Organisation --> organisation
      const res1 = fetch(
        `http://localhost:8080/transaction-web/${appState.global.tsdApp.editComponent.action.endPoint}/${appState.global.tsdApp.viewComponent.selectedRowKey[keyName]}`,
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
          setAppState({
            global: {
              tsdApp: {
                viewComponent: {
                  selectedRowKey: _data,
                },
              },
            },
          });
          setLayoutConfig(routes["detail"]);
        });
    },
  },
  "detailListComponent-edit-btn": {
    onPress: (setLayoutConfig, setAppState, appState) => {
      const res = fetch(
        `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "TsdAdmin",
            roleKey: 1,
            moduleName:
              appState.global != undefined
                ? appState.global.tsdApp.activeModule.name
                : "Service Orders",
            tabName:
              appState.global != undefined
                ? appState.global.tsdApp.activeTab.name
                : "CreateOrders",
            actionName: "Edit",
          }),
        }
      )
        .then((res) => res.json())
        .then((_data) => {
          // console.log("_Data : :: ", _data);
          setAppState({
            global: {
              tsdApp: {
                editComponent: {
                  action: {
                    name:
                      _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                        .actionName,
                    key:
                      _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                        .actionKey,
                    endPoint: _data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
                      /{[^}]*}/,
                      ""
                    ),
                    uriParams:
                      _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                        .uriParams,
                    httpMethod:
                      _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                        .httpMethod,
                    showButton:
                      _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                        .showButton,
                  },
                },
              },
            },
          });
          console.log("appState in Edit event : : : ", appState);
          setLayoutConfig(routes["edit"]);
        });
    },
  },
  "detailListComponent-delete-btn": {
    onPress: (setLayoutConfig, setAppState, appState) => {
      console.log("Delete button clicked");
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
  // console.log(`elId is ${elId}`);
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
