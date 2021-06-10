/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  // JsonForm,
} from "../../components/index";
import { rowStyle, styles } from "./styles/common";

import { routes } from "./configs/routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";

// ******************** TODO APP EXAMPLE ************************* //
// import { TodoApp1 } from "../../../todo-app/TODOAPP/TodoApp1";
// import { TodoApp2 } from "../../../todo-app/TODOAPP/TodoApp2";
// import { SideNavBar } from "../../../todo-app/TODOAPP/SideNavBar";

// TSD COMPONENT
import { NavigationBar } from "../TSDigisolPlatform/components/NavigationBar/index";
import { HeaderBar } from "../TSDigisolPlatform/components/HeaderBar";
import { TabComponent } from "../TSDigisolPlatform/components/TabComponent";
import { ActionComponent } from "../TSDigisolPlatform/components/ActionComponent";
import { JsonFormComponent } from "../TSDigisolPlatform/components/JsonFormComponent/index";
import { DefaultScreen } from "../TSDigisolPlatform/components/DefaultScreen/index";
import { ScreenJsonEditor } from "../TSDigisolPlatform/components/ScreenJsonEditor";
import { ListComponent } from "../TSDigisolPlatform/components/ListComponent";
import { DetailListComponent } from "../TSDigisolPlatform/components/DetailListComponent";
import { EditComponent } from "../TSDigisolPlatform/components/EditComponent/index";
import { ListJsonFormComponent } from "../../components/ListJsonFormComponent";
import { LoginComponent } from "../TSDigisolPlatform/components/LoginComponent";
import { BillToAddressDetailViewComponent } from "../TSDigisolPlatform/components/domainSpecific/BillToAddressDetailViewComponent";
import { OrderLineAddressDetailViewComponent } from "../TSDigisolPlatform/components/domainSpecific/OrderLineAddressDetailViewComponent";
import { OrderLineDetailViewComponent } from "../TSDigisolPlatform/components/domainSpecific/OrderLineDetailViewComponent";
import { OrderLineListViewComponent } from "../TSDigisolPlatform/components/domainSpecific/OrderLineListViewComponent";
import { ShowQRCodeComponent } from "../TSDigisolPlatform/components/ShowQRCodeComponent";
import { EditOrderLineDetailComponent } from "../TSDigisolPlatform/components/domainSpecific/EditOrderLineDetailComponent/index";
import { EditBillToAddressDetailComponent } from "../TSDigisolPlatform/components/domainSpecific/EditBillToAddressDetailComponent/index";
import { CreateAddressFormComponent } from "../TSDigisolPlatform/components/domainSpecific/CreateAddressFormComponent";
import { CreateOrderlineListComponent } from "../TSDigisolPlatform/components/domainSpecific/CreateOrderlineListComponent";
import { CreateOrderlineAddressComponent } from "../TSDigisolPlatform/components/domainSpecific/CreateOrderlineAddressComponent";
import { CreateOrderFooterComponent } from "./../TSDigisolPlatform/components/domainSpecific/CreateOrderFooterComponent/index";
import { EditOrderLineAddressDetailComponent } from "../TSDigisolPlatform/components/domainSpecific/EditOrderLineAddressDetailComponent/index";

// ******************** TEST OF AddEditEntity *************************
import { AddEditEntity } from "../../components/AddEditEntity";
import { ToggleNavigation } from "../..//components/ToggleNavigation";

export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // TodoApp1,
  // TodoApp2,
  // SideNavBar,
  DefaultScreen,
  ScreenJsonEditor,
  NavigationBar,
  HeaderBar,
  TabComponent,
  ActionComponent,
  JsonFormComponent,
  ListComponent,
  DetailListComponent,
  EditComponent,
  ListJsonFormComponent,
  LoginComponent,
  BillToAddressDetailViewComponent,
  OrderLineAddressDetailViewComponent,
  OrderLineDetailViewComponent,
  OrderLineListViewComponent,
  ShowQRCodeComponent,
  EditOrderLineDetailComponent,
  EditBillToAddressDetailComponent,
  CreateAddressFormComponent,
  CreateOrderlineListComponent,
  CreateOrderlineAddressComponent,
  CreateOrderFooterComponent,
  EditOrderLineAddressDetailComponent,
  // JsonForm

  // TEST FOR JSON FORM
  AddEditEntity,
  ToggleNavigation,
};

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

