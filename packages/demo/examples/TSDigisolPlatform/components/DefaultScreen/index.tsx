import React from "react";
import { Button, Text, View } from "react-native";
import { events } from "../../configs/events/eventConfig";
import { routes } from "../../configs/routes/routesConfig";
import { ScreenJsonEditor } from "../ScreenJsonEditor";
import { componentGridStyle } from "../../styles/common";
import { ScrollView } from "react-native";

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
      {/* <ScrollView style={{borderWidth: 2}}>
      <ScreenJsonEditor
        appState={appState}
        label={label}
        styles={styles}
        children={children}
        setAppState={setAppState}
        layoutConfig={layoutConfig}
        setLayoutConfig={setLayoutConfig}
        events={events}
        getEvents={getEvents}
      /> */}
      {/* </ScrollView> */}
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
