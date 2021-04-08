import { About } from "../../components/About";
import { ActionComp } from "../../components/ActionComp";
import { Comp5 } from "../../components/Comp5";
import { Home } from "../../components/Home";
import { RandomPic } from "../../components/RandomPic";

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


export const appConfig = {
  /// 1st layout
  componentsSet,
  layout: {
    // row no
    "1container": {
      "11leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
            colStyle: { borderColor: "cyan", borderWidth: 4 },

          },
          "111leftNavHeaderRow": {
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "About",
              label: "leftNavHeader",
              colStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
            },
          },
          "112leftNavBodyRow": {
            leftNavBody: {
              // col no
              idx: "Home",
              colSize: 1,
              label: "leftNavBody",
              colStyle: { borderColor: "red", borderWidth: 2, height: "80vh" },
            },
          },
          // "113leftNavFooterRow": {
          //   leftNavFooter: {
          //     // col no
          //     colSize: 1,
          //     idx: "About",
          //     label: "leftNavFooter",
          //     colStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
          //   },
          // },
        },
      },
      "12bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
            colStyle: { borderColor: "cyan", borderWidth: 4 },
          },
          "121bodyHeaderRow": {
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "About",
              label: "bodyHeader",
              colStyle: { borderColor: "red", borderWidth: 2, height: "10vh" },
            },
          },
          "122bodyContentRow": {
            bodyContent: {
              // col no
              idx: "Home",
              colSize: 1,
              label: "bodyContent",
              colStyle: { borderColor: "red", borderWidth: 2, height: "80vh" },
            },
          },
          "123bodyFooterRow": {
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
      footer: {
        // col no
        colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 , height: "10vh" },
      },
    },
  },
};
