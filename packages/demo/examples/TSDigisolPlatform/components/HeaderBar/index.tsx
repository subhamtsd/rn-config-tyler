/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { getInitEvents } from "../../configs/events/eventConfig";
// import { useSelector, useDispatch } from "react-redux";

export const HeaderBar = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
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

  // useEffect(() => {
  //   getInitEvents(`${label}-$init`, setLayoutConfig, setAppState);
  // }, []);

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));

  // const state = useSelector((s: any) => s);

  // console.log("State in header bar : : : : ", state);

  // setAppState({
  //   global: {
  //     tsdApp: {
  //       activeModule: {
  //         name: "",
  //         key: "",
  //       },
  //       activeTab: {
  //         name: "",
  //         key: "",
  //       },
  //       activeAction: {
  //         name: "",
  //         key: "",
  //       },
  //     },
  //   },
  // });

  return (
    <View
      testID={`${label}-$init`}
      {...getEvents(`${label}-$init`, setLayoutConfig, setAppState)}
      style={HeaderStyles.container}
    >
      {/* <Text style={{}}>HeaderBar *** {label}</Text> */}
      {/* <Text>
        <h1>DEMO FOR TODO APP</h1>
      </Text> */}
      {/* <Button
        testID={`${label}-btn-one`}
        title="TODO APP DEMO"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      <Row>
        <Col>
          <View style={HeaderStyles.logoViewStyle}>
            <Text style={HeaderStyles.logoTextStyle}>TSD LOGO</Text>
          </View>
        </Col>
        <Col>
          <View style={HeaderStyles.userNameViewStyle}>
            <Text style={HeaderStyles.userNameTextStyle}>Customer Name</Text>
          </View>
        </Col>
        <Col>
          <View style={HeaderStyles.logoutViewStyle}>
            {/* <Text style={HeaderStyles.logoutTextStyle}>Logout</Text> */}
            <Button
              testID={`${label}-btn-one`}
              title="Update Default State"
              onPress={() => {
                setAppState({
                  global: {
                    tsdApp: {
                      activeBuisnessFunction: {
                        name: "Foundation",
                        key: "1000",
                      },
                      activeModule: {
                        name: "Catalog",
                        key: "2001",
                      },
                      activeTab: {
                        name: "Organisation",
                        key: "118201",
                      },
                      activeAction: {
                        name: "Search",
                        key: "124684",
                        endPoint: "v1/organization/list",
                        httpMethod: "POST",
                        showButton: true,
                      },
                    },
                  },
                });
              }}
              {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
            ></Button>
          </View>
        </Col>
      </Row>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#eab358",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  logoViewStyle: {
    margin: 1,
  },
  logoTextStyle: {
    marginLeft: 150,
    marginRight: 100,
    marginTop: 10,
    marginBottom: 26,
  },
  userNameViewStyle: {
    // borderWidth: 1,
    margin: 1,
  },
  userNameTextStyle: {
    marginLeft: 150,
    marginRight: 100,
    marginTop: 10,
    marginBottom: 26,
  },
  logoutViewStyle: {
    // borderWidth: 1,
    margin: 1,
  },
  logoutTextStyle: {
    marginLeft: 150,
    marginRight: 100,
    marginTop: 10,
    marginBottom: 26,
  },
});
