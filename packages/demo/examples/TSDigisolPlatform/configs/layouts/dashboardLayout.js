/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  // JsonForm,
} from "../../../../components/index";
import { rowStyle, styles } from "../../styles/common";

// ******************** TODO APP EXAMPLE ************************* //
// import { TodoApp1 } from "../../../todo-app/TODOAPP/TodoApp1";
// import { TodoApp2 } from "../../../todo-app/TODOAPP/TodoApp2";
// import { SideNavBar } from "../../../todo-app/TODOAPP/SideNavBar";

// TSD COMPONENT
import { NavigationBar } from "../../components/NavigationBar/index";
import { HeaderBar } from "../../components/HeaderBar";
import { TabComponent } from "../../components/TabComponent";
import { ActionComponent } from "../../components/ActionComponent/index";
import { JsonFormComponent } from "../../components/JsonFormComponent/index";
import { DefaultScreen } from "../../components/DefaultScreen";
import { ListComponent } from "../../components/ListComponent";
import { DetailListComponent } from "../../components/DetailListComponent";
import { EditComponent } from "../../components/EditComponent/index";
import { ListJsonFormComponent } from "../../../../components/ListJsonFormComponent";

// ******************** TEST OF AddEditEntity *************************
import { AddEditEntity } from "../../../../components/AddEditEntity";
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
    "1.container": {
      rowConfig: {
        rowSize: 1,
      },
      Header: {
        colSize: 12,
        idx: "HeaderBar",
        label: "headerBar",
      },
    },
    "2.container": {
      rowConfig: {
        rowSize: 1,
      },
      "2.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "2.1.leftNavBodyRow": {
            rowConfig: {
              rowSize: 12,
            },
            leftNavBody: {
              colSize: 2,
              idx: "NavigationBar",
              label: "navigationBar",
              colStyle: {
                borderWidth: 0,
                height: "110vh",
              },
            },
          },
        },
      },
      "2.2.bodyCol": {
        rowConfig: {
          rowSize: 12,
        },
        layout: {
          colConfig: {
            colSize: 10,
          },
          "2.2.1.bodyHeaderRow": {
            rowConfig: {
              rowSize: 1.4,
            },
            bodyHeader: {
              idx: "ActionComponent",
              label: "actionComponent",
              colStyle: {
                borderColor: "blue",
              },
            },
          },
          "2.2.2.bodyTabRow": {
            rowConfig: {
              rowSize: 1.3,
            },
            bodyContent: {
              idx: "TabComponent",
              colSize: 1,
              label: "tabComponent",
              colStyle: {
                borderColor: "blue",
              },
            },
          },
          "2.2.3.bodyContentRow": {
            rowConfig: {
              rowSize: 10,
            },
            "2.2.3.1.bodyContent": {
              idx: "JsonFormComponent",
              colSize: 2,
              label: "bodyHeader",
              colStyle: {
                borderColor: "blue",
              },
            },
            "2.2.3.1.bodyContent2": {
              idx: "DefaultScreen",
              colSize: 4,
              label: "",
              colStyle: {
                display: "flex",
                borderColor: "blue",
              },
            },
          },
        },
      },
    },
  },
};

// export const appConfig = apiAppConfig();

async function apiAppConfig() {
  const res = await fetch(
    "https://run.mocky.io/v3/df352bf5-122b-4030-9f9d-6f882e171c7b"
  )
    .then((_config) => {
      return _config.json();
    })
    .then((data) => {
      const appConfig = {
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
        layout: data,
      };
      // setConfig(appConfig);
      console.log("appConfigg ::::: ---> ", data);
      return appConfig;
    })
    .then((_appConfigData) => {
      return _appConfigData;
    });
}

// export const appConfig4 = {
//   /// 1st layout
//   componentsSet,
//   links, // FIXME: links mess up the styling in dynamic page transitions. pls look at the fix
//   layout: {
//     // row no
//     "1container": {
//       rowConfig: {
//         rowSize: 1,
//         rowStyle: rowStyle,
//       },
//       "12bodyCol": {
//         layout: {
//           colConfig: {
//             colSize: 11,
//           },
//           "121bodyHeaderRow": {
//             rowConfig: {
//               rowSize: 4,
//             },
//             bodyHeader: {
//               // col no
//               idx: "About",
//               label: "bodyHeader",
//             },
//           },
//         },
//       },
//     },
//   },
// };

