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
  Pressable,
  CheckBox,
  TouchableOpacity,
  // Picker,
} from "react-native";

// import { CheckBox } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import Modal from "modal-react-native-web";

import { cloneDeep } from "lodash";

import { Picker } from "@react-native-picker/picker";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../../styles/common";
import { useState } from "react";
import { routes } from "../../../configs/routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { prepareSchema } from "../../../helper/helper";
import { RenderField } from "./RenderField";

export const ServiceRenderTable = (props: {
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
  const [isChecked, setIsChecked] = useState(
    appState.global.tsdApp.hasOwnProperty("formData") &&
      appState.global.tsdApp.formData.hasOwnProperty("isChecked")
      ? appState.global.tsdApp.formData["isChecked"]
      : { status: false, key: -1 }
  );
  const [addRowButtonStatus, setAddRowButtonStatus] = useState(true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(false);

  console.log("hii from serviceOrderlinelist");
  const firstParent = Object.getOwnPropertyNames(dataToRender)[0];

  const tableHeaderObj = dataToRender[firstParent].properties;

  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };
  const requiredField = dataToRender[firstParent].required;

  const addRowHandler = () => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      const newObj = {
        key: uuid.v4(),
        item: {},
      };
      newArrObj.push(newObj);
      return newArrObj;
    });
    setAddRowButtonStatus(false);
  };

  const singleCheckboxHandler = (key, value) => {
    setIsChecked({ status: value, key: value ? key : -1 });
  };

  const addRowButtonStatusHandler = (value) => {
    setAddRowButtonStatus(value);
  };

  const addActionHandler = (key, item) => {
    setArrObj((oldArrObj) => {
      const newArrObj = cloneDeep(oldArrObj);
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          obj.item = { ...item };
        }
      });
      return newArrObj;
    });
    setAddRowButtonStatus(true);
    setSaveButtonStatus(true);
  };

  const deleteActionHandler = (key) => {
    setArrObj((oldArrObj) => {
      const tempArrObj = cloneDeep(oldArrObj);
      const newArrObj = tempArrObj.filter((obj) => obj.key !== key);
      return newArrObj;
    });
    setAddRowButtonStatus(true);
  };

  const rowSection = arrObj.map((obj) => {
    return (
      <RenderField
        data={obj.item}
        deleteActionHandler={deleteActionHandler}
        addActionHandler={addActionHandler}
        addRowButtonStatusHandler={addRowButtonStatusHandler}
        singleCheckboxHandler={singleCheckboxHandler}
        singleChecked={isChecked}
        addRowButtonStatus={addRowButtonStatus}
        tableHeaderObj={tableHeaderObj}
        id={obj.key}
        requiredField={requiredField}
      />
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
            title={`Add Address`}
            color="#0e73ca"
            disabled={!isChecked.status}
            onPress={() => {
              setAppState({
                global: {
                  tsdApp: {
                    formData: {
                      ...appState?.global?.tsdApp?.formData,
                      [label]: arrObj,
                      ["isChecked"]: isChecked,
                    },
                  },
                },
              });
              setLayoutConfig(routes.createOrderlineAddress);
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
                  <Col size={7.1}>
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
          disabled={
            !(saveButtonStatus && arrObj.length > 0 && addRowButtonStatus)
          }
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
        />
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