// *************************************************
//  Layout config
// *************************************************

// export const appConfig = {
//   /// 1st layout
//   componentsSet,
//   layout: {
//     // row no
//     "1.container": {
//       Header: {
//         // col no
//         colSize: 1,
//         idx: "HeaderBar",
//         label: "headerBar",
//         colStyle: { borderWidth: 0, height: "10vh" },
//       },
//     },
//     "2.container": {
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//             colStyle: { borderColor: "cyan", borderWidth: 0 },
//           },
//           "2.1.leftNavBodyRow": {
//             leftNavBody1: {
//               // col no
//               colSize: 1,
//               idx: "NavigationBar",
//               label: "navigationBar",
//               colStyle: { borderColor: "red", borderWidth: 0, height: "98vh" },
//             },
//           },
//           "112leftNavBodyRow": {
//             leftNavBody2: {
//               // col no
//               idx: "DefaultScreen",
//               colSize: 1,
//               label: "leftNavBody",
//               colStyle: { height: "1vh", backgroundColor: "blue" },
//             },
//           },
//           "113leftNavBodyRow": {
//             leftNavBody3: {
//               // col no
//               idx: "DefaultScreen",
//               colSize: 1,
//               label: "leftNavBody",
//               colStyle: { height: "1vh", backgroundColor: "red" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         layout: {
//           colConfig: {
//             colSize: 11,
//             colStyle: { borderColor: "cyan", borderWidth: 0 },
//           },
//           "2.2.1.bodyHeaderRow": {
//             bodyHeader: {
//               // col no
//               colSize: 1,
//               idx: "ActionComponent",
//               label: "actionComponent",
//               colStyle: { borderColor: "red", borderWidth: 0, height: "10vh" },
//             },
//           },
//           "2.2.2.bodyTabRow": {
//             bodyContent: {
//               // col no
//               idx: "TabComponent",
//               colSize: 1,
//               label: "tabComponent",
//               colStyle: { borderColor: "red", borderWidth: 0, height: "10vh" },
//             },
//           },
//           "2.2.3.bodyContentRow": {
//             "2.2.3.1.bodyContent": {
//               // col no
//               idx: "JsonFormComponent",
//               colSize: 2,
//               label: "bodyHeader",
//               colStyle: { borderColor: "red", borderWidth: 0, height: "80vh" },
//             },
//             "2.2.3.1.bodyContent2": {
//               // col no
//               idx: "DefaultScreen",
//               colSize: 4,
//               label: "helloWorld",
//               colStyle: { borderColor: "red", borderWidth: 0, height: "80vh" },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// SAGAR's config
export const appConfig = {
  tw: true,
  componentsSet,
  layout: {
    0: {
      0: {
        idx: "HeaderBar",
        label: "headerBar",
        size: 1.3,
      },
    },
    1: {
      0: {
        idx: "NavigationBar",
        label: "navigationBar",
        size: 15,
      },
      1: {
        layout: {
          0: {
            0: {
              idx: "ActionComponent",
              label: "actionComponent",
              size: 10,
            },
          },
          1: {
            0: {
              idx: "TabComponent",
              label: "tabComponent",
              size: 8,
            },
          },
          2: {
            0: {
              idx: "JsonFormComponent",
              label: "bodyHeader",
              size: 100,
            },
            1: {
              idx: "DefaultScreen",
              label: "helloWorld",
              size: 200,
            },
          },
          layoutConfig: {
            size: 95,
          },
        },
      },
    },
  },
};

