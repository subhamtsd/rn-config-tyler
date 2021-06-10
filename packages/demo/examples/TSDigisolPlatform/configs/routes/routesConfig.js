export const routes = {};

routes.orderLineDetail = {
  0: {
    0: {
      idx: "HeaderBar",
      label: "headerBar",
      // colClass: "sticky top-",
      size: 1.3,
    },
  },
  1: {
    0: {
      idx: "NavigationBar",
      label: "navigationBar",
      // colClass: "bg-red-200 p-1 text-sm",
      size: 15,
    },
    1: {
      layout: {
        0: {
          0: {
            idx: "ActionComponent",
            label: "actionComponent",
            // colClass: "fixed",
            size: 10,
          },
        },
        1: {
          0: {
            idx: "TabComponent",
            label: "tabComponent",
            // colClass: "fixed",
            size: 10,
          },
        },
        2: {
          0: {
            idx: "DetailListComponent",
            label: "detailListComponent",
            // colClass: "h-screen",
            size: 100,
          },
          1: {
            idx: "BillToAddressDetailViewComponent",
            label: "billToAddressDetailViewComponent",
            // colClass: "bg-red-200 p-1 text-sm",
            size: 100,
          },
        },
        3: {
          0: {
            idx: "OrderLineListViewComponent",
            label: "orderLineListViewComponent",
            // colClass: "h-screen",
            size: 100,
          },
        },
        4: {
          0: {
            idx: "OrderLineDetailViewComponent",
            label: "orderLineDetailViewComponent",
            // colClass: "h-screen",
            size: 100,
          },
          1: {
            idx: "OrderLineAddressDetailViewComponent",
            label: "orderLineAddressDetailViewComponent",
            // colClass: "bg-red-200 p-1 text-sm",
            size: 100,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
  layoutConfig: {
    // layoutClass: "fixe",
  },
};

routes.orderDetail = {
  0: {
    0: {
      idx: "HeaderBar",
      label: "headerBar",
      // colClass: "sticky top-",
      size: 1.3,
    },
  },
  1: {
    0: {
      idx: "NavigationBar",
      label: "navigationBar",
      // colClass: "bg-red-200 p-1 text-sm",
      size: 15,
    },
    1: {
      layout: {
        0: {
          0: {
            idx: "ActionComponent",
            label: "actionComponent",
            // colClass: "fixed",
            size: 10,
          },
        },
        1: {
          0: {
            idx: "TabComponent",
            label: "tabComponent",
            // colClass: "fixed",
            size: 10,
          },
        },
        2: {
          0: {
            idx: "DetailListComponent",
            label: "detailListComponent",
            // colClass: "h-screen",
            size: 100,
          },
          1: {
            idx: "BillToAddressDetailViewComponent",
            label: "billToAddressDetailViewComponent",
            // colClass: "bg-red-200 p-1 text-sm",
            size: 100,
          },
        },
        3: {
          0: {
            idx: "OrderLineListViewComponent",
            label: "orderLineListViewComponent",
            // colClass: "h-screen",
            size: 100,
          },
        },
        layoutConfig: {
          // layoutClass: "overflow-scroll",
          size: 95,
        },
      },
    },
  },
  layoutConfig: {},
};

routes.defaultAppConfig = {
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
            size: 10,
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
};

routes.search = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "ListComponent",
            label: "listComponent",
            size: 100,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.detail = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "DetailListComponent",
            label: "detailListComponent",
            size: 100,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.edit = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "EditComponent",
            label: "editComponent",
            size: 100,
          },
          1: {
            idx: "DefaultScreen",
            label: "defaultScreen",
            size: 200,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.editOrderLineDetail = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "EditOrderLineDetailComponent",
            label: "editOrderLineDetailComponent",
            size: 100,
          },
          1: {
            idx: "DefaultScreen",
            label: "defaultScreen",
            size: 200,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.editBillToAddressDetail = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "EditBillToAddressDetailComponent",
            label: "editBillToAddressDetailComponent",
            size: 100,
          },
          1: {
            idx: "DefaultScreen",
            label: "defaultScreen",
            size: 200,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.editOrderLineAddressDetail = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "EditOrderLineAddressDetailComponent",
            label: "editOrderLineAddressDetailComponent",
            size: 100,
          },
          1: {
            idx: "DefaultScreen",
            label: "defaultScreen",
            size: 200,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.delete = {
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
            size: 10,
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
};

routes.createOrder = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "JsonFormComponent",
            label: "bodyHeader",
            size: 100,
          },
          1: {
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            size: 200,
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
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

routes.createOrderline = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "JsonFormComponent",
            label: "bodyHeader",
            size: 100,
          },
          1: {
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            size: 200,
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
        3: {
          0: {
            idx: "CreateOrderlineListComponent",
            label: "createOrderlineListComponent",
            size: 100,
            passProps: {
              UItitle: "Add Orderline",
            },
          },
        },
        4: {
          0: {
            idx: "CreateOrderFooterComponent",
            label: "createOrderFooterComponent",
            size: 50,
            colClass: "mt-6",
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};
routes.createOrderlineAddress = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "JsonFormComponent",
            label: "bodyHeader",
            size: 100,
          },
          1: {
            idx: "CreateAddressFormComponent",
            label: "createAddressFormComponent",
            size: 200,
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
        3: {
          0: {
            idx: "CreateOrderlineListComponent",
            label: "createOrderlineListComponent",
            size: 100,
            passProps: {
              UItitle: "Add Orderline",
            },
          },
          1: {
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
            size: 50,
          },
        },
        4: {
          0: {
            idx: "CreateOrderFooterComponent",
            label: "createOrderFooterComponent",
            size: 50,
            colClass: "mt-6",
            // passProps: {
            //   UItitle: "Add Orderline",
            // },
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};

// TODO: Adjusted the height of the rows in jsonEditorScreen gap between headerBar and ActionComponent
routes.jsonEditorScreen = {
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
            size: 10,
          },
        },
        2: {
          0: {
            idx: "JsonFormComponent",
            label: "bodyHeader",
            size: 100,
          },
          1: {
            idx: "ScreenJsonEditor",
            label: "screenJsonEditor",
            size: 200,
          },
        },
        layoutConfig: {
          size: 95,
        },
      },
    },
  },
};
