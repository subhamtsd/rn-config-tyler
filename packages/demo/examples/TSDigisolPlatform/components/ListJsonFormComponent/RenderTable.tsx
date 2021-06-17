/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import uuid from "react-native-uuid";
import {
  Button,
  Text,
  View,
  ScrollView,
  // Picker,
} from "react-native";

import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../styles/common";
import { useState } from "react";
import { RenderField } from "./RenderField";

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
  checkBox: any;
  checkBoxButton: any;
  submitButton: any;
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
    checkBox,
    checkBoxButton,
    submitButton,
  } = props;

  const [arrObj, setArrObj] = useState(
    appState?.$global?.tsdApp?.createComponent?.[label] || []
  );
  const [isChecked, setIsChecked] = useState(
    appState?.$global?.tsdApp?.createComponent?.["isChecked"] || {
      status: false,
      key: -1,
    }
  );
  const [addRowButtonStatus, setAddRowButtonStatus] = useState(true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(true);
  const firstParent = Object.getOwnPropertyNames(dataToRender)[0];
  const secondParent = Object.getOwnPropertyNames(
    dataToRender[Object.getOwnPropertyNames(dataToRender)[0]].properties
  );

  const formSchema =
    dataToRender[firstParent].properties[secondParent[0]].items;

  formSchema["properties"]["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };

  const addRowHandler = () => {
    setArrObj((oldArrObj) => {
      const newArrObj = [...oldArrObj];
      const newObj = {
        key: uuid.v4(),
        item: {},
        addStatus: true,
      };
      newArrObj.push(newObj);
      return newArrObj;
    });
    setAddRowButtonStatus(false);
    setSaveButtonStatus(false);
  };

  const singleCheckboxHandler = (key, value) => {
    setIsChecked({ status: value, key: value ? key : -1 });
  };

  const addRowButtonStatusHandler = (value) => {
    setAddRowButtonStatus(value);
  };

  const saveButtonStatusHandler = (value) => {
    setSaveButtonStatus(value);
  };

  const addActionHandler = (key, item) => {
    setArrObj((oldArrObj) => {
      const newArrObj = [...oldArrObj];
      newArrObj.forEach((obj) => {
        if (obj.key === key) {
          obj.item = { ...item };
          obj.addStatus = false;
        }
      });
      return newArrObj;
    });
    if (arrObj.length < maxNoOfRows) {
      setAddRowButtonStatus(true);
    }
    setSaveButtonStatus(true);
  };

  const deleteActionHandler = (key) => {
    setArrObj((oldArrObj) => {
      const tempArrObj = [...oldArrObj];
      const newArrObj = tempArrObj.filter((obj) => obj.key !== key);
      return newArrObj;
    });
    setAddRowButtonStatus(true);
    setSaveButtonStatus(true);
  };

  const rowSection = arrObj.map((obj) => {
    return (
      <RenderField
        data={obj}
        deleteActionHandler={deleteActionHandler}
        addActionHandler={addActionHandler}
        addRowButtonStatusHandler={addRowButtonStatusHandler}
        saveButtonStatusHandler={saveButtonStatusHandler}
        singleCheckboxHandler={singleCheckboxHandler}
        singleChecked={isChecked}
        addRowButtonStatus={addRowButtonStatus}
        saveButtonStatus={saveButtonStatus}
        formSchema={formSchema}
        id={obj.key}
        checkBox={checkBox}
      />
    );
  });

  return (
    <View style={componentGridStyle}>
      <Row
        style={{
          flexDirection: "row-reverse",
        }}
      >
        <Col
          style={{
            // marginLeft: 60,
            // marginRight: 60,
            // marginBottom: 20,
            maxWidth: 130,
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
            // marginLeft: 60,
            marginRight: 60,
            // marginBottom: 20,
            maxWidth: 130,
          }}
        >
          {checkBoxButton && (
            <Button
              title={checkBoxButton}
              color="#0e73ca"
              disabled={!isChecked.status}
              {...getEvents(
                `${label}-checkbox-press`,
                setLayoutConfig,
                setAppState,
                appState,
                arrObj,
                label,
                isChecked
              )}
            ></Button>
          )}
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
            {Object.keys(formSchema?.properties).map(function (
              keyName,
              _keyIndex
            ) {
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
                      {formSchema["properties"][keyName].title}
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
      <View
        style={{
          maxWidth: "100%",
          marginTop: 20,
          // borderWidth: 1,
        }}
      >
        <View
          style={{
            // borderWidth: 1,
            maxWidth: 150,
          }}
        >
          <Button
            title={submitButton}
            color="#0e73ca"
            disabled={!(arrObj.length > 0 && saveButtonStatus)}
            {...getEvents(
              `${label}-submit`,
              setLayoutConfig,
              setAppState,
              appState,
              arrObj,
              label,
              firstParent,
              secondParent
            )}
          />
        </View>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