// export const appConfig = {
//   /// 1st layout
//   componentsSet,
//   links: {
//     "/": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Home",
//     },
//     "/about": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Feed",
//     },
//     "/contact": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Messages",
//     },
//   },
//   layout: {
//     "1.container": {
//       rowConfig: {
//         rowSize: 1,
//       },
//       // col
//       Header: {
//         colSize: 12,
//         idx: "HeaderBar",
//         label: "headerBar",
//       },
//     },
//     "2.container": {
//       rowConfig: {
//         rowSize: 1,
//       },
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//           },
//           "2.1.leftNavBodyRow": {
//             leftNavBody: {
//               colSize: 2,
//               idx: "NavigationBar",
//               label: "navigationBar",
//               colStyle: {
//                 borderWidth: 0,
//                 height: "110vh",
//               },
//             },
//           },
//           "2.2.leftNavBodyRow": {
//             leftNavBody: {
//               colSize: 2,
//               idx: "DefaultScreen",
//               label: "defaultScreen",
//               colStyle: {
//                 borderWidth: 1,
//                 height: "2vh",
//                 // display: "none",
//               },
//             },
//           },
//           "2.3.leftNavBodyRow": {
//             leftNavBody: {
//               colSize: 2,
//               idx: "DefaultScreen",
//               label: "defaultScreen",
//               colStyle: {
//                 borderWidth: 1,
//                 height: "2vh",
//                 // display: "none",
//               },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         // rowConfig: {
//         //   rowSize: 12,
//         // },
//         layout: {
//           colConfig: {
//             colSize: 12,
//           },
//           "2.2.1.bodyHeaderRow": {
//             bodyHeader: {
//               colSize: 12,
//               idx: "ActionComponent",
//               label: "actionComponent",
//               colStyle: {
//                 borderColor: "blue",
//                 borderWidth: 2,
//                 height: "10vh",
//               },
//             },
//           },
//           "2.2.2.bodyTabRow": {
//             bodyContent: {
//               colSize: 10,
//               idx: "TabComponent",
//               label: "tabComponent",
//               colStyle: {
//                 borderColor: "red",
//                 borderWidth: 2,
//                 height: "10vh",
//               },
//             },
//           },
//           "2.2.3.bodyContentRow": {
//             "2.2.3.1.bodyContent": {
//               idx: "JsonFormComponent",
//               colSize: 2,
//               label: "bodyHeader",
//               colStyle: {
//                 borderColor: "blue",
//                 // borderWidth: 2,
//                 height: "50vh",
//               },
//             },
//             "2.2.3.1.bodyContent2": {
//               idx: "DefaultScreen",
//               colSize: 4,
//               label: "helloWorld",
//               colStyle: {
//                 // display: "flex",
//                 borderColor: "blue",
//                 height: "70vh",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// export const appConfig = {
//   /// 1st layout
//   componentsSet,
//   links: {
//     "/": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Home",
//     },
//     "/about": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Feed",
//     },
//     "/contact": {
//       style: styles.navItem,
//       linkStyle: styles.tabName,
//       linkText: "Messages",
//     },
//   },
//   layout: {
//     colConfig: {
//       colSize: 1,
//     },
//     "1.container": {
//       "1.1.leftNavCol": {
//         layout: {
//           "1.1.leftNavBodyRow": {
//             Header: {
//               colSize: 1,
//               idx: "HeaderBar",
//               label: "headerBar",
//               colStyle: { borderWidth: 1, height: "10vh" },
//             },
//           },
//         },
//       },
//     },
//     "2.container": {
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//           },
//           "2.1.leftNavBodyRow": {
//             leftNavBody: {
//               idx: "NavigationBar",
//               label: "navigationBar",
//               colStyle: { borderWidth: 0, height: "100vh" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         layout: {
//           colConfig: {
//             colSize: 10,
//           },
//           "2.2.1.BodyRow": {
//             actionView: {
//               idx: "ActionComponent",
//               label: "actionComponent",
//               colStyle: { borderWidth: 1, height: "10vh" },
//             },
//           },
//           "2.2.2.BodyRow": {
//             tabView: {
//               idx: "TabComponent",
//               label: "tabComponent",
//               colStyle: { borderWidth: 1, height: "10vh" },
//             },
//           },
//           "2.2.3.BodyRow": {
//             jsonFormComponent: {
//               colSize: 2,
//               idx: "JsonFormComponent",
//               label: "bodyHeader",
//               colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
//             },
//             emptyComponent: {
//               colSize: 4,
//               idx: "DefaultScreen",
//               label: "DefaultScreenComponent",
//               colStyle: { borderWidth: 1 },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// export const events = {
//   // FIXME: fix the below logic to be run in component load phase for each mounting like componentDidMount
//   $appInit: (setLayoutConfig, setAppState) => {},

