import React from "react";
import { Button, Text, View } from "react-native";

export const Home = (props) => {
  const {
    label,
    children,
    setLayoutConfig,
    setAppState,
    routes,
    appState,
  } = props;
  let i = appState.global?.total || 12;
  return (
    <View>
      <Text style={{}}>Home *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT"
        onPress={() => {
          setAppState({ global: { total: i += 1 } });
          setLayoutConfig(routes?.routeTwo, true);
        }}
      ></Button>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
