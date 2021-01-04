import React from "react";
import { View, Button, Text } from "react-native";

export const Comp5 = ({ label, dispatch, appState }) => (
  <View key={label}>
    <Text style={{ textAlign: "center" }}>{label}</Text>
    <Text>
      {appState && appState.payload && JSON.stringify(appState.payload)}
    </Text>
  </View>
);

export const ActionComp = ({ label, dispatch, appState, action }) => {
  console.log(`appState `, appState);
  return (
    <View
      style={
        {
          /* borderWidth: 4, height: "20%" */
        }
      }
    >
      <Text style={{ textAlign: "center" }}>{label}</Text>
      <Button
        title={"Trigger"}
        onPress={() => {
          console.log("sample event triggerred");
          dispatch(
            action("1010101", { sample_key: "sample_val", ui: "ActionComp" })
          );
        }}
      ></Button>
      <Text>{appState && JSON.stringify(appState)}</Text>
    </View>
  );
};
