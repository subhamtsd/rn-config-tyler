/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  // Picker,
} from "react-native";

// import { CheckBox } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import Modal from "modal-react-native-web";

import { Picker } from "@react-native-picker/picker";
import { Col, Row } from "react-native-easy-grid";
import { useState } from "react";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { calenderStyleTheme } from "../../../styles/calenderStyleTheme";
import { FontAwesome } from "@expo/vector-icons";

export const RenderField = (props: {
  data: any;
  singleCheckboxHandler: any;
  singleChecked: any;
  addRowButtonStatusHandler: any;
  addRowButtonStatus: any;
  addActionHandler: any;
  deleteActionHandler: any;
  tableHeaderObj: any;
  id: any;
  requiredField: any;
}) => {
  const {
    data,
    singleCheckboxHandler,
    singleChecked,
    addRowButtonStatusHandler,
    addRowButtonStatus,
    addActionHandler,
    deleteActionHandler,
    tableHeaderObj,
    id,
    requiredField,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState(data.item);
  const [addActionButtonStatus, setAddActionButtonStatus] = useState(
    data.addStatus
  );
  const [isChecked, setIsChecked] = useState(singleChecked.key == data.key);
  const [dataList, setDataList] = useState({});
  const [disableList, setDisableList] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(data);

  const fetchData = async (keyName: string | number, body: {}) => {
    const res = await fetch(
      `${SERVER_ENDPOINT}${tableHeaderObj[keyName].dropdownLoadApiURL}`,
      {
        method: tableHeaderObj[keyName].dropdownLoadApiMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const resJSON = await res.json();
    if (tableHeaderObj[keyName].displayType == "dropdown") {
      const value = [];
      const label = [];
      for (const data of resJSON.response) {
        value.push(data[resJSON?.filedValue || keyName]);
        label.push(data[resJSON.displayValue || keyName]);
      }
      return { enum: value, enumName: label };
    } else if (tableHeaderObj[keyName].format == "date") {
      return {
        minDate: resJSON.response?.[0]?.startDate,
        maxDate: resJSON.response?.[resJSON.response.length - 1]?.startDate,
      };
    } else if (tableHeaderObj[keyName].format == "readOnly") {
      return resJSON.response[0][resJSON.displayValue];
    }
  };

  const cleanProperty = (
    keyName: string | number,
    newItem: { [x: string]: any },
    newDataList: { [x: string]: any },
    newDisableList: { [x: string]: boolean }
  ) => {
    if (newItem[keyName]) {
      tableHeaderObj[keyName]?.nextDepended?.dependentField?.forEach(
        (property: { fieldName: any }) => {
          cleanProperty(
            property.fieldName,
            newItem,
            newDataList,
            newDisableList
          );
        }
      );
    }
    delete newItem[keyName];
    delete newDataList[keyName];
    newDisableList[keyName] = true;
  };

  const onChangeHandler = async (value: string | null, keyName: string) => {
    const newItem = { ...item };
    newItem[keyName] = value;
    if (value == null || value == "" || value == "null") {
      delete newItem[keyName];
    }
    const newDataList = { ...dataList };
    const newDisableList = { ...disableList };
    tableHeaderObj[keyName]?.nextDepended?.dependentField?.forEach(
      (property: { fieldName: any }) => {
        cleanProperty(property.fieldName, newItem, newDataList, newDisableList);
      }
    );
    if (value == null || value == "" || value == "null") {
      setDisableList(newDisableList);
      setDataList(newDataList);
    } else if (tableHeaderObj[keyName]?.nextDepended?.dependentField) {
      await Promise.all(
        tableHeaderObj[keyName]?.nextDepended?.dependentField?.map(
          async (property: { fieldName: string | number }) => {
            let flag = true;
            const body = {};
            tableHeaderObj[property.fieldName]?.dependency?.forEach(
              (propertyName: string | number) => {
                if (
                  newItem[propertyName] == undefined ||
                  newItem[propertyName] == "" ||
                  newItem[propertyName] == null
                ) {
                  flag = false;
                  return;
                }
                body[propertyName] = newItem[propertyName];
              }
            );
            if (flag) {
              const data = await fetchData(property.fieldName, body);
              if (tableHeaderObj[property.fieldName]?.format == "readOnly") {
                newItem[property.fieldName] = data;
              } else {
                newDataList[property.fieldName] = data;
              }
              newDisableList[property.fieldName] = false;
            }
          }
        )
      );
      setDataList(newDataList);
      setDisableList(newDisableList);
    }
    setItem(newItem);
    setAddActionButtonStatus(true);
  };

  useEffect(() => {
    const newDisableList = { ...disableList };
    const newDataList = { ...dataList };
    Promise.all(
      Object.keys(tableHeaderObj).map(async (keyName) => {
        newDisableList[keyName] = !(
          tableHeaderObj[keyName]?.dependency?.length == 0 ||
          tableHeaderObj[keyName]?.dependency == undefined
        );
        if (!newDisableList[keyName]) {
          if (tableHeaderObj[keyName]?.displayType === "dropdown")
            newDataList[keyName] = {
              enum: [...tableHeaderObj[keyName]?.enum],
            };
        }
        if (
          !newDisableList[keyName] &&
          item[keyName] &&
          item[keyName] != "" &&
          tableHeaderObj[keyName]?.nextDepended?.dependentField
        ) {
          await Promise.all(
            tableHeaderObj[keyName]?.nextDepended?.dependentField?.map(
              async (property: { fieldName: string | number }) => {
                let flag = true;
                const body = {};
                tableHeaderObj[property.fieldName]?.dependency?.forEach(
                  (propertyName: string | number) => {
                    if (
                      item[propertyName] == undefined ||
                      item[propertyName] == "" ||
                      item[propertyName] == null
                    ) {
                      flag = false;
                      return;
                    }
                    body[propertyName] = item[propertyName];
                  }
                );
                if (flag) {
                  const data = await fetchData(property.fieldName, body);
                  if (
                    tableHeaderObj[property.fieldName]?.format == "readOnly"
                  ) {
                    item[property.fieldName] = data;
                  } else {
                    newDataList[property.fieldName] = data;
                  }
                  newDisableList[property.fieldName] = false;
                }
              }
            )
          );
        }
      })
    );
    setDisableList(newDisableList);
    setDataList(newDataList);
  }, []);

  console.log(item);

  if (addRowButtonStatus && addActionButtonStatus) {
    addRowButtonStatusHandler(false);
  }

  return (
    <Row>
      {/* <Text
        style={{
          // flex: 1,
          padding: 8,
          paddingBottom: 0,
          paddingTop: 14,
          // borderWidth: 2,
        }}
      >
        <CheckBox
          color="#0e73ca"
          value={isChecked}
          disabled={
            !(!addActionButtonStatus && isChecked === singleChecked.status)
          }
          onValueChange={(
            value: boolean | ((prevState: boolean) => boolean)
          ) => {
            setIsChecked(value);
            singleCheckboxHandler(id, value);
          }}
        />
      </Text> */}
      {Object.keys(tableHeaderObj).map(function (keyName) {
        if (tableHeaderObj[keyName]?.format === "date") {
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
                          current={new Date().toISOString().slice(0, 10)}
                          // Initially visible month. Default = Date()
                          //current={new Date().toISOString().slice(0, 10)}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={dataList[keyName]?.minDate}
                          // minDate={new Date("2021-05-13")}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={dataList[keyName]?.maxDate}
                          // maxDate={new Date("2021-05-26")}
                          // Handler which gets executed on day press. Default = undefined
                          onDayPress={(day) => {
                            onChangeHandler(day.dateString, keyName);
                            setModalVisible((modalVisible) => !modalVisible);
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
                          onPressArrowLeft={(subtractMonth) => subtractMonth()}
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
                            [item[keyName]]: { selected: true },
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
                  disabled={disableList[keyName]}
                >
                  <Text style={detailViewStyles.textStyle}>
                    {item[keyName] == undefined ? `Select Date` : item[keyName]}
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
          );
        }

        if (tableHeaderObj[keyName]?.displayType === "dropdown") {
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
                  selectedValue={item[keyName] || null}
                  style={{
                    borderWidth: 1,
                    width: `100%`,
                    height: 36,
                    borderColor: "grey",
                    marginTop: 5,
                  }}
                  onValueChange={(itemValue) => {
                    onChangeHandler(itemValue, keyName);
                  }}
                  disabled={disableList[keyName]}
                >
                  <Picker.Item
                    label={`Select ${tableHeaderObj[keyName].title} `}
                    value={null}
                  />
                  {dataList[keyName]?.enum?.map(
                    (
                      ele: ItemValue | undefined,
                      i: React.Key | null | undefined
                    ) => {
                      return <Picker.Item label={ele} value={ele} key={i} />;
                    }
                  )}
                </Picker>
              </Col>
            </Row>
          );
        }
        // TODO : schema element with Action button
        if (tableHeaderObj[keyName]?.type === "button") {
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
                      disabled={!addActionButtonStatus}
                      onPress={() => {
                        addActionHandler(id, item);
                        setAddActionButtonStatus(false);
                      }}
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
                      onPress={() => deleteActionHandler(id)}
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
                value={item[keyName] || ""}
                editable={tableHeaderObj[keyName]?.format != "readOnly"}
                onChangeText={(text) => {
                  onChangeHandler(text, keyName);
                }}
                disabled={disableList[keyName]}
              ></TextInput>
            </Col>
          </Row>
        );
      })}
    </Row>
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
    backgroundColor: "white",
    borderRadius: 1,
    borderColor: "#a8a8a8",
    borderWidth: 1,
    // padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    height: 400,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
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
    fontSize: 12,
    padding: 2,
    margin: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  insideText: {
    width: 100,
    backgroundColor: "#5cabc5",
  },
});
