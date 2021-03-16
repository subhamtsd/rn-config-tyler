/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
// import { useSelector, useDispatch } from "react-redux";
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
          moduleName:
            appState.global != undefined
              ? appState.global.tsdApp.activeModule.name
              : "Service Orders",
          tabName:
            appState.global != undefined
              ? appState.global.tsdApp.activeTab.name
              : "CreateOrders",
          actionName: action,
        }),
      }
    );
    const resJSON = await res.json();

    setAppState({
      global: {
        tsdApp: {
          activeAction: {
            name:
              resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
                .actionName,
            key:
              resJSON.businessFunctions[0].modules[0].tabs[0].actions[0]
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
        },
      },
    });
  };

  // console.log("appState in action : : : : ", props);

  return (
    <View>
      <Grid>
        <Row>
          <Col
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 180,
              marginRight: 180,
              // borderWidth: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                fetchData("Create");
              }}
              style={{
                width: "100%",
                backgroundColor:
                  appState.global != undefined
                    ? appState.global.tsdApp.activeAction != undefined
                      ? appState.global.tsdApp.activeAction.name === "Create"
                        ? "#b2c560"
                        : "#5cabc5"
                      : "#5cabc5"
                    : "Create" === "Create"
                    ? "#5cabc5"
                    : "#5cabc5",
                height: 35,
                paddingTop: 7,
                justifyContent: "center",
                alignContent: "center",
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 30,
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
                  marginLeft: 10,
                  marginRight: 10,
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
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 180,
              marginRight: 180,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                fetchData("Search");
              }}
              style={{
                backgroundColor:
                  appState.global != undefined
                    ? appState.global.tsdApp.activeAction != undefined
                      ? appState.global.tsdApp.activeAction.name === "Search"
                        ? "#b2c560"
                        : "#5cabc5"
                      : "#5cabc5"
                    : "Search" === "Search"
                    ? "#5cabc5"
                    : "#5cabc5",
                height: 35,
                paddingTop: 7,
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 30,
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
                  marginLeft: 10,
                  marginRight: 10,
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