//   // the below logic to be run in component load phase for each mounting like componentDidMount
//   "bodyHeader-$init": (setLayoutConfig, setAppState, appState) => {
//     setAppState({ $global: { ...appState?.$global, key: "Loaded..." } });
//   },

//   //<label>-<element-id> : <handler>
//   "leftNavHeader-button-one": {
//     // <event> :: <handler>
//     onPress: (setLayoutConfig, setAppState, appState) => {
//       // components section
//     },
//   },
//   "bodyHeader-form": {
//     // form data mutator
//     onSuccess: (setLayoutConfig, setAppState, appState, args) => {
//       console.log("args.params.values : : : : : ", args.params.values);
//       const body = args.params.values;

//       console.log(
//         "appState.global.tsdApp.activeAction.name : : ::  ",
//         appState.global.tsdApp.activeAction.name
//       );

//       const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
//         const res1 = fetch(
//           `http://localhost:8080/transaction-web/${endPoint}`,
//           {
//             method: httpMethod,
//             // method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body),
//           }
//         )
//           .then((res) => res.json())
//           .then((_data) => {
//             const _formData = args.params.values;
//             setAppState({
//               global: {
//                 tsdApp: {
//                   createComponent: {
//                     [appState.global.tsdApp.activeTab.name]: _data,
//                     formData: body,
//                   },
//                 },
//               },
//             });
//           });
//       };

//       const saveCreateComponentData = async (tabName, body) => {
//         console.log("tabName in saveCreateComponentData : :: : : ", tabName);
//         setAppState({
//           global: {
//             tsdApp: {
//               createComponent: {
//                 [tabName]: body,
//               },
//             },
//           },
//         });
//         // await saveCreateComponentFormLayout();
//       };

//       if (appState.global.tsdApp.activeAction.name === "Search") {
//         body["page"] = {
//           pageSize: "10",
//           lastRecordKey: "0",
//         };
//         setAppState({
//           global: {
//             tsdApp: {
//               searchComponent: {
//                 searchPayload: body,
//               },
//             },
//           },
//         });
//         setLayoutConfig(routes["search"]);
//         // fetchApi(
//         //   appState.global.tsdApp.activeAction.endPoint,
//         //   appState.global.tsdApp.activeAction.httpMethod,
//         //   body,
//         //   routes["search"]
//         // );
//       } else {
//         fetchApi(
//           appState.global.tsdApp.activeAction.endPoint,
//           appState.global.tsdApp.activeAction.httpMethod,
//           body,
//           routes["search"]
//         );
//       }
//     },
//   },
//   "editComponent-form": {
//     // form data mutator
//     // call edit api from formData as body
//     // console the response
//     // redirect to detail component
//     onSuccess: (setLayoutConfig, setAppState, appState, args) => {
//       // console.log("args.params.values : : : : : ", args.params.values);

