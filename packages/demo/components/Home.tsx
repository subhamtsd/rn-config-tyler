import React from "react";
import { Button, Text, View } from "react-native";

export const Home = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  colClass: string;
}) => {
  const {
    appState,
    label,
    style,
    children,
    setAppState,
    layoutConfig,
    setLayoutConfig,
    getEvents,
    colClass,
  } = props;

  console.log(colClass);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  // console.log(appState);

  return (
    <View style={style}>
      <Text style={{}}>Home *** {label}</Text>
      <Button
        style={style}
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button>
      <Text style={style}> AA {appState?.$appState?.loginValues}</Text>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
