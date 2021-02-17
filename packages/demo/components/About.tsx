import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";

export const About = ({
  appState,
  label,
  styles,
  children,
  setAppState,
  layoutConfig,
  setLayoutConfig,
  getEvents,
  getInitEvents,
  events,
}) => {
  useEffect(() => {
    getInitEvents(`${label}-$init`, setLayoutConfig, setAppState);
  }, []);

  return (
    <View>
      <Text>About *** {label}</Text>
      <Button
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
        testID={`${label}-btn-one`}
        title={`${"About"}Flash`}
      ></Button>
      <Text>{appState.$global.key}</Text>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
