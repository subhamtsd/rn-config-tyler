import React from "react";
import { Button, Text, View } from "react-native";

export const About = ({
  appState,
  dispatch,
  action,
  label,
  styles,
  children
}) => {
  // console.log(children);

  return (
    <View>
      <Text>About *** {label}</Text>
      <Button
        onPress={() => {
          //
          dispatch(
            action(["7777", "202020"], {
              ui: ["RandomPic", "Home"],
              children,
              props: [{ label: "7777->1" }, { label: "5555-2" }]
            })
          );
        }}
        title="Flash"
      ></Button>
      {children || (appState && appState.children && appState.children[label])}
    </View>
  );
};
