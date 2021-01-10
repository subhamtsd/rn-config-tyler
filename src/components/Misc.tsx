import React from "react";
import { View, Button, Text } from "react-native";
import { Grid, Col } from "react-native-easy-grid";

export const Comp5 = ({ label, dispatch, appState, children }) => {
  console.log(appState);
  return (
    <View key={label}>
      <Text style={{ textAlign: "center" }}>{label}</Text>
      <Text>
        {appState && appState.payload && JSON.stringify(appState.payload)}
      </Text>
      <Grid>
        <Col>
          {children ||
            (appState && appState.children && appState.children[label])}
        </Col>
      </Grid>
    </View>
  );
};

export const ActionComp = ({ label, dispatch, appState, action, children }) => {
  // console.log(`appState `, appState);
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
            action(["1010101", "5555"], {
              ui: ["Comp5", "About"],
              children: [
                <Text>I am 1st Child</Text>,
                <Text>I am 2nd Child</Text>
              ]
            })
          );
        }}
      ></Button>
      {children || (appState && appState.children && appState.children[label])}
      {/* <Text>{appState && JSON.stringify(appState)}</Text> */}
    </View>
  );
};