//       // console.log("appState in Edit event1 : : : ", appState);
//       const keyName = appState.global.tsdApp.editComponent.action.uriParams;
//       console.log(
//         "Hello world : : : :",
//         appState.global.tsdApp.viewComponent[
//           appState.global.tsdApp.activeTab.name
//         ][keyName],
//         "\n name of the key ::::",
//         keyName,
//         "\n appState ::: ",
//         appState
//       ); // Organisation --> organisation
//       const res1 = fetch(
//         `http://localhost:8080/transaction-web/${
//           appState.global.tsdApp.editComponent.action.endPoint
//         }/${
//           appState.global.tsdApp.viewComponent[
//             appState.global.tsdApp.activeTab.name
//           ][keyName]
//         }`,
//         {
//           method: appState.global.tsdApp.editComponent.action.httpMethod,
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(args.params.values),
//         }
//       )
//         .then((res) => res.json())
//         .then((_data) => {
//           setAppState({
//             global: {
//               tsdApp: {
//                 viewComponent: {
//                   [appState.global.tsdApp.activeTab.name]: _data,
//                 },
//               },
//             },
//           });
//           setLayoutConfig(routes["detail"]);
//         });
//     },
//   },
//   "detailListComponent-edit-btn": {
//     onPress: (setLayoutConfig, setAppState, appState) => {
//       const res = fetch(
//         `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: "TsdAdmin",
//             roleKey: 1,
//             moduleName:
//               appState.global != undefined
//                 ? appState.global.tsdApp.activeModule.name
//                 : "Service Orders",
//             tabName:
//               appState.global != undefined
//                 ? appState.global.tsdApp.activeTab.name
//                 : "CreateOrders",
//             actionName: "Edit",
//           }),
//         }
//       )
//         .then((res) => res.json())
//         .then((_data) => {
//           // console.log("_Data : :: ", _data);
//           setAppState({
//             global: {
//               tsdApp: {
//                 editComponent: {
//                   action: {
//                     name:
//                       _data.businessFunctions[0].modules[0].tabs[0].actions[0]
//                         .actionName,
//                     key:
//                       _data.businessFunctions[0].modules[0].tabs[0].actions[0]
//                         .actionKey,
//                     endPoint: _data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
//                       /{[^}]*}/,
//                       ""
//                     ),
//                     uriParams:
//                       _data.businessFunctions[0].modules[0].tabs[0].actions[0]
//                         .uriParams,
//                     httpMethod:
//                       _data.businessFunctions[0].modules[0].tabs[0].actions[0]
//                         .httpMethod,
//                     showButton:
//                       _data.businessFunctions[0].modules[0].tabs[0].actions[0]
//                         .showButton,
//                   },
//                 },
//               },
//             },
//           });
//           console.log("appState in Edit event : : : ", appState);
//           setLayoutConfig(routes["edit"]);
//         });
//     },
//   },
//   "detailListComponent-delete-btn": {
//     onPress: (setLayoutConfig, setAppState, appState) => {
//       console.log("Delete button clicked");
//     },
//   },
//   "bodyHeader-changed at 1st-btn-one": {
//     onPress: (setLayoutConfig) => {
//       setLayoutConfig(routes["routeTwo"]);
//     },
//   },
//   "bodyHeader1-btn-one": {
//     onPress: (setLayoutConfig) => {
//       setLayoutConfig(routes["routeThree"]);
//     },
//   },
// };

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
// export const getEvents = (elId, setLayoutConfig, setAppState, appState) => {
//   console.log(`elId is -----> ${elId}`);
//   const elEvents = {};
//   events[elId] &&
//     Object.keys(events[elId]).map((eventName) => {
//       elEvents[eventName] = (args) => {
//         return events[elId] &&
//           events[elId][eventName] &&
//           events[elId][eventName]
//           ? events[elId][eventName](
//               setLayoutConfig,
//               setAppState,
//               appState,
//               args
//             )
//           : {};
//       };
//     });
//   return elEvents;
// };

