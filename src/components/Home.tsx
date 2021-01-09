import React from "react";
import { Button, Text, View } from "react-native";

export const Home = ({
  appState,
  dispatch,
  action,
  label,
  styles,
  children
}) => (
  <View>
    <Text style={styles.header}>Home *** {label}</Text>
    <Button
      onPress={() => {
        //
        dispatch(
          action(["66666", "8888"], {
            ui: ["ActionComp", "Home"],
            props: [{ label: "66666->1" }, { label: "8888-2" }],
            children: [
              <Text>Hi from 66666 child</Text>,
              <Text>Hi from 8888 child</Text>
            ]
          })
        );
      }}
      title="Flash"
    ></Button>
    {children || (appState && appState.children && appState.children[label])}
  </View>
);
