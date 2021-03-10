/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { appConfig } from "../../configs/layouts/dashboardLayout";
import { routes } from "../../configs/routes/routesConfig";
// import { useSelector, useDispatch } from "react-redux";
// import { updateTabSelection } from "../../../../src/state-management/actions";

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
      const res = await fetch(
        `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
        {
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
              appState.global != undefined
                ? appState.global.tsdApp.activeModule != undefined
                  ? appState.global.tsdApp.activeModule.name
                  : "Service Orders"
                : "Service Orders",
            // tabName: "CreateOrders",
            actionName:
              appState.global != undefined
                ? appState.global.tsdApp.activeAction != undefined
                  ? appState.global.tsdApp.activeAction.name
                  : "Search"
                : "Search",
          }),
        }
      );
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
            style={{
              marginRight: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // console.log("Button with Tab item : ", item);
                // TODO : Should come from event management
                setAppState({
                  global: {
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
                      listComponent: {
                        data: {
                          response: [],
                        },
                      },
                    },
                  },
                });
                setLayoutConfig(appConfig);
                // dispatch(updateTabSelection(item.tabName, item.tabKey));
              }}
              // TODO : Title of button should come from API
              style={{
                backgroundColor:
                  appState.global != undefined
                    ? appState.global.tsdApp.activeTab.name === item.tabName
                      ? "#b2c560"
                      : ""
                    : item.tabName === item.tabName
                    ? "#b2c560"
                    : "",
                height: 40,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  marginLeft: 10,
                  marginRight: 10,
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
