import React from "react";
import { Button, Text, View } from "react-native";

export const ActionComp = ({
  label,
  children,
  setLayoutConfig,
  routes,
  appState,
  setAppState,
}) => {
  console.log(appState.global?.total);
  
  return (
    <View
      style={
        {
          /* borderWidth: 4, height: "20%" */
        }
      }
    >
      <Button
        title={"Back"}
        onPress={() => {
          setLayoutConfig(routes?.routeOne, true);
        }}
      ></Button>
      <Button title={`${appState?.global?.total} Trigger`}></Button>
      <Text style={{ textAlign: "center" }}>{label}</Text>

      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
