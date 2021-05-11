/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Drawer from "react-native-drawer";
import { Col, Row } from "react-native-easy-grid";

export const ToggleNavigation = (props: {
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

  console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  const [drawerVisible, setDrawerVisible] = useState(false);
  console.log("drawer ::: ", drawerVisible);

  const drawerStyles = {
    drawer: {
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 3,
      marginLeft: -40,
    },
    main: { paddingLeft: 3 },
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      {/* <Text style={{}}>Home *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button>
      <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <Drawer
        type="overlay"
        // ref={(ref) => (this._drawer = ref)}
        open={drawerVisible}
        openDrawerOffset={(viewport) => viewport.width - 200}
        // closeDrawerOffset={-100}
        content={
          <View
            style={{
              borderWidth: 2,
              backgroundColor: "red",
              height: "100%",
              borderColor: "blue",
            }}
          >
            <Button
              onPress={() => {
                // this._drawer.close();
                setDrawerVisible(false);
                console.log("Hello World");
              }}
              title="Hide NavBar"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Text
              style={{
                marginLeft: 50,
              }}
            >
              Hello World
            </Text>
          </View>
        }
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#ecf0f1",
            padding: 8,
            borderWidth: 1,
            width: 100,
          }}
        >
          <View
            style={{
              width: "100%",
              alignContent: "center",
            }}
          >
            <Button
              onPress={() => {
                setDrawerVisible(true);
              }}
              title="ShoW"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </Drawer>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
