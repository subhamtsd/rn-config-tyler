import React from "react";
import { Button, Text, View } from "react-native";

export const Home = (props) => {
  console.log(props);

  const { appState, dispatch, action, label, styles, children } = props;
  return (
    <View>
      <Text style={{}}>Home *** {label}</Text>
      <Button
        testID={`${label}-btnFlash`}
        onPress={() => {
          //
          dispatch(
            action(["comp5.1", "comp51.2"], {
              ui: ["RandomPic", "Home"],
              props: [
                { label: "comp5.1", style: { height: 400, width: 200 } },
                { label: "comp51.2" }
              ],
              children: [
                <Text>Hi triggerred from "home" child</Text>,
                <Text>Hi triggerred from "home" child</Text>
              ]
            })
          );
        }}
        title="Flash"
      ></Button>
      {children || (appState && appState.children && appState.children[label])}
    </View>
  );
};
