/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { routes } from "../routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";

export const events = {
  // FIXME: fix the below logic to be run in component load phase for each mounting like componentDidMount

  // the below logic to be run in component load phase for each mounting like componentDidMount
  "bodyHeader-$init": (setLayoutConfig, setAppState, appState) => {
    setAppState({ $global: { ...appState?.$global, key: "Loaded..." } });
  },

  //<label>-<element-id> : <handler>
  "leftNavHeader-button-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      // components section
    },
  },
  "bodyHeader-form": {
    // form data mutator
    onSuccess: (setLayoutConfig, setAppState, appState, ...args) => {
      // console.log("args.params.values : : : : : ", args);
      const body = args[0].params.values;
      body["moduleName"] = appState.global.tsdApp.activeModule.name;
      body["tabName"] = appState.global.tsdApp.activeTab.name;
      console.log("BODY PARAM FOR JSON FORM ::: " + JSON.stringify(body));

      console.log(
        "appState.global.tsdApp.activeAction.name : : ::  ",
        appState.global.tsdApp.activeAction.name
      );

      const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
        const res1 = fetch(`${SERVER_ENDPOINT}${endPoint}`, {
          method: httpMethod,
          // method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((_data) => {
            // const _formData = args.params.values;
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
        console.log(
          "tabName in saveCreateComponentData : :: : : ",
          tabName,
          body
        );
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
        console.log("from eventConfig", body);
        saveCreateComponentData(activeTabName, body);
        // TODO : REMOVE HARDCODING IN THIS FOR ACTIVE TAB NAME
        // TODO: Removed Screen as tab name from here in order to fit a JSON editor
        if (activeTabName === "Category" || activeTabName === "Screen") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/f9ffe752-5e74-484a-9d57-84928bd9cbd7`,
            `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
          // console.log("Screen Layout :::: ", screenLayout);
        } else if (activeTabName === "Product") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/9e6aded1-e311-4534-8628-2fc678bd1e84`,
            `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "User") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/6877833a-5c73-4330-abc8-8cd9d9aca1de`,
            `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (
          activeTabName === "CreateOrders" ||
          activeTabName === "BookOrders" ||
          activeTabName === "ReserveOrders" ||
          activeTabName === "CREATEORDER" ||
          activeTabName === "BOOKORDER" ||
          activeTabName === "RESERVEORDER"
        ) {
          // console.log("from create order form");
          // await fetch(
          //   `https://run.mocky.io/v3/cab08992-ae61-4382-bb58-c9a26ac6881e`
          // )
          //   .then((res) => {
          //     res.json();
          //   })
          //   .then((data) => {
          //     console.log("from create order ", data);
          //   });

          setLayoutConfig(routes.createOrder);
          // await getScreenLayout(
          //   // `https://run.mocky.io/v3/7c1acd7c-a667-49da-8a60-5de9f9b31e9d`,
          //   `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,

          //   // `https://run.mocky.io/v3/503199c1-9448-45ce-8506-2d5c616751da`,
          //   appState.global.tsdApp.activeModule.key,
          //   appState.global.tsdApp.activeTab.key,
          //   appState.global.tsdApp.activeAction.name,
          //   "Submit-button"
          // );
        } else if (activeTabName === "AllocateOrders") {
          if (appState.global.tsdApp.activeBuisnessFunction.name === "Sales") {
            setLayoutConfig(routes.createOrder);
            // await getScreenLayout(
            //   // `https://run.mocky.io/v3/3958120b-155b-480e-9f2a-9d9ad029f0d7`,
            //   // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,

            //   `https://run.mocky.io/v3/503199c1-9448-45ce-8506-2d5c616751da`,
            //   appState.global.tsdApp.activeModule.key,
            //   appState.global.tsdApp.activeTab.key,
            //   appState.global.tsdApp.activeAction.name,
            //   "Submit-button"
            // );
          } else {
            await getScreenLayout(
              // `https://run.mocky.io/v3/7c1acd7c-a667-49da-8a60-5de9f9b31e9d`,
              `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
              appState.global.tsdApp.activeModule.key,
              appState.global.tsdApp.activeTab.key,
              appState.global.tsdApp.activeAction.name,
              "Submit-button"
            );
          }
        } else if (activeTabName === "InventorySupply") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/71170fc8-f2e0-497f-9bd7-b963cbe8660f`,
            `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            appState.global.tsdApp.activeModule.key,
            appState.global.tsdApp.activeTab.key,
            appState.global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "Attributes") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/25215499-376f-49dc-bf0b-f622e2904826`,
            `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
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
        setLayoutConfig(routes["search"], "copy");
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
    onCancel: (setLayoutConfig, setAppState, appState, ...args) => {
      const activeTabName = appState.global.tsdApp.activeTab.name;
      const body = args[0].params.values;
      body["moduleName"] = appState.global.tsdApp.activeModule.name;
      body["tabName"] = appState.global.tsdApp.activeTab.name;
      console.log("BODY PARAM FOR JSON FORM ::: " + JSON.stringify(body));
      // saveCreateComponentData(activeTabName, body);
      // TODO : REMOVE HARDCODING IN THIS FOR ACTIVE TAB NAME
      if (
        activeTabName === "CreateOrders" ||
        activeTabName === "BookOrders" ||
        activeTabName === "ReserveOrders" ||
        activeTabName === "CREATEORDER" ||
        activeTabName === "BOOKORDER" ||
        activeTabName === "RESERVEORDER" ||
        activeTabName === "AllocateOrders"
      ) {
        // console.log("from create orderline form");

        setAppState({
          global: {
            tsdApp: {
              createComponent: {
                [activeTabName]: body,
              },
              formData: {
                ...appState?.global?.tsdApp?.formData,
                [args[1]]: body,
              },
            },
          },
        });
        setLayoutConfig(routes[`createOrderline`], "copy");
      } else {
        console.log("onCancel button");
      }
    },
  },
  "editComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, ...args) => {
      // console.log("args.params.values : : : : : ", args.params.values);

      // console.log("appState in Edit event1 : : : ", appState);
      const body = args[0].params.values;
      body["moduleName"] = appState.global.tsdApp.activeModule.name;
      body["tabName"] = appState.global.tsdApp.activeTab.name;
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
        `${SERVER_ENDPOINT}${
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
          body: JSON.stringify(body),
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
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      const res = fetch(`${SERVER_ENDPOINT}v1/schema/modulelayout`, {
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
      })
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

  "editOrderLineDetailComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, ...args) => {
      console.log("args.params.values : : : : : ", args);

      const body = args[0].params.values;
      const res = fetch(`${SERVER_ENDPOINT}v1/orderline/${body.orderLineKey}`, {
        method: POST,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((_data) => {
          setLayoutConfig(routes["detail"]);
        });
    },
  },

  "orderLineDetailViewComponent-edit-btn": {
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      setAppState({
        global: {
          tsdApp: {
            formData: {
              ...appState?.global?.tsdApp?.formData,
              viewData: args[1],
            },
          },
        },
      });
      setLayoutConfig(routes["editOrderLineDetail"]);

      // console.log("From dtail list editbutton ::: ", appState);
    },
  },

  "editBillToAddressDetailComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, ...args) => {
      //   // console.log("args.params.values : : : : : ", args.params.values);
      //   // console.log("appState in Edit event1 : : : ", appState);
      //   const body = args.params.values;
      //  const res1 = fetch(
      const body = args[0].params.values;
      const res = fetch(`${SERVER_ENDPOINT}v1/address/${body.addressInfoKey}`, {
        method: POST,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((_data) => {
          setLayoutConfig(routes["detail"]);
        });
    },
  },
  "billToAddressDetailViewComponent-edit-btn": {
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      // console.log("abcdefg", args[1]);
      setAppState({
        global: {
          tsdApp: {
            formData: {
              ...appState?.global?.tsdApp?.formData,
              viewData: args[1],
            },
          },
        },
      });
      // console.log("config", appState);
      setLayoutConfig(routes["editBillToAddressDetail"], "copy");
    },
  },

  "orderLineAddressDetailViewComponent-form": {
    // form data mutator
    // call edit api from formData as body
    // console the response
    // redirect to detail component
    onSuccess: (setLayoutConfig, setAppState, appState, ...args) => {
      // console.log("args.params.values : : : : : ", args.params.values);
      const body = args[0].params.values;
      const res = fetch(`${SERVER_ENDPOINT}v1/address/${body.addressInfoKey}`, {
        method: POST,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((_data) => {
          setLayoutConfig(routes["detail"]);
        });
    },
  },

  "orderLineAddressDetailViewComponent-edit-btn": {
    // TODO: GET the api end point for edit address now it is hardcoding but needed to remove
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      setAppState({
        global: {
          tsdApp: {
            formData: {
              ...appState?.global?.tsdApp?.formData,
              viewData: args[1],
            },
          },
        },
      });
      setLayoutConfig(routes["editOrderLineAddressDetail"]);
    },
  },
  "detailListComponent-delete-btn": {
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      console.log("Delete button clicked");
    },
  },
  "bodyHeader-changed at 1st-btn-one": {
    onPress: (setLayoutConfig, ...args) => {
      setLayoutConfig(routes["routeTwo"]);
    },
  },
  "bodyHeader1-btn-one": {
    onPress: (setLayoutConfig, ...args) => {
      setLayoutConfig(routes["routeThree"]);
    },
  },

  "listComponent-show-btn-one": {
    // TODO: Configuration won't work as it need `d` as data for the specific row
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      // console.log("i ==> ", i);
      // console.log("d ==> ", d);
      const res = fetch(`${SERVER_ENDPOINT}v1/schema/modulelayout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "TsdAdmin",
          roleKey: 1,
          // TODO : Conditional for default state undefined
          tabName:
            appState.global != undefined
              ? appState.global.tsdApp.activeTab != undefined
                ? appState.global.tsdApp.activeTab.name
                : "Create Order"
              : "Create Order",
          moduleName:
            appState.global != undefined
              ? appState.global.tsdApp.activeModule != undefined
                ? appState.global.tsdApp.activeModule.name
                : "Service Orders"
              : "Service Orders",
          actionName: "View",
        }),
      })
        .then((res) => res.json())
        .then((_data) => {
          console.log("_Data in searchList ::::::", _data);
          // get data from view action
          const res1 = fetch(
            `${SERVER_ENDPOINT}${_data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
              /{[^}]*}/,
              ""
            )}/${
              d[
                _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                  .uriParams
              ]
            }`,
            {
              method:
                _data.businessFunctions[0].modules[0].tabs[0].actions[0]
                  .httpMethod,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                languageKey: 1,
              },
              // body: JSON.stringify(args.params.values),
            }
          )
            .then((res1) => res1.json())
            .then((data) => {
              // console.log(
              //   "GET API IN SEARCH : ::::",
              //   data
              // );
              return data;
            })
            .then((finalData) => {
              console.log("appState in Search List :::", appState);

              setAppState({
                global: {
                  tsdApp: {
                    viewComponent: {
                      [appState.global.tsdApp.activeTab.name]: finalData,
                    },
                  },
                },
              });
            })
            .then(() => {
              console.log("APPSTATE IN LIST VIEW : :::: ", appState);
              // props.setLayoutConfig(
              //   routes.detail,
              //   "copy"
              // );
              // TODO : REMOVE HARDCODING
              if (
                appState.global.tsdApp.activeModule.key === 23751 ||
                appState.global.tsdApp.activeModule.key === 156051
              ) {
                setLayoutConfig(routes.orderDetail, "copy");
              } else {
                setLayoutConfig(routes.detail, "copy");
              }
            });
          // console.log("GET API IN SEARCH :::: ", res1);
        });
      // props.setAppState({
      //   global: {
      //     tsdApp: {
      //       listComponent: {
      //         selectedRowKey: d,
      //       },
      //     },
      //   },
      // });
      // TODO :Search List component is missing open ticket
      // console.log(
      //   "appState in searchListComponent ",
      //   props.appState
      // );
    },
  },

  // "helloWorld-btn-one": {
  //   onPress: (setLayoutConfig, setAppState, appState) => {
  //     setAppState({
  //       hello: 78,
  //     });
  //     console.log("Hello from Default component", appState);
  //   },
  // },
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (
  elId,
  setLayoutConfig,
  setAppState,
  appState,
  ...args
) => {
  console.log(`elId is ${elId}`);
  const elEvents = {};
  const p = args;
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
              args,
              ...p
            )
          : {};
      };
    });
  console.log(`elId is ${elId}`, elEvents);
  return elEvents;
};

// logic for init logic for components `<label>-$init` in events object
export const getInitEvents = (elId, setLayoutConfig, setAppState, appState) => {
  if (elId && events[elId]) {
    console.log(`*** getInitEvents ${elId}`);
    events[elId](setLayoutConfig, setAppState, appState);
  }
};
