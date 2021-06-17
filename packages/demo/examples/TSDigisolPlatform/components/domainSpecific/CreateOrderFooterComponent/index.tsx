/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { routes } from "../../../configs/routes/routesConfig";

export const CreateOrderFooterComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  _childDependeny: any;
}) => {
  const {
    appState,
    label,
    styles,
    children,
    setAppState,
    layoutConfig,
    setLayoutConfig,
    getEvents,
    _childDependeny,
  } = props;

  console.log(`label is ${label}`);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignSelf: "center",
          marginTop: -30,
        }}
      >
        {/* ******************** Add Rows Button ******************** */}
        <TouchableOpacity
          style={buttonStyle.buttonSubmit}
          // disabled={status}
          {...getEvents(
            `${label}-submit-btn`,
            setLayoutConfig,
            setAppState,
            appState
          )}
        >
          <Text style={buttonStyle.text1}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginTop: -30,
        }}
      >
        {/* ******************** COPY ROWS BUTTON ********************************* */}
        <TouchableOpacity
          style={buttonStyle.buttonCancel}
          // disabled={status}
          onPress={() => {
            console.log("Cancel Clicked");
            // copy the last row
          }}
        >
          <Text style={buttonStyle.text2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const buttonStyle = StyleSheet.create({
  buttonSubmit: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#0e73ca",
    height: 35,
    width: "140px",
    marginTop: 20,
    marginLeft: 150,
    marginBottom: 20,
    marginRight: 10,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    // borderColor: '#000',
    // borderWidth: 0.5,
    borderRadius: 2,
  },
  buttonCancel: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    height: 35,
    width: "140px",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    borderColor: "#000",
    borderWidth: 0.5,
  },
  text1: {
    color: "#fff",
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
  },
  text2: {
    color: "#545454",
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
  },
});
