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

// ******************** TODO APP EXAMPLE ************************* //
// import { TodoApp1 } from "../../../todo-app/TODOAPP/TodoApp1";
// import { TodoApp2 } from "../../../todo-app/TODOAPP/TodoApp2";
// import { SideNavBar } from "../../../todo-app/TODOAPP/SideNavBar";

// TSD COMPONENT
import { NavigationBar } from "./components/NavigationBar/index";
import { HeaderBar } from "./components/HeaderBar";
import { TabComponent } from "./components/TabComponent";
import { ActionComponent } from "./components/ActionComponent/index";
import { JsonFormComponent } from "./components/JsonFormComponent/index";
import { DefaultScreen } from "./components/DefaultScreen";
import { ListComponent } from "./components/ListComponent";
import { DetailListComponent } from "./components/DetailListComponent";
import { EditComponent } from "./components/EditComponent/index";
import { ListJsonFormComponent } from "../../components/ListJsonFormComponent";

// ******************** TEST OF AddEditEntity *************************
import { AddEditEntity } from "../../components/AddEditEntity";
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
  NavigationBar,
  HeaderBar,
  TabComponent,
  ActionComponent,
  JsonFormComponent,
  ListComponent,
  DetailListComponent,
  EditComponent,
  ListJsonFormComponent,
  // JsonForm

  // TEST FOR JSON FORM
  AddEditEntity,
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

export const getComponents = () => {
  return {
    Comp5,
    ActionComp,
    Home,
    About,
    RandomPic,
    // TodoApp1,
    // TodoApp2,
    // SideNavBar,
    DefaultScreen,
    NavigationBar,
    HeaderBar,
    TabComponent,
    ActionComponent,
    JsonFormComponent,
    ListComponent,
    DetailListComponent,
    EditComponent,
    ListJsonFormComponent,
    // JsonForm

    // TEST FOR JSON FORM
    AddEditEntity,
  };
};

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
  /// 1st layout
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
  layout: {
    colConfig: {
      colSize: 1,
    },
    "1.container": {
      "1.1.leftNavCol": {
        layout: {
          "1.1.leftNavBodyRow": {
            Header: {
              colSize: 1,
              idx: "HeaderBar",
              label: "headerBar",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
        },
      },
    },
    "2.container": {
      "2.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "2.1.leftNavBodyRow": {
            leftNavBody: {
              idx: "NavigationBar",
              label: "navigationBar",
              colStyle: { borderWidth: 0, height: "100vh" },
            },
          },
        },
      },
      "2.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 10,
          },
          "2.2.1.BodyRow": {
            actionView: {
              idx: "ActionComponent",
              label: "actionComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.2.BodyRow": {
            tabView: {
              idx: "TabComponent",
              label: "tabComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.3.BodyRow": {
            jsonFormComponent: {
              colSize: 2,
              idx: "JsonFormComponent",
              label: "bodyHeader",
              colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
            },
            emptyComponent: {
              colSize: 4,
              idx: "DefaultScreen",
              label: "DefaultScreenComponent",
              colStyle: { borderWidth: 1 },
            },
          },
        },
      },
    },
  },
};

export const events = {
  // FIXME: fix the below logic to be run in component load phase for each mounting like componentDidMount
  $appInit: (setLayoutConfig, setAppState) => { },

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
                },
              },
            });
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
        fetchApi(
          appState.global.tsdApp.activeAction.endPoint,
          appState.global.tsdApp.activeAction.httpMethod,
          body,
          routes["search"]
        );
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
        `http://localhost:8080/transaction-web/${appState.global.tsdApp.editComponent.action.endPoint
        }/${appState.global.tsdApp.viewComponent[
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

const layout = {
  layout: {
    "1.container": {
      rowConfig: {
        rowSize: 1,
        // rowStyle: rowStyle,
      },
      Header: {
        // col no
        colSize: 12,
        idx: "HeaderBar", // componentName
        label: "headerBar", //component
        // colStyle: { borderWidth: 4 },
      },
    },
    "2.container": {
      rowConfig: {
        rowSize: 1,
        // rowStyle: rowStyle,
      },
      // col no
      "2.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "2.1.leftNavBodyRow": {
            rowConfig: {
              rowSize: 12,
              // rowStyle: rowStyle,
            },
            leftNavBody: {
              // col no
              colSize: 2,
              idx: "NavigationBar",
              label: "navigationBar",
              colStyle: { borderWidth: 0, height: "100vh" },
            },
          },
        },
      },
      "2.2.bodyCol": {
        rowConfig: {
          rowSize: 12,
          // rowStyle: rowStyle,
        },
        layout: {
          colConfig: {
            colSize: 10,
            // colStyle: { borderColor: "cyan", borderWidth: 4 },
          },
          "2.2.1.bodyHeaderRow": {
            rowConfig: {
              rowSize: 1.4, // TODO : Adjusted Height with Upper component using calculation of Row Config
              // rowStyle: rowStyle,
              // rowStyle: { borderColor: "red", borderWidth: 1, height: "20vh" },
            },
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "ActionComponent",
              label: "actionComponent",
              colStyle: {
                borderColor: "blue",
                // borderWidth: 2,
                // height: "20vh",
              },
            },
          },
          "2.2.2.bodyTabRow": {
            rowConfig: {
              rowSize: 1.3,
              // rowStyle: rowStyle,
              // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
            },
            bodyContent: {
              // col no
              idx: "TabComponent",
              colSize: 1,
              label: "tabComponent",
              colStyle: {
                borderColor: "blue",
                // borderWidth: 1,
                // height: "89.2vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
              },
            },
          },
          "2.2.3.bodyContentRow": {
            rowConfig: {
              rowSize: 10,
              // rowStyle: rowStyle,
              // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
            },
            "2.2.3.1.bodyContent": {
              // col no
              // idx: "JsonFormComponent",
              idx: "JsonFormComponent",
              colSize: 2,
              label: "bodyHeader",
              colStyle: {
                borderColor: "blue",
                // borderWidth: 1,
                height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
              },
            },
            "2.2.3.1.bodyContent2": {
              // col no
              // idx: "JsonFormComponent",
              idx: "DefaultScreen",
              colSize: 4,
              label: "",
              colStyle: {
                display: "flex",
                borderColor: "blue",
                // borderWidth: 1,
                height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
              },
            },
          },
        },
      },
    },
  },
};
