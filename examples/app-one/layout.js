import { About } from "../../src/components/About";
import { ActionComp } from "../../src/components/ActionComp";
import { Comp5 } from "../../src/components/Comp5";
// import { JsonForm } from "./components/JsonForm";
import { Home } from "../../src/components/Home";
import { RandomPic } from "../../src/components/RandomPic";
import { rowStyle, styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // JsonForm
};

// components section
const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

export const routes = {};

routes.routeOne = {
  0: {
    0: {
      // layout: null // evict the earlier 1st column, other way is to hide it
      layout: {
        colConfig: {
          // colSize: 0, // *** change the colSize

          style: { display: "none" }, // *** hide the 1st column
        },
      },
    },
    1: {
      layout: {
        colConfig: {
          colSize: 8, // *** change the colSize
        },

        1: {
          // *** below we are adding a new row(this will replace current layout config values), and this will have 2 columns
          0: {
            // col no
            colSize: 10,
            idx: "RandomPic",
            label: "body-footer",
          },
          1: {
            // col no
            colSize: 10,
            idx: "RandomPic",
            label: "body-header",
          },
        },
      },
    },
  },
};

routes.routeTwo = {
  0: {
    0: {
      // layout: null // evict the earlier 1st column, other way is to hide it
      layout: {
        colConfig: {
          // colSize: 0, // *** change the colSize
          style: { display: "block" }, // *** hide the 1st column
        },
      },
    },
    1: {
      layout: {
        colConfig: {
          colSize: 3, // *** change the colSize
        },

        1: {
          // *** below we are adding a new row(this will replace current layout config values), and this will have 2 columns
          0: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 1",
          },
          1: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 2",
          },
        },
      },
    },
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
    colConfig: {
      colSize: 1,
    },
    // row no
    0: {
      rowConfig: {
        rowSize: 1,
        style: rowStyle,
      },
      // col no
      0: {
        layout: {
          colConfig: {
            colSize: 3,
          },
          0: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "left-nav",
              colStyle: { borderWidth: 1, minHeight: 700 },
            },
          },
        },
      },
      1: {
        layout: {
          colConfig: {
            colSize: 11,
          },
          0: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "body-header",
              schema,
              colStyle: { borderWidth: 1 },
            },
          },
          1: {
            // row no
            rowConfig: {
              rowSize: 7,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "body-content",
              schema,
              colStyle: { borderWidth: 1, flex: 1 },
            },
          },
          2: {
            // row no
            rowConfig: {
              rowSize: 1,
              style: rowStyle,
            },
            0: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "body-footer",
              schema,
              colStyle: { borderWidth: 1 },
            },
          },
        },
      },
    },
    1: {
      // row no
      rowConfig: {
        rowSize: "0.21",
        style: rowStyle,
      },
      0: {
        // col no
        colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 },
      },
    },
  },
};
