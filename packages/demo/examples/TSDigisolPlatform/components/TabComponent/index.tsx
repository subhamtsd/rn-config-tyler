/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { routes } from "../../configs/routes/routesConfig";
// import { useSelector, useDispatch } from "react-redux";
// import { updateTabSelection } from "../../../../src/state-management/actions";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";

export const TabComponent = (props: {
  appState;
  label;
  styles;
  children;
  setAppState;
  layoutConfig;
  setLayoutConfig;
  getEvents;
  events;
}) => {
  const {
    appState,
    label,
    styles,
    children,
    setAppState,
    layoutConfig,
    setLayoutConfig,
    getEvents,
  } = props;

  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${SERVER_ENDPOINT}v1/schema/modulelayout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "TsdAdmin",
          roleKey: 1,
          // TODO : Conditional for default state undefined
          moduleName:
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeModule != undefined
                ? appState.$global.tsdApp.activeModule.name
                : "ServiceOrders"
              : "ServiceOrders",
          // tabName:
          //   appState.global != undefined
          //     ? appState.global.tsdApp.activeTab != undefined
          //       ? appState.global.tsdApp.activeTab.name
          //       : "CreateOrders"
          //     : "CreateOrders",
          actionName:
            appState?.$global?.tsdApp != undefined
              ? appState.$global.tsdApp.activeAction != undefined
                ? appState.$global.tsdApp.activeAction.name
                : "Search"
              : "Search",
        }),
      });
      const resJSON = await res.json();
      // console.log("active module : : : :", state.activeModuleSelection);
      // console.log(
      //   "Buisness Functions with Tabs",
      //   resJSON.businessFunctions[0].modules[0].tabs
      // );
      setdata(resJSON.businessFunctions[0].modules[0].tabs);
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: `#5cabc5`,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        flex: 1,
        // alignItems: "center",
      }}
    >
      {/* <Text style={{}}>Home *** {label}</Text> */}
      {/* <Button
        testID={`${label}-btn-one`}
        title="ACT"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item: any, key) => (
          <View
            style={
              {
                // margin: 5,
              }
            }
          >
            <TouchableOpacity
              onPress={() => {
                // console.log("Button with Tab item : ", item);
                // TODO : Should come from event management
                setAppState(
                  {
                    $global: {
                      tsdApp: {
                        activeTab: {
                          name: item.tabName,
                          key: item.tabKey,
                        },
                        activeAction: {
                          name: item.actions[0].actionName,
                          key: item.actions[0].actionKey,
                          endPoint: item.actions[0].endPoint,
                          httpMethod: item.actions[0].httpMethod,
                          showButton: item.actions[0].showButton,
                        },
                        createComponent: null,
                        listComponent: {
                          data: {
                            response: [],
                          },
                        },
                        formData: null,
                      },
                    },
                  },
                  "isPartial"
                );
                if (appState.$global.tsdApp.activeAction.name == "Create") {
                  if (item.tabKey == 3012) {
                    setLayoutConfig(routes["jsonEditorScreen"], "copy");
                  } else {
                    setLayoutConfig(routes["defaultAppConfig"], "copy");
                  }
                } else {
                  setLayoutConfig(routes["defaultAppConfig"], "copy");
                }
                // dispatch(updateTabSelection(item.tabName, item.tabKey));
              }}
              // TODO : Title of button should come from API
              style={{
                backgroundColor:
                  appState?.$global?.tsdApp != undefined
                    ? appState.$global.tsdApp.activeTab.name === item.tabName
                      ? "#b2c560"
                      : ""
                    : item.tabName === item.tabName
                    ? "#b2c560"
                    : "",
                width: "25vh",
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  color: "white",
                  //   fontWeight: "bold",
                }}
              >
                {`${item.tabDisplayName}`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const abc = {
  CreateorderLines: {
    type: "array",
    required: [
      "bookDate",
      "addressInfoKey",
      "orderedQty",
      "unitPrice",
      "slotCode",
      "skuCode",
      "organizationCode",
    ],
    properties: {
      bookDate: {
        title: "Booking Date",
        type: "string",
        format: "date",
        uid: "bookDate",
        pattern: "[a-zA-Z0-9]",
        apiUri: "v1/calender/list",
        apiMethod: "POST",
        dependency: ["skuCode"],
        nextDepended: [
          {
            fieldName: "slotCode",
            fieldStyle: {
              borderColor: "blue",
            },
          },
        ],
      },
      addressInfoKey: {
        title: "Address Key",
        type: "string",
        format: "",
        uid: "addressInfoKey",
        pattern: "[0-9]",
        dependency: [],
        nextDepended: [],
      },
      orderedQty: {
        title: "orderedQty",
        type: "string",
        format: "",
        uid: "orderedQty",
        pattern: "[0-9]",
        dependency: [],
        nextDepended: [],
      },
      unitPrice: {
        title: "Unit Price",
        type: "string",
        format: "readOnly",
        uid: "unitPrice",
        pattern: "^[0-9]+(.[0-9]{1,2})?$",
        apiUri: "v1/price/466474",
        apiMethod: "GET",
        dependency: ["skuCode"],
        nextDepended: [],
      },
      slotCode: {
        title: "Slot Code",
        type: "string",
        format: "",
        uid: "slotCode",
        dropdownLoadApiURL: "v1/slotcode/list",
        dropdownLoadApiMethod: "POST",
        pattern: "[a-zA-Z0-9]",
        dependency: ["skuCode", "bookingDate"],
        nextDepended: [
          {
            fieldName: "organizationCode",
            fieldStyle: {
              borderColor: "blue",
            },
          },
        ],
      },
      skuCode: {
        title: "Sku Code",
        type: "string",
        format: "",
        displayType: "dropdown",
        dropdownLoadApiURL: "v1/sku/list",
        dropdownLoadApiMethod: "POST",
        uid: "skuCode",
        pattern: "[a-zA-Z0-9]",
        dependency: [],
        nextDepended: [
          {
            fieldName: "bookDate",
            fieldStyle: {
              borderColor: "blue",
            },
          },
          {
            fieldName: "unitPrice",
            fieldStyle: {
              borderColor: "blue",
            },
          },
        ],
      },
      organizationCode: {
        title: "Ship Node",
        type: "string",
        format: "",
        displayType: "dropdown",
        dropdownLoadApiURL: "v1/organization/allnodelist",
        dropdownLoadApiMethod: "POST",
        uid: "organizationCode",
        pattern: "[a-zA-Z0-9]",
        dependency: ["skuCode", "bookDate", "slotCode"],
        nextDepended: [
          {
            fieldName: "inStock",
            fieldStyle: {
              borderColor: "blue",
            },
          },
        ],
      },
      inStock: {
        title: "In Stock",
        type: "string",
        format: "readOnly",
        apiUri: "v1/inStock/466474",
        apiMethod: "GET",
        dependency: ["skuCode", "bookDate", "slotCode", "organizationCode"],
        nextDepended: [
          {
            fieldName: "orderedQty",
            fieldStyle: {
              borderColor: "blue",
            },
          },
        ],
      },
    },
    uischema: {
      bookDate: {
        "ui:title": "Booking Date",
        "ui:widget": "date",
      },
      skuCode: {
        "ui:title": "Sku Code",
        "ui:widget": "select",
        "ui:placeholder": "Please select your Sku Code",
      },
      organizationCode: {
        "ui:title": "Ship Node",
        "ui:widget": "select",
        "ui:placeholder": "Please select your Ship Node",
      },
    },
  },
};
