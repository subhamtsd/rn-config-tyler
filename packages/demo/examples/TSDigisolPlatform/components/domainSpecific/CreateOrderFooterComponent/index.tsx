/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { isPropertyAssignment } from "typescript";
import { events } from "../../../configs/events/eventConfig";
import { prepareSchema } from "../../../helper/helper";
import { componentGridStyle } from "../../../styles/common";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { ListJsonFormComponent } from "./../../../../../components/ListJsonFormComponent/index";
import { cloneDeep } from "lodash";

export const CreateOrderFooterComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
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
    events,
    _childDependeny,
  } = props;

  console.log(`label is ${label}`);

  const submitHandler = () => {
    const {
      bodyHeader,
      createAddressFormComponent,
      createOrderlineListComponent,
    } = appState?.global?.tsdApp?.formData;

    const orderLine = [];
    const address = [];
    createOrderlineListComponent.forEach((obj) => {
      const newObj = { ...obj.item };
      newObj["address"] = {
        ...appState?.global?.tsdApp?.formData?.[obj.key],
      };
      orderLine.push(newObj);
    });
    createAddressFormComponent.forEach((obj) => {
      const newObj = { ...obj.item };
      address.push(newObj);
    });

    const body = {
      ...bodyHeader,
      addressInfos: {
        address: address,
      },
      orderLines: {
        orderLine: orderLine,
      },
    };
    console.log("final submit body   ", body);
    const res1 = fetch(
      `${SERVER_ENDPOINT}${appState.global.tsdApp.editComponent.action.endPoint}/`,
      {
        method: appState.global.tsdApp.editComponent.action.httpMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((_data) => {
        console.log("submit success ", _data);
        const newAppState = cloneDeep(appState);
        delete newAppState.global.tsdApp.formData;
        setAppState(newAppState, false);
      });
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          marginLeft: 60,
          marginRight: 60,
          marginBottom: 20
        }}
      >
        {/* ******************** Add Rows Button ******************** */}
        <TouchableOpacity
          style={buttonStyle.buttonSubmit}
          // disabled={status}
          onPress={submitHandler}
        >
          <Text style={buttonStyle.text1}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginLeft: 60,
          marginRight: 60,
          marginBottom: 20
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
    borderRadius: 2
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
    borderColor: '#000',
    borderWidth: 0.5
  },
  text1: {
    color: '#fff',
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500
  },
  text2: {
    color: '#545454',
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500
  },
})
