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
  zIndex: any;
  flex: any;
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
    zIndex,
    flex
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
      backgroundColor: 'pink',
      marginLeft: -40,
      zIndex: zIndex,
      flex: flex
    },
    main: { paddingLeft: 3 },
  };

  return (
    <View style={{display:'flex',flexDirection:'row',zIndex: zIndex,flex:flex}}>
      <View style={{height: '100vh',width: 120,backgroundColor: '#5cabc5',zIndex:20}}> 
      <Button
        onPress={() => {
          setDrawerVisible(!drawerVisible);
          console.log('Hello World');
        }}
        title="Show NavBar"
        color="#818181"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
    {/* <View
      style={{
        height: "100vh",
        backgroundColor: 'purple'
      }}
    > */}
      {/* <Text style={{}}>Home *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button>
      <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <Drawer
      type="overlay"
      open={drawerVisible}
      openDrawerOffset={(viewport) => drawerVisible ? viewport.width-250:viewport.width-150 }
      closedDrawerOffset={500}
      content={
        <View
          style={{
            borderWidth: 1,
            zIndex: -1
          }}>
          <Button
            onPress={() => {
              setDrawerVisible(!drawerVisible);
              console.log('Hello World');
            }}
            title="Hide NavBar"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      }
      styles={drawerStyles}
      tweenHandler={Drawer.tweenPresets.parallax}>

    </Drawer>
      {children || (appState && appState[label] && appState[label]?.children)}
    {/* </View> */}
    </View>
  );
  // const drawerStyles = {
  //   drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3,zIndex:-1 },
  //   main: { paddingLeft: 0},
  // };
};
