/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  About,
  ActionComp,
  Comp5,
  Home,
  RandomPic,
  // JsonForm,
} from "../../../../components/index";
import { styles } from "../../styles/common";

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
import { DefaultScreen } from "../../components/DefaultScreen/index";
import { ScreenJsonEditor } from "../../components/ScreenJsonEditor";
import { ListComponent } from "../../components/ListComponent";
import { DetailListComponent } from "../../components/DetailListComponent";
import { EditComponent } from "../../components/EditComponent/index";
import { ListJsonFormComponent } from "../../../../components/ListJsonFormComponent";
import { LoginComponent } from "../../components/LoginComponent";
import { BillToAddressDetailViewComponent } from "../../components/domainSpecific/BillToAddressDetailViewComponent";
import { OrderLineAddressDetailViewComponent } from "../../components/domainSpecific/OrderLineAddressDetailViewComponent";
import { OrderLineDetailViewComponent } from "../../components/domainSpecific/OrderLineDetailViewComponent";
import { OrderLineListViewComponent } from "../../components/domainSpecific/OrderLineListViewComponent";
import { ShowQRCodeComponent } from "../../components/ShowQRCodeComponent";
import { EditOrderLineDetailComponent } from "../../components/domainSpecific/EditOrderLineDetailComponent/index";
import { EditBillToAddressDetailComponent } from "../../components/domainSpecific/EditBillToAddressDetailComponent/index";
import { CreateAddressFormComponent } from "../../components/domainSpecific/CreateAddressFormComponent";
import { CreateOrderlineListComponent } from "../../components/domainSpecific/CreateOrderlineListComponent";
import { CreateOrderlineAddressComponent } from "../../components/domainSpecific/CreateOrderlineAddressComponent";
import { CreateOrderFooterComponent } from "./../../components/domainSpecific/CreateOrderFooterComponent/index";
import { EditOrderLineAddressDetailComponent } from "../../components/domainSpecific/EditOrderLineAddressDetailComponent/index";

// ******************** TEST OF AddEditEntity *************************
import { AddEditEntity } from "../../../../components/AddEditEntity";

// ******************** POC on NAV BAR *****************************
import { ToggleNavigation } from "../../../../components/ToggleNavigation";

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

// *************************************************
//  Layout config
// *************************************************
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
//         rowSize: 12,
//       },
//       LoginComponent: {
//         colSize: 12,
//         idx: "LoginComponent",
//         label: "loginComponent",
//       },
//     },
//   },
// };

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
      // col
      Header: {
        colSize: 3,
        idx: "HeaderBar",
        label: "headerBar",
      },
    },
    "2.container": {
      rowConfig: {
        rowSize: 12,
      },
      "2.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 1.5,
          },
          "2.1.leftNavBodyRow": {
            rowConfig: {
              rowSize: 12,
            },
            leftNavBody: {
              colSize: 1,
              // idx: "ToggleNavigation",
              idx: "NavigationBar",
              label: "navigationBar",
              colStyle: {
                height: "110vh",
                borderWidth: 0,
                borderColor: "blue",
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
              colSize: 12,
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
              colSize: 12,
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
              colSize: 2,
              label: "helloWorld",
              colStyle: {
                // display: "flex",
                borderColor: "blue",
                // borderWidth: 1,
              },
            },
          },
        },
      },
    },
  },
};
