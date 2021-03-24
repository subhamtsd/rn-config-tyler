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

      const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
        const res1 = fetch(
          `http://localhost:8080/transaction-web/${endPoint}`,
          {
            method: httpMethod,
            // method: "POST",
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
                  createComponent: {
                    [appState.global.tsdApp.activeTab.name]: _data,
                    formData: body,
                  },
                  viewComponent: {
                    [appState.global.tsdApp.activeTab.name]: _data,
                  },
                },
              },
            });
            setLayoutConfig(routeToRedirect);
          });
      };

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

      const getScreenLayout = async (
        url,
        moduleKey,
        tabKey,
        actionName,
        buttonName
      ) => {
        const body = {
          moduleKey: moduleKey,
          tabKey: tabKey,
          actionName: actionName,
          // buttonName: buttonName,
        };

        console.log("BODY in getScreenLayout :::: ", body);
        const res1 = await fetch(
          // `https://run.mocky.io/v3/6e15e1eb-d62f-4d7a-a708-eb6fe07d56e7`,
          // `https://run.mocky.io/v3/d4624439-ce25-47db-96e1-649b2f8d6795`,
          url,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        )
          .then((res) => res.json())
          .then(async (_data) => {
            console.log("Layout config ::::: ", _data);
            setLayoutConfig(_data);
            console.log("LAYOUT CHANGED :::", routes["userChildLayout"]);
          });
      };

      const createOperation = async () => {
        const activeTabName = appState.global.tsdApp.activeTab.name;
        saveCreateComponentData(activeTabName, body);
        // TODO : REMOVE HARDCODING IN THIS FOR ACTIVE TAB NAME
        if (activeTabName === "Category" || activeTabName === "Screen") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/f9ffe752-5e74-484a-9d57-84928bd9cbd7`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
          // console.log("Screen Layout :::: ", screenLayout);
        } else if (activeTabName === "Product") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/9e6aded1-e311-4534-8628-2fc678bd1e84`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "User") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/6877833a-5c73-4330-abc8-8cd9d9aca1de`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (
          activeTabName === "CreateOrders" ||
          activeTabName === "BookOrders" ||
          activeTabName === "ReserveOrders"
        ) {
          await getScreenLayout(
            // `https://run.mocky.io/v3/7c1acd7c-a667-49da-8a60-5de9f9b31e9d`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "AllocateOrders") {
          if (appState.global.tsdApp.activeBuisnessFunction.name === "Sales") {
            await getScreenLayout(
              // `https://run.mocky.io/v3/3958120b-155b-480e-9f2a-9d9ad029f0d7`,
              `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
              appState.global.tsdApp.activeModule.key,
              appState.global.tsdApp.activeTab.key,
              appState.global.tsdApp.activeAction.name,
              "Submit-button"
            );
          } else {
            await getScreenLayout(
              // `https://run.mocky.io/v3/7c1acd7c-a667-49da-8a60-5de9f9b31e9d`,
              `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
              appState.global.tsdApp.activeModule.key,
              appState.global.tsdApp.activeTab.key,
              appState.global.tsdApp.activeAction.name,
              "Submit-button"
            );
          }
        } else if (activeTabName === "InventorySupply") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/71170fc8-f2e0-497f-9bd7-b963cbe8660f`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "Attributes") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/25215499-376f-49dc-bf0b-f622e2904826`,
            `http://localhost:8080/transaction-web/v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else {
          fetchApi(
            appState.global.tsdApp.activeAction.endPoint,
            appState.global.tsdApp.activeAction.httpMethod,
            body,
            routes["detail"]
          );
        }
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
        createOperation();
        // setLayoutConfig(routes["userChildLayout"]);
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
        appState.global.tsdApp.viewComponent[
          appState.global.tsdApp.activeTab.name
        ][keyName],
        "\n name of the key ::::",
        keyName,
        "\n appState ::: ",
        appState
      ); // Organisation --> organisation
      const res1 = fetch(
        `http://localhost:8080/transaction-web/${
          appState.global.tsdApp.editComponent.action.endPoint
        }/${
          appState.global.tsdApp.viewComponent[
            appState.global.tsdApp.activeTab.name
          ][keyName]
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
          setAppState({
            global: {
              tsdApp: {
                viewComponent: {
                  [appState.global.tsdApp.activeTab.name]: _data,
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
