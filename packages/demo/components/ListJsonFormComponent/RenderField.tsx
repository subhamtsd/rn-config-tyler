/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Text, View } from "react-native";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";

export const RenderField = (props: {
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
  //   console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  return (
    <View style={componentGridStyle}>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