// // logic for init logic for components `<label>-$init` in events object
// export const getInitEvents = (elId, setLayoutConfig, setAppState, appState) => {
//   if (elId && events[elId]) {
//     console.log(`*** getInitEvents ${elId}`);
//     events[elId](setLayoutConfig, setAppState, appState);
//   }
// };

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
      body["moduleName"] = appState.$global.tsdApp.activeModule.name;
      body["tabName"] = appState.$global.tsdApp.activeTab.name;
      console.log("BODY PARAM FOR JSON FORM ::: " + JSON.stringify(body));

      console.log(
        "appState.$global.tsdApp.activeAction.name : : ::  ",
        appState.$global.tsdApp.activeAction.name
      );

      /**
       *
       * @param {String} endPoint
       * @param {String} httpMethod
       * @param {Object} body
       * @param {Object} routeToRedirect
       */
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
            setAppState(
              {
                $global: {
                  tsdApp: {
                    createComponent: {
                      [appState.$global.tsdApp.activeTab.name]: _data,
                      formData: body,
                    },
                    viewComponent: {
                      [appState.$global.tsdApp.activeTab.name]: _data,
                    },
                  },
                },
              },
              "isPartial"
            );
            setLayoutConfig(routeToRedirect, "copy");
          });
      };

      const saveCreateComponentData = async (tabName, body) => {
        console.log(
          "tabName in saveCreateComponentData : :: : : ",
          tabName,
          body
        );
        setAppState(
          {
            $global: {
              tsdApp: {
                createComponent: {
                  [tabName]: body,
                },
              },
            },
          },
          "isPartial"
        );
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
            setLayoutConfig(_data, "copy");
            console.log("LAYOUT CHANGED :::", routes["userChildLayout"]);
          });
      };

      const createOperation = async () => {
        const activeTabName = appState.$global.tsdApp.activeTab.name;
        console.log("from eventConfig", body);
        saveCreateComponentData(activeTabName, body);
        // TODO : REMOVE HARDCODING IN THIS FOR ACTIVE TAB NAME
        // TODO: Removed Screen as tab name from here in order to fit a JSON editor
        if (activeTabName === "Category" || activeTabName === "Screen") {
          await getScreenLayout(
            // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            "https://run.mocky.io/v3/9afda2b1-618b-44df-ba07-f7879fb6ca69",
            appState.$global.tsdApp.activeModule.key,
            appState.$global.tsdApp.activeTab.key,
            appState.$global.tsdApp.activeAction.name,
            "Submit-button"
          );
          // console.log("Screen Layout :::: ", screenLayout);
        } else if (activeTabName === "Product") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/9e6aded1-e311-4534-8628-2fc678bd1e84`,
            // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            "https://run.mocky.io/v3/9afda2b1-618b-44df-ba07-f7879fb6ca69",
            appState.$global.tsdApp.activeModule.key,
            appState.$global.tsdApp.activeTab.key,
            appState.$global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "User") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/6877833a-5c73-4330-abc8-8cd9d9aca1de`,
            // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            "https://run.mocky.io/v3/e9580864-4d33-44d8-9da6-40fa6fff554c",
            appState.$global.tsdApp.activeModule.key,
            appState.$global.tsdApp.activeTab.key,
            appState.$global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (
          // TODO : NEED TO UPDATE THE CHILD LAYOUT ACCORDING TO OLD framework Development
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

          setLayoutConfig(routes.createOrder, "copy");
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
          if (appState.$global.tsdApp.activeBuisnessFunction.name === "Sales") {
            setLayoutConfig(routes.createOrder, "copy");
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
              appState.$global.tsdApp.activeModule.key,
              appState.$global.tsdApp.activeTab.key,
              appState.$global.tsdApp.activeAction.name,
              "Submit-button"
            );
          }
        } else if (activeTabName === "InventorySupply") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/71170fc8-f2e0-497f-9bd7-b963cbe8660f`,
            // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            "https://run.mocky.io/v3/d3377fac-093d-4354-babd-e35cd9726de8",
            appState.$global.tsdApp.activeModule.key,
            appState.$global.tsdApp.activeTab.key,
            appState.$global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else if (activeTabName === "Attributes") {
          await getScreenLayout(
            // `https://run.mocky.io/v3/25215499-376f-49dc-bf0b-f622e2904826`,
            // `${SERVER_ENDPOINT}v1/layoutdetail/getChildLayoutJson`,
            "https://run.mocky.io/v3/bdde5c91-3bdd-49b8-8460-c72a4678a158",
            appState.$global.tsdApp.activeModule.key,
            appState.$global.tsdApp.activeTab.key,
            appState.$global.tsdApp.activeAction.name,
            "Submit-button"
          );
        } else {
          fetchApi(
            appState.$global.tsdApp.activeAction.endPoint,
            appState.$global.tsdApp.activeAction.httpMethod,
            body,
            routes[("detail", "copy")]
          );
        }
      };

      if (appState.$global.tsdApp.activeAction.name === "Search") {
        body["page"] = {
          pageSize: "10",
          lastRecordKey: "0",
        };
        setAppState(
          {
            $global: {
              tsdApp: {
                searchComponent: {
                  searchPayload: body,
                },
              },
            },
          },
          "isPartial"
        );
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
      const activeTabName = appState.$global.tsdApp.activeTab.name;
      const body = args[0].params.values;
      body["moduleName"] = appState.$global.tsdApp.activeModule.name;
      body["tabName"] = appState.$global.tsdApp.activeTab.name;
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

        setAppState(
          {
            $global: {
              tsdApp: {
                createComponent: {
                  [activeTabName]: body,
                },
              },
            },
          },
          "isPartial"
        );
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
      body["moduleName"] = appState.$global.tsdApp.activeModule.name;
      body["tabName"] = appState.$global.tsdApp.activeTab.name;
      const keyName = appState.$global.tsdApp.editComponent.action.uriParams;
      console.log(
        "Hello world : : : :",
        appState.$global.tsdApp.viewComponent[
          appState.$global.tsdApp.activeTab.name
        ][keyName],
        "\n name of the key ::::",
        keyName,
        "\n appState ::: ",
        appState
      ); // Organisation --> organisation
      const res1 = fetch(
        `${SERVER_ENDPOINT}${
          appState.$global.tsdApp.editComponent.action.endPoint
        }/${
          appState.$global.tsdApp.viewComponent[
            appState.$global.tsdApp.activeTab.name
          ][keyName]
        }`,
        {
          method: appState.$global.tsdApp.editComponent.action.httpMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((res) => res.json())
        .then((_data) => {
          setAppState(
            {
              $global: {
                tsdApp: {
                  viewComponent: {
                    [appState.$global.tsdApp.activeTab.name]: _data,
                  },
                },
              },
            },
            "isPartial"
          );
          setLayoutConfig(routes["detail"], "copy");
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
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeModule.name
              : "Service Orders",
          tabName:
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeTab.name
              : "CreateOrders",
          actionName: "Edit",
        }),
      })
        .then((res) => res.json())
        .then((_data) => {
          // console.log("_Data : :: ", _data);
          setAppState(
            {
              $global: {
                tsdApp: {
                  editComponent: {
                    action: {
                      name: _data.businessFunctions[0].modules[0].tabs[0]
                        .actions[0].actionName,
                      key: _data.businessFunctions[0].modules[0].tabs[0]
                        .actions[0].actionKey,
                      endPoint:
                        _data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
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
            },
            "isPartial"
          );
          // console.log("appState in Edit event : : : ", appState);
          setLayoutConfig(routes["edit"], "copy");
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
          setLayoutConfig(routes["detail"], "copy");
        });
    },
  },

  "orderLineDetailViewComponent-edit-btn": {
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      setAppState(
        {
          $global: {
            tsdApp: {
              formData: {
                ...appState?.$global?.tsdApp?.formData,
                viewData: args[1],
              },
            },
          },
        },
        "isPartial"
      );
      setLayoutConfig(routes["editOrderLineDetail"], "copy");

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
          setLayoutConfig(routes["detail"], "copy");
        });
    },
  },
  "billToAddressDetailViewComponent-edit-btn": {
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      console.log("abcdefg", args[1]);
      setAppState(
        {
          $global: {
            tsdApp: {
              formData: {
                ...appState?.$global?.tsdApp?.formData,
                viewData: args[1],
              },
            },
          },
        },
        "isPartial"
      );
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
          setLayoutConfig(routes["detail"], "copy");
        });
    },
  },

  "orderLineAddressDetailViewComponent-edit-btn": {
    // TODO: GET the api end point for edit address now it is hardcoding but needed to remove
    onPress: (setLayoutConfig, setAppState, appState, ...args) => {
      setAppState(
        {
          $global: {
            tsdApp: {
              formData: {
                ...appState?.$global?.tsdApp?.formData,
                viewData: args[1],
              },
            },
          },
        },
        "isPartial"
      );
      setLayoutConfig(routes["editOrderLineAddressDetail"], "copy");
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
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeTab != undefined
                ? appState.$global.tsdApp.activeTab.name
                : "Create Order"
              : "Create Order",
          moduleName:
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeModule != undefined
                ? appState.$global.tsdApp.activeModule.name
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

              setAppState(
                {
                  $global: {
                    tsdApp: {
                      viewComponent: {
                        [appState.$global.tsdApp.activeTab.name]: finalData,
                      },
                    },
                  },
                },
                "isPartial"
              );
            })
            .then(() => {
              console.log("APPSTATE IN LIST VIEW : :::: ", appState);
              // props.setLayoutConfig(
              //   routes.detail,
              //   "copy"
              // );
              // TODO : REMOVE HARDCODING
              if (
                appState.$global.tsdApp.activeModule.key === 23751 ||
                appState.$global.tsdApp.activeModule.key === 156051
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
  console.log(`elId is ---> ${elId}`);
  const elEvents = {};
  const extra = args;
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
              ...extra
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
