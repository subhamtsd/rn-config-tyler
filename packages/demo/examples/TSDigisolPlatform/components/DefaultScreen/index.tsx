import React from "react";
import { Button, Text, View } from "react-native";
import { routes } from "../../configs/routes/routesConfig";

export const DefaultScreen = (props: {
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
  console.log(getEvents(`${label}-btn-one`, setLayoutConfig));

  return (
    <View>
      {/* <Text style={{}}>Default Screen *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="HELLO DEMO"
        {...getEvents(
          `${label}-btn-one`,
          setLayoutConfig,
          setAppState,
          appState
        )}
        // onPress={() => {
        //   // setLayoutConfig(routes["edit"], "copy");
        //   console.log("Hello World from Default Component");
        // }}
      ></Button> */}
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
