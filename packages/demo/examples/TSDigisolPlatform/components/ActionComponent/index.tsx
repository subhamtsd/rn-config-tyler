/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { routes } from "../../configs/routes/routesConfig";

export const ActionComponent = (props: {
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

  const fetchData = async (action: string) => {
    const res = await fetch(`${SERVER_ENDPOINT}v1/schema/modulelayout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "TsdAdmin",
        roleKey: 1,
        moduleName:
          appState?.$global?.tsdApp != undefined
            ? appState.$global.tsdApp.activeModule.name
            : "Service Orders",
        tabName:
          appState?.$global?.tsdApp != undefined
            ? appState.$global.tsdApp.activeTab.name
            : "CreateOrders",
        actionName: action,
      }),
    });
    const resJSON = await res.json();

    setAppState(
      {
        $global: {
          tsdApp: {
            activeAction: {
              name: resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                .actionName,
              key: resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                .actionKey,
              endPoint:
                resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                  .endPoint,
              httpMethod:
                resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                  .httpMethod,
              showButton:
                resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                  .showButton,
            },
            createComponent: null,
            listComponent: null,
            searchComponent: null,
            viewComponent: null,
            formData: null,
          },
        },
      },
      "isPartial"
    );

    console.log(
      "ACTION COMPONENTS APPSTATE ::::: ---> ",
      appState.$global.tsdApp,
      "------",
      action
    );

    if (action === "Create") {
      // TODO : Remove hardcoding for Screen in UI module jsonEditorScreen from route
      if (
        appState.$global.tsdApp.activeModule.key === 2008 &&
        appState.$global.tsdApp.activeTab.key === 3012
      ) {
        setLayoutConfig(routes["jsonEditorScreen"], "copy");
      } else {
        setLayoutConfig(routes["defaultAppConfig"], "copy");
      }
    } else {
      setLayoutConfig(routes["defaultAppConfig"], "copy");
    }
  };

  // console.log("appState in action : : : : ", props);

  return (
    <View style={{ flex: 1, margin: 7 }}>
      <Grid>
        <Row>
          <Col
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                fetchData("Create");
              }}
              style={{
                width: "25vh",
                // flex: 1,
                backgroundColor:
                  appState?.$global?.tsdApp != undefined
                    ? appState.$global.tsdApp.activeAction != undefined
                      ? appState.$global.tsdApp.activeAction.name === "Create"
                        ? "#b2c560"
                        : "#5cabc5"
                      : "#5cabc5"
                    : "Create" === "Create"
                    ? "#5cabc5"
                    : "#5cabc5",
                height: "5vh",
                // paddingTop: 5,
                justifyContent: "center",
                alignItems: "center",
                // paddingBottom: 5,
                // paddingLeft: 50,
                // paddingRight: 30,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 10,
                  // marginRight: 10,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Create
              </Text>
            </TouchableOpacity>
          </Col>
          <Col
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                fetchData("Search");
              }}
              style={{
                backgroundColor:
                  appState?.$global?.tsdApp != undefined
                    ? appState.$global.tsdApp.activeAction != undefined
                      ? appState.$global.tsdApp.activeAction.name === "Search"
                        ? "#b2c560"
                        : "#5cabc5"
                      : "#5cabc5"
                    : "Search" === "Search"
                    ? "#5cabc5"
                    : "#5cabc5",
                height: "5vh",
                width: "25vh",
                // flex: 1,
                // paddingTop: 5,
                // paddingBottom: 5,
                // paddingLeft: 50,
                // paddingRight: 30,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 10,
                  // marginRight: 10,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
