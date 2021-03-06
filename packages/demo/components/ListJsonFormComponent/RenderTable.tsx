/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Text, View, ScrollView, TextInput } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";
import { useState } from "react";

const RenderHeaderColumn = (colSize, fieldTitle) => {
  return (
    <Col
      size={7}
      style={{
        borderBottomWidth: 3,
        width: 120,
        padding: 5,
        alignContent: "center",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        {fieldTitle}
      </Text>
    </Col>
  );
};

export const RenderTable = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  noOfColumns: any;
  dataToRender: any;
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
    noOfColumns,
    dataToRender,
  } = props;

  const tableHeaderObj =
    dataToRender.orderLines.properties.orderLine.items.properties;
  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "element",
    uid: "action",
    pattern: "[]",
  };

  const requiredField =
    dataToRender.orderLines.properties.orderLine.items.required;

  const [isTitleRendered, setisTitleRendered] = useState(false);

  console.log(`label is ${label}`);
  //   console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  const [isFocused, setisFocused] = useState(false);

  return (
    <View style={componentGridStyle}>
      <Row>
        <Col
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Button
            title={`Add Row`}
            onPress={() => {
              console.log("Add Row Clicked");
            }}
          ></Button>
        </Col>
        <Col
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Button
            title={`Copy Row`}
            onPress={() => {
              console.log("Add Row Clicked");
            }}
          ></Button>
        </Col>
      </Row>
      <ScrollView
        style={{
          borderWidth: 0,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Grid>
          <Row>
            {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
              return (
                <Row
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "grey",
                    width: 140,
                    padding: 5,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Col
                    size={7.1}
                    style={
                      {
                        //   borderWidth: 3,
                        //   borderRightWidth: 2,
                        //   width: 220,
                        //   // padding: 5,
                        //   marginTop: 5,
                        //   alignContent: "center",
                        //   alignSelf: "center",
                      }
                    }
                  >
                    <Text
                      style={{
                        alignContent: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      {tableHeaderObj[keyName].title}
                    </Text>
                  </Col>
                </Row>
              );
            })}
          </Row>
          <Row>
            {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
              console.log("keyName : : : ", keyName);
              //   console.log("tableHeaderObj Data", tableHeaderObj[keyIndex]);
              //   console.log("keyIndex : : : ", keyIndex);
              //  a ? b ? c
              const schema = {
                type: "object",
                required: requiredField,
                properties: {
                  // TODO : Here keyName should be replaced by value of variable keyName
                  //   TODO : The label of each field needed to be hidden
                  [keyName]: tableHeaderObj[keyName],
                },
              };

              console.log("Schema : : : ", schema);

              if (schema?.properties?.[keyName]?.type === "element") {
                return (
                  <Col
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        width: `60%`,
                        alignContent: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        title={`Delete`}
                        color={"red"}
                        onPress={() => {
                          console.log("Deleted");
                        }}
                      ></Button>
                    </View>
                  </Col>
                );
              }

              return (
                <Row
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "grey",
                    width: 140,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Col>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        width: `100%`,
                        height: 30,
                        borderColor: "grey",
                        marginTop: 5,
                        padding: 17,
                      }}
                      onFocus={() => {
                        {
                          setisFocused(true);
                        }
                      }}
                      onBlur={() => {
                        console.log();
                      }}
                    ></TextInput>
                  </Col>
                </Row>
              );
            })}
          </Row>
          {/* TODO : This iteration should be done with the help of loop */}
          <Row>
            {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
              console.log("keyName : : : ", keyName);
              //   console.log("tableHeaderObj Data", tableHeaderObj[keyIndex]);
              //   console.log("keyIndex : : : ", keyIndex);
              //  a ? b ? c
              const schema = {
                type: "object",
                required: requiredField,
                properties: {
                  // TODO : Here keyName should be replaced by value of variable keyName
                  //   TODO : The label of each field needed to be hidden
                  [keyName]: tableHeaderObj[keyName],
                },
              };

              console.log("Schema : : : ", schema);

              if (schema?.properties?.[keyName]?.type === "element") {
                return (
                  <Col
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "grey",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        width: `60%`,
                        alignContent: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        title={`Delete`}
                        color={"red"}
                        onPress={() => {
                          console.log("Deleted");
                        }}
                      ></Button>
                    </View>
                  </Col>
                );
              }

              return (
                <Row
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "grey",
                    width: 140,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Col>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        width: `100%`,
                        height: 30,
                        borderColor: "grey",
                        marginTop: 5,
                        padding: 17,
                      }}
                      onFocus={() => {
                        {
                          setisFocused(true);
                        }
                      }}
                      onBlur={() => {
                        console.log();
                      }}
                    ></TextInput>
                  </Col>
                </Row>
              );
            })}
          </Row>
        </Grid>
      </ScrollView>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
