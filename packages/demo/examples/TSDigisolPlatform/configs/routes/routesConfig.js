export const routes = {};

routes.orderLineDetail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "236vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.4.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.5.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "DetailListComponent",
            label: "detailListComponent",
            colStyle: { borderColor: "red", height: "75vh" },
            passProps: {
              UItitle: "Order Details",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "BillToAddressDetailViewComponent",
            label: "billToAddressDetailViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Bill To Address",
            },
          },
        },
        "2.2.4.BodyRow": {
          "2.2.4.1.bodyContent": {
            colSize: 2,
            idx: "OrderLineListViewComponent",
            label: "orderLineListViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "OrderLines of Order",
            },
          },
          // "2.2.4.1.bodyContent2": {
          //   colSize: 2,
          //   idx: "BillToAddressDetailViewComponent",
          //   label: "billToAddressDetailViewComponent",
          //   colStyle: { borderWidth: 1, borderColor: "red", height: "100vh" },
          //   passProps: {
          //     UItitle: "Bill To Address Details",
          //   },
          // },
        },
        "2.2.5.BodyRow": {
          "2.2.5.1.bodyContent": {
            colSize: 2,
            idx: "OrderLineDetailViewComponent",
            label: "orderLineDetailViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "OrderLine Detail",
            },
          },
          "2.2.5.1.bodyContent2": {
            colSize: 2,
            idx: "OrderLineAddressDetailViewComponent",
            label: "orderLineAddressDetailViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Orderline Address Detail",
            },
          },
        },
      },
    },
  },
};

routes.orderDetail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "162vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.4.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "DetailListComponent",
            label: "detailListComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Order Details",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "BillToAddressDetailViewComponent",
            label: "billToAddressDetailViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Bill To Address",
            },
          },
        },
        "2.2.4.BodyRow": {
          "2.2.4.1.bodyContent": {
            colSize: 2,
            idx: "OrderLineListViewComponent",
            label: "orderLineListViewComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "OrderLines of Order",
            },
          },
          // "2.2.4.1.bodyContent2": {
          //   colSize: 2,
          //   idx: "BillToAddressDetailViewComponent",
          //   label: "billToAddressDetailViewComponent",
          //   colStyle: { borderWidth: 1, borderColor: "red", height: "100vh" },
          //   passProps: {
          //     UItitle: "Bill To Address Details",
          //   },
          // },
        },
      },
    },
  },
};

routes.defaultAppConfig = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: {
              height: "88vh",
            },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            label: "navigationBar",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            label: "navigationBar",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: {
              borderWidth: 1,
              height: "8vh",
            },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: {
              borderWidth: 1,
              height: "7vh",
            },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: {
              height: "75vh",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 4,
            idx: "DefaultScreen",
            label: "helloWorld",
            colStyle: {
              height: "75vh",
            },
          },
        },
      },
    },
  },
};

routes.search = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          // "2.2.3.1.bodyContent": {
          //   colSize: 2,
          //   idx: "JsonFormComponent",
          //   label: "bodyHeader",
          //   colStyle: { borderWidth: 1, borderColor: "red", height: "80vh" },
          // },
          "2.2.3.1.bodyContent2": {
            colSize: 4,
            idx: "ListComponent",
            label: "listComponent",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.detail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              // display: "none",
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              // display: "none",
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "DetailListComponent",
            label: "detailListComponent",
            colStyle: { height: "75vh" },
          },
          // "2.2.3.1.bodyContent2": {
          //   colSize: 2,
          //   idx: "ShowQRCodeComponent",
          //   label: "showQRCodeComponent",
          //   colStyle: { borderWidth: 1, height: "80vh", display: "none" },
          // },
        },
      },
    },
  },
};

routes.edit = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "EditComponent",
            label: "editComponent",
            colStyle: { height: "75vh" },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "DefaultScreen",
            label: "defaultScreen",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.editOrderLineDetail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "EditOrderLineDetailComponent",
            label: "editOrderLineDetailComponent",
            colStyle: { height: "75vh" },
          },
          "2.2.3.2.bodyContent2": {
            colSize: 4,
            idx: "DefaultScreen",
            label: "defaultScreen",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.editBillToAddressDetail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "EditBillToAddressDetailComponent",
            label: "editBillToAddressDetailComponent",
            colStyle: { height: "75vh" },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "DefaultScreen",
            label: "defaultScreen",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.editOrderLineAddressDetail = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "EditOrderLineAddressDetailComponent",
            label: "editOrderLineAddressDetailComponent",
            colStyle: { height: "75vh" },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "DefaultScreen",
            label: "defaultScreen",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.delete = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              // display: "none",
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              // display: "none",
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: { borderColor: "red", height: "75vh" },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 4,
            idx: "DefaultScreen",
            label: "helloWorld",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};

