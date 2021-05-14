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
  TouchableOpacity,
  StyleSheet,
  Pressable,
  // Picker,
} from "react-native";
import { cloneDeep } from "lodash";
import uuid from "react-native-uuid";

import { Picker } from "@react-native-picker/picker";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../../styles/common";
import { useState } from "react";
import { routes } from "../../../configs/routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { prepareSchema } from "../../../helper/helper";
import { Calendar } from "react-native-calendars";
import { calenderStyleTheme } from '../../../styles/calenderStyleTheme';
import { FontAwesome } from "@expo/vector-icons";
import Modal from "modal-react-native-web";

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

  const [arrObj, setArrObj] = useState(
    appState.global.tsdApp.hasOwnProperty("formData") &&
      appState.global.tsdApp.formData.hasOwnProperty(label)
      ? appState.global.tsdApp.formData[label]
      : []
  );
  const [saveButtonStatus, setSaveButtonStatus] = useState(false);
  const [addRowButtonStatus, setAddRowButtonStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log("data to render", dataToRender);

  const tableHeaderObj = dataToRender.properties;

  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };
  // console.log("tableHeader", tableHeaderObj);
  const requiredField = dataToRender.required;

  // const keyIdPrefix = () => {
  //   const keyArray = Object.getOwnPropertyNames(
  //     dataToRender[firstParent].properties
  //   );
  //   console.log("keyArray", keyArray);
  //   return keyArray[0];
  // };
  // keyIdPrefix();
  const valueChangeHandler = (value, keyname, key) => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          obj.item[keyname] = value;
          obj.addStatus = false;
        }
      });
      return newArrObj;
    });
  };

  const addRowHandler = () => {
    setAddRowButtonStatus(false);
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
  const addActionHandler = (key) => {
    setAddRowButtonStatus(true);
    setSaveButtonStatus(true);
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
    setAddRowButtonStatus(true);
  };

  if (addRowButtonStatus) {
    if (
      arrObj.length >= 2 ||
      arrObj.filter((obj) => obj.addStatus === false).length > 0
    ) {
      setAddRowButtonStatus(false);
    }
  }

  if (saveButtonStatus) {
    if (
      arrObj.length === 0 ||
      arrObj.filter((obj) => obj.addStatus === false).length > 0
    ) {
      setSaveButtonStatus(false);
    }
  }

  // const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
  //   const res1 = fetch(`${SERVER_ENDPOINT}${endPoint}`, {
  //     method: httpMethod,
  //     // method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((res) => res.json())
  //     .then((_data) => {
  //       console.log("data create", _data);
  //       setAppState({
  //         global: {
  //           tsdApp: {
  //             createComponent: {
  //               [appState.global.tsdApp.activeTab.name]: _data,
  //               formData: body,
  //             },
  //             viewComponent: {
  //               [appState.global.tsdApp.activeTab.name]: _data,
  //             },
  //           },
  //         },
  //       });
  //       console.log("DATA UPDATED .......");
  //       setLayoutConfig(routeToRedirect, "copy");
  //     });
  // };

  // console.log("arrobj", arrObj);
  const rowSection = arrObj.map((obj) => {
    // console.log("arrKey : : : ", arrKey);

    return (
      <Row>
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

          if (schema?.properties?.[keyName]?.format === "date") {
            return (
              <Row
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "grey",
                  width: "100%",
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Col>
                  {
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={detailViewStyles.centeredView}>
                        <View style={detailViewStyles.modalView}>
                          <View
                            style={{
                              flexDirection: "row",
                              borderBottomWidth: 1,
                              borderBottomColor: "#a8a8a8",
                              padding: 5,
                            }}
                          >
                            <View style={{ borderWidth: 0, marginRight: 250 }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: "#0d47a1",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                Select Date
                              </Text>
                            </View>
                            <View
                              style={{
                                borderWidth: 0,
                                alignContent: "flex-end",
                              }}
                            >
                              <Pressable
                                onPress={() => {
                                  setModalVisible(false);
                                }}
                              >
                                <FontAwesome
                                  name="window-close"
                                  size={20}
                                  color="red"
                                  style={{
                                    // borderWidth: 2,
                                    alignSelf: "flex-end",
                                  }}
                                />
                              </Pressable>
                            </View>
                          </View>
                          <Calendar
                            style={{
                              height: 350,
                              width: 350,
                            }}
                            theme={calenderStyleTheme}
                            renderArrow={(direction) =>
                              direction === "left" ? (
                                <FontAwesome
                                  name="chevron-left"
                                  size={18}
                                  color="#2196f3"
                                  // style={{
                                  //   position: "absolute",
                                  //   alignSelf: "flex-start",
                                  // }}
                                />
                              ) : (
                                <FontAwesome
                                  name="chevron-right"
                                  color="#2196f3"
                                  size={18}
                                  // style={{
                                  //   position: "absolute",
                                  //   alignSelf: "flex-end",
                                  // }}
                                />
                              )
                            }
                            // Initially visible month. Default = Date()
                            current={new Date().toISOString().slice(0, 10)}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            minDate={"2021-05-12"}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={"2021-05-24"}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => {
                              valueChangeHandler(
                                day.dateString,
                                keyName,
                                obj.key
                              );
                            }}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => {
                              console.log("selected day", day);
                              setModalVisible(false);
                            }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={"yyyy MMM"}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => {
                              console.log("month changed", month);
                            }}
                            // Hide month navigation arrows. Default = false
                            hideArrows={false}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                            //renderArrow={(direction) => (<Arrow/>)}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={false}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={false}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={(subtractMonth) =>
                              subtractMonth()
                            }
                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                            onPressArrowRight={(addMonth) => addMonth()}
                            // Disable left arrow. Default = false
                            disableArrowLeft={false}
                            // Disable right arrow. Default = false
                            disableArrowRight={false}
                            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates

                            // Replace default month and year title with custom one. the function receive a date as parameter.
                            // Enable the option to swipe between months. Default = false
                            enableSwipeMonths={true}
                            markedDates={{
                              [obj.item[keyName]]: { selected: true },
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
                  }
                  <TouchableOpacity
                    style={detailViewStyles.button}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={detailViewStyles.textStyle}>
                      {obj.item[keyName] == undefined
                        ? new Date().toISOString().slice(0, 10)
                        : obj.item[keyName]}
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            );
          }

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
            disabled={!addRowButtonStatus}
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
            title={`Copy Row`}
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
          disabled={!saveButtonStatus}
          onPress={() => {
            console.log("Final submit");
            setAppState({
              global: {
                tsdApp: {
                  formData: {
                    ...appState?.global?.tsdApp?.formData,
                    [label]: arrObj,
                  },
                },
              },
            });
            setSaveButtonStatus(false);
          }}
        ></Button>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const detailViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  item: {
    padding: 10,
    margin: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    opacity: 1,
    // borderRadius: 2,
    // height: 330,
    // alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    color: "#0d47a1",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#0d47a1",
    textAlign: "left",
  },
  subInfo: {
    fontSize: 12,
    color: "#1565c0",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonView: {
    marginLeft: 1,
    marginRight: 1,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: 35,
    width: "100%",
    marginTop: 4,
    marginBottom: 2,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  textStyle: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 10,
    marginRight: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    width: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "#cccccc",
    borderRadius: 1,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  insideText: {
    width: 100,
  },
});
