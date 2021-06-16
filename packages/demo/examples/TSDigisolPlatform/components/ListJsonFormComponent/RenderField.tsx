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
  CheckBox,
  TouchableOpacity,
  // Picker,
} from "react-native";

// import { CheckBox } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import Modal from "modal-react-native-web";

import { Picker } from "@react-native-picker/picker";
import { Col, Row } from "react-native-easy-grid";
import { useState } from "react";
import { calenderStyleTheme } from "../../styles/calenderStyleTheme";
import { FontAwesome } from "@expo/vector-icons";
import { formDependency, formCleanProperty } from "../../helper/helper";

export const RenderField = (props: {
  data: any;
  singleCheckboxHandler: any;
  singleChecked: any;
  addRowButtonStatusHandler: any;
  saveButtonStatusHandler: any;
  addRowButtonStatus: any;
  saveButtonStatus: any;
  addActionHandler: any;
  deleteActionHandler: any;
  formSchema: any;
  id: any;
  checkBox: any;
}) => {
  const {
    data,
    singleCheckboxHandler,
    singleChecked,
    addRowButtonStatusHandler,
    saveButtonStatusHandler,
    addRowButtonStatus,
    saveButtonStatus,
    addActionHandler,
    deleteActionHandler,
    formSchema,
    id,
    checkBox,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState(data.item);
  const [addActionButtonStatus, setAddActionButtonStatus] = useState(
    data.addStatus
  );
  const [uiSchema, setUiSchema] = useState(formSchema?.uischema || {});
  const [isChecked, setIsChecked] = useState(singleChecked.key == data.key);

  const onChangeHandler = async (value, keyName) => {
    const newItem = { ...item };
    newItem[keyName] = value;
    if (value == null || value == "" || value == "null") {
      delete newItem[keyName];
    }
    const newUiSchema = { ...uiSchema };
    formSchema?.["properties"]?.[
      keyName
    ]?.nextDepended?.dependentField?.forEach((property) => {
      formCleanProperty(property.fieldName, newItem, newUiSchema, formSchema);
    });
    await formDependency(keyName, newItem, newUiSchema, formSchema);
    setUiSchema(newUiSchema);
    setItem(newItem);
    setAddActionButtonStatus(true);
  };

  useEffect(() => {
    const newUiSchema = { ...uiSchema };
    Promise.all(
      Object.keys(formSchema?.["properties"]).map(async (name) => {
        await formDependency(name, item, newUiSchema, formSchema);
      })
    ).then(() => {
      setUiSchema(newUiSchema);
    });
  }, []);

  console.log(item);

  if (addRowButtonStatus && addActionButtonStatus) {
    addRowButtonStatusHandler(false);
  }
  if (saveButtonStatus && addActionButtonStatus) {
    saveButtonStatusHandler(false);
  }

  return (
    <Row>
      {checkBox && (
        <Text
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
        </Text>
      )}
      {Object.keys(formSchema["properties"]).map(function (keyName) {
        if (formSchema["properties"][keyName]?.format === "date") {
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
                          minDate={uiSchema[keyName]?.["ui:minDate"]}
                          // minDate={new Date("2021-05-13")}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={uiSchema[keyName]?.["ui:maxDate"]}
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
                  disabled={uiSchema[keyName]?.["ui:disabled"]}
                >
                  <Text style={detailViewStyles.textStyle}>
                    {item[keyName] == undefined ? `Select Date` : item[keyName]}
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
          );
        }

        if (formSchema["properties"][keyName]?.displayType === "dropdown") {
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
                  selectedValue={item[keyName] || "null"}
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
                  disabled={uiSchema[keyName]?.["ui:disabled"]}
                >
                  <Picker.Item
                    label={`Select ${formSchema["properties"][keyName].title} `}
                    value={"null"}
                  />
                  {uiSchema[keyName]?.["ui:enum"]?.map((ele, i) => {
                    return (
                      <Picker.Item
                        label={uiSchema[keyName]?.["ui:enumNames"]?.[i] || ele}
                        value={ele}
                        key={i}
                      />
                    );
                  })}
                </Picker>
              </Col>
            </Row>
          );
        }
        // TODO : schema element with Action button
        if (formSchema["properties"][keyName]?.type === "button") {
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
                editable={
                  formSchema["properties"][keyName]?.format != "readOnly"
                }
                onChangeText={(text) => {
                  onChangeHandler(text, keyName);
                }}
                disabled={uiSchema[keyName]?.["ui:disabled"]}
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
