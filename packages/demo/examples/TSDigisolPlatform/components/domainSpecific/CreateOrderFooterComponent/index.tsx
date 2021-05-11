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
          title={`Submit`}
          color="#0e73ca"
          disabled={status}
          onPress={submitHandler}
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
          title={`cancel`}
          color="#0e73ca"
          disabled
          onPress={() => {
            console.log("Cancel Clicked");
            // copy the last row
          }}
        ></Button>
      </Col>
    </Row>
  );
};
