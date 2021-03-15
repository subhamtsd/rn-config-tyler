import { About } from "../../components/About";
import { ActionComp } from "../../components/ActionComp";
import { Comp5 } from "../../components/Comp5";
import { Home } from "../../components/Home";
import { RandomPic } from "../../components/RandomPic";
import { rowStyle, styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
};

// components section

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
  links,
  layout: {
    // row no
    "1container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      // col no
      "11leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "11leftNavHeaderRow": {
            // row no
            rowConfig: {
              rowSize: 0.5,
              rowStyle: rowStyle,
            },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },
          "11leftNavBodyRow": {
            rowConfig: {
              rowSize: 5,
              // rowStyle: rowStyle,
            },
            leftNavBody: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavBody",
              colStyle: { borderWidth: 1, height: "90vh" },
            },
          },
        },
      },
      "12bodyCol": {
        rowConfig: {
          rowSize: 1,
          rowStyle: rowStyle,
        },
        layout: {
          colConfig: {
            colSize: 11,
            colStyle: { borderColor: "cyan", borderWidth: 4 },
          },
          "121bodyHeaderRow": {
            rowConfig: {
              rowSize: 1,
              rowStyle: rowStyle,
            },
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "About",
              label: "bodyHeader",
              colStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
            },
          },
          "122bodyContentRow": {
            rowConfig: {
              rowSize: 12,
              rowStyle: rowStyle,
            },
            bodyContent: {
              // col no
              idx: "Home",
              colSize: 1,
              label: "bodyContent",
              colStyle: { borderColor: "red", borderWidth: 2, height: "80vh" },
            },
          },
          "123bodyFooterRow": {
            rowConfig: {
              rowSize: 1,
              rowStyle: rowStyle,
            },
            bodyFooter: {
              // col no
              idx: "Home",
              colSize: 1,
              label: "bodyFooter",
              colStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
            },
          },
        },
      },
    },
    "2container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      footer: {
        // col no
        colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 },
      },
    },
  },
};
