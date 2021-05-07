/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import uuid from "react-native-uuid";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  CheckBox,
  // Picker,
} from "react-native";

// import { CheckBox } from "react-native-elements";

import { cloneDeep } from "lodash";

import { Picker } from "@react-native-picker/picker";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../../styles/common";
import { useState } from "react";
import { routes } from "../../../configs/routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { prepareSchema } from "../../../helper/helper";

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
  maxNoOfRows: any;
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
    maxNoOfRows,
  } = props;

  const [arrObj, setArrObj] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [saveButtonStatus, setSaveButtonStatus] = useState(false);
  const [addRowButtonStatus, setAddRowButtonStatus] = useState(false);

  //   console.log("hii from createorderlinelist");
  const firstParent = Object.getOwnPropertyNames(dataToRender)[0];

  const tableHeaderObj = dataToRender[firstParent].properties;

  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };
  const requiredField = dataToRender[firstParent].required;

  const valueChangeHandler = (value, keyname, key) => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          obj.item[keyname] = value;
        }
      });
      return newArrObj;
    });
  };

  const addRowHandler = () => {
    setAddRowButtonStatus(true);
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      const newObj = {
        key: uuid.v4(),
        item: {},
        isChecked: false,
        addStatus: false,
      };
      console.log(newObj);
      newArrObj.push(newObj);
      return newArrObj;
    });
  };

  const checkboxChangeHanlder = (value) => {
    setIsAllChecked(value);
  };

  useEffect(() => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        obj.isChecked = isAllChecked;
      });
      return newArrObj;
    });
  }, [isAllChecked]);

  const singleCheckboxHandler = (key, value) => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          // console.log("obj ischecked ", obj.isChecked);
          obj.isChecked = value;
        }
      });
      return newArrObj;
    });
  };

  const addActionHandler = (key) => {
    setAddRowButtonStatus(false);
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          obj.addStatus = true;
        }
      });
      return newArrObj;
    });
  };

  const deleteActionHandler = (key) => {
    setArrObj((oldArrObj) => {
      const tempArrObj = cloneDeep(oldArrObj);
      const newArrObj = tempArrObj.filter((obj) => obj.key !== key);
      return newArrObj;
    });
    setAddRowButtonStatus(false);
  };

  if (!addRowButtonStatus) {
    const arr = arrObj.filter((obj) => obj.addStatus === false);
    if (arr.length > 0) {
      setAddRowButtonStatus(true);
    }
  }
  //   const keyIdPrefix = () => {
  //     const keyArray = Object.getOwnPropertyNames(
  //       dataToRender[firstParent].properties
  //     );
  //     return keyArray[0];
  //   };

  // console.log(tableHeaderObj);

  //   console.log("finalItem : : : ", finalItem);

  //   const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
  //     const res1 = fetch(`${SERVER_ENDPOINT}${endPoint}`, {
  //       method: httpMethod,
  //       // method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     })
  //       .then((res) => res.json())
  //       .then((_data) => {
  //         setAppState({
  //           global: {
  //             tsdApp: {
  //               createComponent: {
  //                 [appState.global.tsdApp.activeTab.name]: _data,
  //                 formData: body,
  //               },
  //               viewComponent: {
  //                 [appState.global.tsdApp.activeTab.name]: _data,
  //               },
  //             },
  //           },
  //         });
  //         console.log("DATA UPDATED .......");
  //         setLayoutConfig(routeToRedirect, "copy");
  //       });
  //   };

  console.log("orderlist array", arrObj);

  const rowSection = arrObj.map((obj) => {
    // console.log("arrKey : : : ", arrKey);

    return (
      <Row>
        <Text
          style={{
            // flex: 1,
            padding: 8,
            paddingBottom: 0,
            paddingTop: 14,
            // borderWidth: 2,
          }}
        >
          {
            <CheckBox
              color="#0e73ca"
              value={obj.isChecked}
              onValueChange={(value) => {
                console.log(value);
                singleCheckboxHandler(obj.key, value);
              }}
              //arrow func ,toggle the value of isSelected ,iterate to checked array and make every value equals to isSelected
              // onValueChange={selectAll}
              // checked={isSelected}
              // onValueChange={() => {
              //   isSelected = !isSelected;
              //   // console.log(checked)
              //   for (const i in checked) {
              //     setSelection({});
              //   }
              //   console.log(checked);
              // }}
            />
          }
        </Text>
        {Object.keys(tableHeaderObj).map(function (keyName, _keyIndex) {
          const schema = {
            type: "object",
            required: requiredField,
            properties: {
              // TODO : Here keyName should be replaced by value of variable keyName
              //   TODO : The label of each field needed to be hidden
              [keyName]: tableHeaderObj[keyName],
            },
          };

          if (schema?.properties?.[keyName]?.displayType === "dropdown") {
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
                  <Picker
                    selectedValue={obj.item[keyName]}
                    style={{
                      borderWidth: 1,
                      width: `100%`,
                      height: 36,
                      borderColor: "grey",
                      marginTop: 5,
                    }}
                    onValueChange={(itemValue) => {
                      // setSelectedLanguage(itemValue);
                      valueChangeHandler(itemValue, keyName, obj.key);
                    }}
                  >
                    {/* <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" /> */}
                    {schema?.properties?.[keyName]?.enum.map((ele, i) => {
                      return <Picker.Item label={ele} value={ele} key={i} />;
                    })}
                  </Picker>
                </Col>
              </Row>
            );
          }
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
                        title={`+`}
                        color={"green"}
                        disabled={obj.addStatus}
                        onPress={() => addActionHandler(obj.key)}
                      ></Button>
                    </View>
                    <View
                      style={{
                        marginRight: 3,
                      }}
                    >
                      <Button
                        title={`x`}
                        color={"red"}
                        onPress={() => deleteActionHandler(obj.key)}
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
                  value={obj.item[keyName]}
                  onChangeText={(text) => {
                    console.log("text ", text, keyName, obj.key);

                    valueChangeHandler(text, keyName, obj.key);
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
            marginLeft: 60,
            marginRight: 60,
            marginBottom: 20,
          }}
        >
          {/* ******************** Add Rows Button ******************** */}
          <Button
            title={`Add Row`}
            color="#0e73ca"
            disabled={addRowButtonStatus}
            onPress={addRowHandler}
          ></Button>
        </Col>
        <Col
          style={{
            marginLeft: 60,
            marginRight: 60,
            marginBottom: 20,
          }}
        >
          {/* ******************** COPY ROWS BUTTON ********************************* */}
          <Button
            title={`Add Address`}
            color="#0e73ca"
            disabled
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
        showsHorizontalScrollIndicator={true}
      >
        <Grid>
          {/* TABLE HEADER DATA */}
          <Row>
            <Text
              style={{
                // flex: 1,
                padding: 8,
                paddingBottom: 0,
                // borderWidth: 2,
              }}
            >
              {
                <CheckBox
                  color="#0e73ca"
                  value={isAllChecked}
                  onValueChange={(value) => checkboxChangeHanlder(value)}
                />
              }
            </Text>
            {Object.keys(tableHeaderObj).map(function (keyName, _keyIndex) {
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
                        fontWeight: "bold",
                        fontSize: "15",
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
          <ScrollView
            style={{
              // borderWidth: 2,
              maxHeight: 250,
              height: 250,
            }}
          >
            {rowSection}
          </ScrollView>
          {/* TODO : This iteration should be done with the help of loop */}
        </Grid>
      </ScrollView>
      <View style={{ borderWidth: 0, marginLeft: 450, marginTop: 20 }}>
        <Button
          title={`Save`}
          color="#0e73ca"
          onPress={() => {
            console.log("pressed save");
          }}
        />
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
