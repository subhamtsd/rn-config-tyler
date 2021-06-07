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

// import { CheckBox } from "react-native-elements";

import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../../styles/common";
import { useState } from "react";
import { routes } from "../../../configs/routes/routesConfig";
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
    appState?.$global?.tsdApp?.createComponent?.[label] || []
  );
  const [isChecked, setIsChecked] = useState(
    appState?.$global?.tsdApp?.createComponent?.["isChecked"] || {
      status: false,
      key: -1,
    }
  );
  const [addRowButtonStatus, setAddRowButtonStatus] = useState(true);
  const [saveButtonStatus, setSaveButtonStatus] = useState(false);
  const firstParent = Object.getOwnPropertyNames(dataToRender)[0];
  const secondParent = Object.getOwnPropertyNames(
    dataToRender[Object.getOwnPropertyNames(dataToRender)[0]].properties
  );

  const tableHeaderObj =
    dataToRender[firstParent].properties[secondParent[0]].items.properties;

  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };
  const requiredField =
    dataToRender[firstParent].properties[secondParent[0]].items.required;

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
  };

  const singleCheckboxHandler = (key, value) => {
    setIsChecked({ status: value, key: value ? key : -1 });
  };

  const addRowButtonStatusHandler = (value) => {
    setAddRowButtonStatus(value);
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
    setAddRowButtonStatus(true);
    setSaveButtonStatus(true);
  };

  const deleteActionHandler = (key) => {
    setArrObj((oldArrObj) => {
      const tempArrObj = [...oldArrObj];
      const newArrObj = tempArrObj.filter((obj) => obj.key !== key);
      return newArrObj;
    });
    setAddRowButtonStatus(true);
  };

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

  const rowSection = arrObj.map((obj) => {
    return (
      <RenderField
        data={obj}
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
          <Button
            title={`Copy`}
            color="#0e73ca"
            disabled={true}
            onPress={() => {
              const newAppState = { ...appState };
              newAppState.$global.tsdApp.createComponent[label] = arrObj;
              newAppState.$global.tsdApp.createComponent["isChecked"] =
                isChecked;
              setAppState(newAppState, false);
              setLayoutConfig(routes.createOrderlineAddress, "copy");
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
            title={`Save`}
            color="#0e73ca"
            disabled={
              !(saveButtonStatus && arrObj.length > 0 && addRowButtonStatus)
            }
            onPress={() => {
              console.log("Final submit");
              const newAppState = { ...appState };
              newAppState.$global.tsdApp.createComponent[label] = arrObj;
              setAppState(newAppState, false);
              setSaveButtonStatus(false);
            }}
          />
        </View>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
