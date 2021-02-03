import React from "react";
import { Button, Text, View } from "react-native";

export const Home = (props) => {
  const { label, children, setLayoutConfig, routes, appState } = props;
  return (
    <View>
      <Text style={{}}>Home *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT"
        onPress={() => {
          setLayoutConfig(routes?.routeTwo, true);
        }}
      ></Button>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