routes.createOrder = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              display: "block",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              display: "block",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 1,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Order Details",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Add Address",
              _childDependency: {
                createAddressFormComponentDependency: {
                  moduleKey: 2007,
                  tabKey: 3006,
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

routes.createOrderline = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "169vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.4.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.5.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 1,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Order Details",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Add Address",
              _childDependency: {
                createAddressFormComponentDependency: {
                  moduleKey: 2007,
                  tabKey: 3006,
                  actionName: "Create",
                },
              },
            },
          },
        },
        "2.2.4.BodyRow": {
          "2.2.4.1.bodyContent": {
            colSize: 1,
            idx: "CreateOrderlineListComponent",
            label: "createOrderlineListComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Add Orderline",
            },
          },
        },
        "2.2.5.BodyRow": {
          "2.2.5.1.bodyContent": {
            colSize: 1,
            idx: "CreateOrderFooterComponent",
            label: "createOrderFooterComponent",
            colStyle: { height: "8vh" },
          },
        },
      },
    },
  },
};

routes.createOrderlineAddress = {
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
            colStyle: { height: "auto" },
          },
        },
      },
    },
  },
  "2.container": {
    "2.1.leftNavCol": {
      layout: {
        colConfig: {
          colSize: 1.5,
        },
        "2.1.leftNavBodyRow": {
          leftNavBody: {
            idx: "NavigationBar",
            label: "navigationBar",
            colStyle: { height: "169vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.4.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
          },
        },
        "2.5.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
              // display: "none",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 1,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Order Details",
            },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 2,
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Add Address",
              _childDependency: {
                createAddressFormComponentDependency: {
                  moduleKey: 2007,
                  tabKey: 3006,
                  actionName: "Create",
                },
              },
            },
          },
        },
        "2.2.4.BodyRow": {
          "2.2.4.1.bodyContent": {
            colSize: 2,
            idx: "CreateOrderlineListComponent",
            label: "createOrderlineListComponent",
            colStyle: { height: "75vh" },
            passProps: {
              UItitle: "Add Orderline",
              // _childDependency: {
              //   createOrderlineListComponentDependency: {
              //     moduleKey: 2007,
              //     tabKey: 3006,
              //     actionName: "Create",
              //   },
              // },
            },
          },
          "2.2.4.2.bodyContent": {
            colSize: 1,
            idx: "CreateOrderlineAddressComponent",
            label: "createOrderlineAddressComponent",
            passProps: {
              UItitle: "Add Ship To Address",
              _childDependency: {
                createOrderlineAddressComponentDependency: {
                  moduleKey: 2007,
                  tabKey: 3006,
                  actionName: "Create",
                },
              },
            },
            colStyle: { height: "75vh" },
          },
        },
        "2.2.5.BodyRow": {
          "2.2.5.1.bodyContent": {
            colSize: 1,
            idx: "CreateOrderFooterComponent",
            label: "createOrderFooterComponent",
            colStyle: { height: "8vh" },
          },
        },
      },
    },
  },
};

// TODO: Adjusted the height of the rows in jsonEditorScreen gap between headerBar and ActionComponent
routes.jsonEditorScreen = {
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
            colStyle: { height: "auto" },
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
            colStyle: { height: "88vh" },
            // colStyle: { borderWidth:1, height: "100vh" },
          },
        },
        "2.2.leftNavBodyRow": {
          leftNavBody2: {
            idx: "DefaultScreen",
            // label: "1",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
          },
        },
        "2.3.leftNavBodyRow": {
          leftNavBody3: {
            idx: "DefaultScreen",
            // label: "2",
            colStyle: {
              backgroundColor: "skyblue",
              borderWidth: 1,
              height: "1vh",
            },
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
          bodyHeader: {
            idx: "ActionComponent",
            label: "actionComponent",
            colStyle: { height: "8vh" },
          },
        },
        "2.2.2.BodyRow": {
          bodyContent: {
            idx: "TabComponent",
            label: "tabComponent",
            colStyle: { height: "7vh" },
          },
        },
        "2.2.3.BodyRow": {
          "2.2.3.1.bodyContent": {
            colSize: 2,
            idx: "JsonFormComponent",
            label: "bodyHeader",
            colStyle: { height: "75vh" },
          },
          "2.2.3.1.bodyContent2": {
            colSize: 4,
            idx: "ScreenJsonEditor",
            label: "screenJsonEditor",
            colStyle: { height: "75vh" },
          },
        },
      },
    },
  },
};