// export const appConfig2 = {
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
//       Header: {
//         // col no
//         colSize: 1,
//         idx: "HeaderBar",
//         label: "headerBar",
//       },
//     },
//     "2.container": {
//       rowConfig: {
//         rowSize: 1,
//       },
//       // col no
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//           },
//           "2.1.leftNavBodyRow": {
//             rowConfig: {
//               rowSize: 12,
//             },
//             leftNavBody: {
//               // col no
//               colSize: 1,
//               idx: "NavigationBar",
//               label: "navigationBar",
//               colStyle: { borderWidth: 0, height: "100vh" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         rowConfig: {
//           rowSize: 12,
//         },
//         layout: {
//           colConfig: {
//             colSize: 11,
//             colStyle: {
//               borderColor: "cyan",
//               borderWidth: 0,
//             },
//           },
//           "2.2.1.bodyHeaderRow": {
//             rowConfig: {
//               rowSize: 1.2,
//             },
//             bodyHeader: {
//               // col no
//               colSize: 1,
//               idx: "ActionComponent",
//               label: "actionComponent",
//               // colStyle: {
//               //   borderColor: "blue",
//               //   borderWidth: 0,
//               //   height: "20vh",
//               // },
//             },
//           },
//           "2.2.2.bodyTabRow": {
//             rowConfig: {
//               rowSize: 1.3,
//               // rowStyle: rowStyle,
//               // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
//             },
//             bodyContent: {
//               // col no
//               idx: "TabComponent",
//               colSize: 1,
//               label: "tabComponent",
//               colStyle: {
//                 borderColor: "blue",
//               },
//             },
//           },
//           "2.2.3.bodyContentRow": {
//             rowConfig: {
//               rowSize: 10,
//             },
//             bodyContent1: {
//               // col no
//               // idx: "JsonFormComponent",
//               idx: "JsonFormComponent",
//               colSize: 2,
//               label: "jsonFormComponent",
//               colStyle: {
//                 borderColor: "blue",
//                 // borderWidth: 1,
//                 height: "80vh",
//               },
//             },
//             bodyContent2: {
//               // col no
//               // idx: "JsonFormComponent",
//               idx: "DefaultScreen",
//               colSize: 3,
//               label: "defaultScreen",
//               colStyle: {
//                 borderColor: "blue",
//                 borderWidth: 0,
//                 height: "80vh",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// // Order Screen
// export const appConfig3 = {
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
//       Header: {
//         // col no
//         colSize: 1,
//         idx: "HeaderBar", // component name
//         label: "headerBar",
//       },
//     },
//     "2.container": {
//       rowConfig: {
//         rowSize: 1,
//       },
//       // col no
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//           },
//           "2.1.leftNavBodyRow": {
//             rowConfig: {
//               rowSize: 12,
//             },
//             leftNavBody: {
//               // col no
//               colSize: 1,
//               idx: "NavigationBar",
//               label: "navigationBar",
//               colStyle: { borderWidth: 0, height: "100vh" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         rowConfig: {
//           rowSize: 12,
//         },
//         layout: {
//           colConfig: {
//             colSize: 11,
//             colStyle: {
//               borderColor: "cyan",
//               borderWidth: 0,
//             },
//           },
//           "2.2.1.bodyHeaderRow": {
//             rowConfig: {
//               rowSize: 1.2,
//             },
//             bodyHeader: {
//               // col no
//               colSize: 1,
//               idx: "ActionComponent",
//               label: "actionComponent",
//               // colStyle: {
//               //   borderColor: "blue",
//               //   borderWidth: 0,
//               //   height: "20vh",
//               // },
//             },
//           },
//           "2.2.2.bodyTabRow": {
//             rowConfig: {
//               rowSize: 1.3,
//               // rowStyle: rowStyle,
//               // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
//             },
//             bodyContent: {
//               // col no
//               idx: "TabComponent",
//               colSize: 1,
//               label: "tabComponent",
//               colStyle: {
//                 borderColor: "blue",
//               },
//             },
//           },
//           // Add this row
//           "2.2.2.bodyContentRow": {
//             rowConfig: {
//               rowSize: 5,
//               // rowStyle: rowStyle,
//               rowStyle: { borderColor: "red", borderWidth: 1, height: "30vh" },
//             },
//             bodyContent: {
//               // col no
//               idx: "JsonFormComponent",
//               colSize: 1,
//               label: "tabComponent",
//               colStyle: {
//                 borderColor: "blue",
//                 borderWidth: 1,
//                 // height: "30vh",
//               },
//             },
//           },
//           // Add this row
//           "2.2.3.bodyContentRow": {
//             rowConfig: {
//               rowSize: 5,
//             },
//             // col 1
//             bodyContent1: {
//               // col no
//               // idx: "JsonFormComponent",
//               idx: "DefaultScreen",
//               colSize: 2,
//               label: "listView",
//               colStyle: {
//                 borderColor: "blue",
//                 borderWidth: 1,
//                 height: "40vh",
//               },
//             },
//             // col 2
//             bodyContent2: {
//               // col no
//               // idx: "JsonFormComponent",
//               idx: "DefaultScreen",
//               colSize: 3,
//               label: "detailView",
//               colStyle: {
//                 borderColor: "blue",
//                 borderWidth: 0,
//                 height: "40vh",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };
