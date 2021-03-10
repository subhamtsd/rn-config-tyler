/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  CheckBox,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";
import { useState } from "react";

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

  const [arrObj, setArrObj] = useState([]);

  const tableHeaderObj =
    dataToRender.orderLines.properties.orderLine.items.properties;

  // console.log(
  //   "Properties : : :: ",
  //   dataToRender.orderLines.properties.orderLine.items.properties
  // );
  // tableHeaderObj["checkbox"] = {
  //   title: " ",
  //   type: "checkbox",
  //   uid: "action",
  //   pattern: "[]",
  // };
  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };

  const requiredField =
    dataToRender.orderLines.properties.orderLine.items.required;

  const keyIdPrefix = () => {
    const keyArray = Object.getOwnPropertyNames(
      dataToRender.orderLines.properties
    );
    return keyArray[0];
  };

  const keyId = keyIdPrefix();

  console.log("KeyIdPrefix, ", keyIdPrefix());

  // console.log(`label is ${label}`);
  //   console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  // console.log(props.appState);

  const intialJson = {};
  const [item, setItem] = useState(intialJson); // Submit one row
  const [finalItem, setFinalItem] = useState(intialJson);
  const [listOfItems, setListItems] = useState([]); // Store all array of row data
  const [isSelected, setSelection] = useState(false);
  const [noOfRows, setNoOfRows] = useState(-1);
  const [noOfAddItemClick, setnoOfAddItemClick] = useState(-1);

  console.log("items : ::: ", item);
  console.log("finalItem : : : ", finalItem);
  console.log("listOfItem : : :: ", listOfItems);
  console.log("noOfRows : : : ", noOfRows);

  useEffect(() => {
    if (finalItem !== intialJson) {
      // If clicked on same row to add and finalItem is not equal to item
      if (finalItem[keyIdPrefix()] === noOfAddItemClick || finalItem !== item) {
        setListItems(() => [...listOfItems, finalItem]);
      }
    }
  }, [finalItem]);

  const rowSection = arrObj.map(() => {
    return (
      <Row>
        {/* <Col>
          <Text>Checkbox</Text>
        </Col> */}
        {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
          const schema = {
            type: "object",
            required: requiredField,
            properties: {
              // TODO : Here keyName should be replaced by value of variable keyName
              //   TODO : The label of each field needed to be hidden
              [keyName]: tableHeaderObj[keyName],
            },
          };
          // TODO : schema element with Action button
          if (schema?.properties?.[keyName]?.type === "button") {
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
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        marginRight: 3,
                      }}
                    >
                      <Button
                        title={`Add`}
                        color={"green"}
                        disabled={false}
                        onPress={() => {
                          console.log("Add Item");
                          // Submit the current row
                          // setItem --> push item into listOfItem
                          // IF data changed in row pushed --> push item into listOfItem
                          // If data not changed in the row --> Donot push into listOfItem
                          // TODO : BUG on double click it add same item every time
                          // TODO : wRITE A CALL BACK
                          setnoOfAddItemClick(noOfAddItemClick + 1);
                          item[keyIdPrefix()] = noOfRows;
                          // console.log("finalItem : : : ", finalItem);
                          console.log("Item : : : : ", item);
                          if (finalItem == {} || finalItem !== item) {
                            setFinalItem(item);
                          }
                        }}
                      ></Button>
                    </View>
                    <View
                      style={{
                        marginRight: 3,
                      }}
                    >
                      <Button
                        title={`Del`}
                        color={"red"}
                        onPress={() => {
                          console.log(
                            "item[keyIdPrefix()] : :: Delete : : :: ",
                            item[keyIdPrefix()]
                          );
                          console.log("array : : :: ", arrObj);
                          // Delete the item with the index passed from ListOfItems
                        }}
                      ></Button>
                    </View>
                  </View>
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
                  onChangeText={(text) => {
                    setItem({
                      ...item,
                      [keyName]: text,
                    });
                    // setFinalItem({
                    //   ...item,
                    //   [keyName]: text,
                    // });
                  }}
                ></TextInput>
              </Col>
            </Row>
          );
        })}
      </Row>
    );
  });

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
              // create new row
              // setNoOfRows(noOfRows + 1);
              setArrObj([...arrObj, noOfRows + 1]);
              setNoOfRows(noOfRows + 1);
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
              console.log("Copy Row Clicked");
              // copy the last row
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
          {/* TABLE HEADER DATA */}
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
          {/* TABLE DATA ROW */}
          {rowSection}
          {/* TODO : This iteration should be done with the help of loop */}
        </Grid>
      </ScrollView>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
