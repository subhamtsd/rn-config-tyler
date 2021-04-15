export const routes = {};

routes.orderLineDetail = {
  "1.container": {
    rowConfig: {
      rowSize: 1,
      // rowStyle: rowStyle,
    },
    Header: {
      // col no
      colSize: 1,
      idx: "HeaderBar",
      label: "headerBar",
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
            colSize: 1,
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
          colSize: 11,
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
            colSize: 3,
            label: "jsonFormComponent",
            colStyle: {
              display: "none",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.3.1.bodyContent2": {
            // col no
            // idx: "JsonFormComponent",
            idx: "DetailListComponent",
            colSize: 2,
            label: "detailListComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
        },
        "2.2.4.bodyContentRow": {
          rowConfig: {
            rowSize: 10,
            // rowStyle: rowStyle,
            // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
          },
          "2.2.4.1.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "OrderLineListViewComponent",
            colSize: 2,
            label: "orderLineListViewComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.4.2.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "BillToAddressDetailViewComponent",
            colSize: 2,
            label: "billToAddressDetailViewComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
        },
        "2.2.5.bodyContentRow": {
          rowConfig: {
            rowSize: 10,
            // rowStyle: rowStyle,
            // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
          },
          "2.2.5.1.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "OrderLineListViewComponent",
            colSize: 2,
            label: "orderLineListViewComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.5.2.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "BillToAddressDetailViewComponent",
            colSize: 2,
            label: "billToAddressDetailViewComponent",
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
};

routes.orderDetail = {
  "1.container": {
    rowConfig: {
      rowSize: 1,
      // rowStyle: rowStyle,
    },
    Header: {
      // col no
      colSize: 1,
      idx: "HeaderBar",
      label: "headerBar",
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
            colSize: 1,
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
          colSize: 11,
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
            colSize: 3,
            label: "jsonFormComponent",
            colStyle: {
              display: "none",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.3.1.bodyContent2": {
            // col no
            // idx: "JsonFormComponent",
            idx: "DetailListComponent",
            colSize: 2,
            label: "detailListComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
        },
        "2.2.4.bodyContentRow": {
          rowConfig: {
            rowSize: 10,
            // rowStyle: rowStyle,
            // rowStyle: { borderColor: "red", borderWidth: 4, height: "80vh" },
          },
          "2.2.4.1.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "OrderLineListViewComponent",
            colSize: 2,
            label: "orderLineListViewComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.4.2.bodyContent": {
            // col no
            // idx: "JsonFormComponent",
            idx: "BillToAddressDetailViewComponent",
            colSize: 2,
            label: "billToAddressDetailViewComponent",
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
};

routes.defaultAppConfig = {
  "1.container": {
    rowConfig: {
      rowSize: 1,
      // rowStyle: rowStyle,
    },
    Header: {
      // col no
      colSize: 1,
      idx: "HeaderBar",
      label: "headerBar",
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
            colSize: 1,
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
          colSize: 11,
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
            colSize: 3,
            label: "jsonFormComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.3.1.bodyContent2": {
            // col no
            // idx: "JsonFormComponent",
            idx: "DefaultScreen",
            colSize: 2,
            label: "defaultScreen",
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
};

routes.search = {
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
            idx: "ListComponent",
            colSize: 4,
            label: "listComponent",
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
};

routes.detail = {
  "1.container": {
    rowConfig: {
      rowSize: 1,
      // rowStyle: rowStyle,
    },
    Header: {
      // col no
      colSize: 1,
      idx: "HeaderBar",
      label: "headerBar",
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
            colSize: 1,
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
          colSize: 11,
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
            colSize: 3,
            label: "jsonFormComponent",
            colStyle: {
              display: "none",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.3.1.bodyContent2": {
            // col no
            // idx: "JsonFormComponent",
            idx: "DetailListComponent",
            colSize: 2,
            label: "detailListComponent",
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
};

routes.edit = {
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
            idx: "EditComponent",
            colSize: 4,
            label: "editComponent",
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
            colSize: 2,
            label: "defaultScreen",
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
};

routes.delete = {
  "1.container": {
    rowConfig: {
      rowSize: 1,
      // rowStyle: rowStyle,
    },
    Header: {
      // col no
      colSize: 1,
      idx: "HeaderBar",
      label: "headerBar",
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
            colSize: 1,
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
          colSize: 11,
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
            colSize: 3,
            label: "jsonFormComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
          "2.2.3.1.bodyContent2": {
            // col no
            // idx: "JsonFormComponent",
            idx: "DefaultScreen",
            colSize: 2,
            label: "defaultScreen",
            colStyle: {
              display: "none",
              borderColor: "blue",
              // borderWidth: 1,
              height: "80vh", // TODO : Adjusted Height with Upper component using calculation of Row Config
            },
          },
        },
      },
    },
  },
};

routes.userChildLayout = {
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
              height: "100vh",
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
            idx: "ListJsonFormComponent",
            colSize: 4,
            label: "listJsonFormComponent",
            colStyle: {
              display: "flex",
              borderColor: "blue",
            },
            passProps: {
              _childDependeny: {
                ListJsonFormComponentDependency: {
                  moduleKey: 2007,
                  tabKey: 3005,
                  actionName: "Create",
                },
              },
            },
          },
        },
      },
    },
  },
};

// routes.userChildLayout = {
//   "2.2.3.1.bodyContent2": {
//     idx: "ListJsonFormComponent",
//     colSize: 4,
//     label: "listJsonFormComponent",
//     colStyle: {
//       display: "flex",
//       borderColor: "blue",
//     },
//     passProps: {
//       _childDependeny: {
//         ListJsonFormComponentDependency: {
//           moduleKey: 2007,
//           tabKey: 3005,
//           actionName: "Create",
//         },
//       },
//     },
//   },
// };
