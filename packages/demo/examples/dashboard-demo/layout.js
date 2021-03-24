/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  JsonForm,
} from "../../components/index";
import { TabDashboard } from "./component-for-dashboard/TabDashboard";
import { ActionDashboard } from "./component-for-dashboard/ActionDashboard";
import { JsonFormDashboard } from "./component-for-dashboard/JsonFormDashboard";
import { DefaultScreen } from "./component-for-dashboard/DefaultScreen";
import { NavigationBarDashboard } from "./component-for-dashboard/NavigationBarDashboard";
import { HeaderDashboard } from "./component-for-dashboard/HeaderDashboard";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  JsonForm,

  // Dashboard Demo Example Component
  TabDashboard,
  ActionDashboard,
  JsonFormDashboard,
  DefaultScreen,
  NavigationBarDashboard,
  HeaderDashboard,
};


export const appConfig = {
  /// 1st layout
  componentsSet,
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
              idx: "HeaderDashboard",
              label: "header-label",
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
              idx: "NavigationBarDashboard",
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
              idx: "ActionDashboard",
              label: "actionComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.2.BodyRow": {
            tabView: {
              idx: "TabDashboard",
              label: "tabComponent",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "2.2.3.BodyRow": {
            jsonFormComponent: {
              colSize: 2,
              idx: "JsonFormDashboard",
              label: "jsonFormComponent",
              colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
            },
            emptyComponent: {
              colSize: 1,
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

// // Main appConfig for Default load
// export const appConfig1 = {
//   /// 1st layout
//   componentsSet,
//   layout: {
//     "1.container": {
//       "1.1.leftNavCol": {
//         layout: {
//           "1.1.leftNavBodyRow": {
//             Header: {
//               colSize: 1,
//               idx: "HeaderDashboard",
//               label: "header-label",
//               colStyle: { borderWidth: 1, height: "10%" },

//             },
//           },
//         },
//       },
//     },
//     "2.container": {
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 1,
//           },
//           "2.1.leftNavBodyRow": {
//             leftNavBody: {
//               idx: "NavigationBarDashboard",
//               label: "navigationBar",
//               colStyle: { borderWidth: 0, height: "100%" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         layout: {
//           colConfig: {
//             colSize: 11,
//             colStyle: { borderWidth: 1, height: "100%" },

//           },
//           "2.2.1.BodyRow": {
//             actionView: {
//               idx: "ActionDashboard",
//               label: "actionComponent",
//               colStyle: { borderWidth: 1, height: "10%" },
//             },
//           },
//           "2.2.2.BodyRow": {
//             tabView: {
//               idx: "TabDashboard",
//               label: "tabComponent",
//               colStyle: { borderWidth: 1, height: "10%" },
//             },
//           },
//           "2.2.3.BodyRow": {
//             jsonFormComponent: {
//               colSize: 1,
//               idx: "JsonFormDashboard",
//               label: "jsonFormComponent",
//               colStyle: { borderWidth: 1, borderColor: "red" },
//             },
//             emptyComponent: {
//               colSize: 1,
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

// export const appConfig2 = {
//   /// 1st layout
//   componentsSet,
//   layout: {
//     "1.container": {
//       Header: { colSize: 12, idx: "Home", label: "header-label", colStyle: { height: "100%" } },
//     },
//     "2.container": {
//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: { colSize: 2, height: "100%" },
//           "2.1.leftNavBodyRow": {
//             leftNavBody: {
//               colSize: 2,
//               idx: "Home",
//               label: "navigationBar",
//               colStyle: { height: "100%" },
//             },
//           },
//         },
//       },
//       "2.2.bodyCol": {
//         layout: {
//           colConfig: { colSize: 10 },
//           "2.2.1.BodyRow": {
//             actionView: {
//               colSize: 2,
//               idx: "Home",
//               label: "actionComponent",
//               colStyle: { height: "100%" },
//             },
//           },
//           "2.2.2.BodyRow": {
//             tabView: {
//               colSize: 2,
//               idx: "Home",
//               label: "tabComponent",
//               colStyle: { height: "100%" },
//             },
//           },
//           "2.2.3.BodyRow": {
//             jsonFormComponent: {
//               colSize: 1,
//               idx: "Home",
//               label: "jsonFormComponent",
//               colStyle: { height: "100%" },
//             },
//             emptyComponent: {
//               colSize: 2,
//               idx: "Home",
//               label: "DefaultScreenComponent",
//               colStyle: {},
//             },
//           },
//         },
//       },
//     },
//   },
// };

// export const appConfig3 = {
//   /// 1st layout
//   componentsSet,
//   layout: {
//     "1.container": {

//       Header: {
//         colSize: 12,
//         idx: "HeaderDashboard",
//         label: "header-label",
//         colStyle: { borderWidth: 0, height: "100%" },
//       },
//     },
//     "2.container": {

//       "2.1.leftNavCol": {
//         layout: {
//           colConfig: {
//             colSize: 2,
//             height: "100%"
//           },
//           "2.1.leftNavBodyRow": {

//             leftNavBody: {
//               // col no
//               colSize: 2,
//               idx: "NavigationBarDashboard",
//               label: "navigationBar",
//               colStyle: { borderWidth: 0, height: "100%" },
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
//               colSize: 2,
//               idx: "Home",
//               label: "actionComponent",
//               colStyle: { borderWidth: 1, height: "100%" },
//             },
//           },
//           "2.2.2.BodyRow": {

//             tabView: {
//               colSize: 2,
//               idx: "Home",
//               label: "tabComponent",
//               colStyle: { borderWidth: 1, height: "100%" },
//             },
//           },
//           "2.2.3.BodyRow": {

//             orderDetailView: {
//               colSize: 4,
//               idx: "Home",
//               label: "orderDetailView",
//               colStyle: { borderWidth: 2, borderColor: "red", height: "100%" },
//             },
//           },
//           "2.2.4.BodyRow": {

//             orderLineListView: {
//               colSize: 2,
//               idx: "Home",
//               label: "orderLineListView",
//               colStyle: { borderWidth: 2, borderColor: "red", height: "100%" },
//             },
//             billToAddressDetailView: {
//               colSize: 2,
//               idx: "DefaultScreen",
//               label: "billToAddressDetailView",
//               colStyle: { borderWidth: 1 },
//             },
//           },
//           "2.2.5.BodyRow": {
//             orderLineDetail: {
//               colSize: 2,
//               idx: "Home",
//               label: "orderLineDetail",
//               colStyle: { borderWidth: 2, borderColor: "red", height: "100%" },
//             },
//             orderLineAddressDetail: {
//               colSize: 2,
//               idx: "DefaultScreen",
//               label: "orderLineAddressDetail",
//               colStyle: { borderWidth: 1 },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// End of Main appConfig for Default Load

// *************************************************
//  End of Layout config
// *************************************************

