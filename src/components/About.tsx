import React from "react";
import { Button, Text, View } from "react-native";

export const About = ({
  appState,
  label,
  children,
  setLayoutConfig,
  routes,
}) => {
  return (
    <View>
      <Text>About *** {label}</Text>
      <Button title={`${"About"}Flash`}></Button>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
