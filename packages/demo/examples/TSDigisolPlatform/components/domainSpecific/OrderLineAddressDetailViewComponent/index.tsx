/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { ShowEntity } from "../../../../../components/DetailComponent/ShowEntity";
import { componentGridStyle } from "../../../styles/common";

export const OrderLineAddressDetailViewComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
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
  } = props;

  console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // TODO : Remove hardcoding and fix error for addressKey in Detail component
      const addressKey = appState.global.tsdApp.orderLineDetail.addressKey;
      console.log("ADDERRES ::::: ", addressKey);
      const res = await fetch(`${SERVER_ENDPOINT}/v1/address/${addressKey}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const resJSON = await res.json();
      setData(resJSON);
      console.log(
        "response Json : : : : : BillToAddressDetailViewComponent  ---> ",
        resJSON
      );
    };
    fetchData();
    setLoading(false);
  }, []);

  return (
    <View style={{}}>
      {/* <Text style={{}}>OrderLineAddressDetailViewComponent *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button>
      <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <ShowEntity props={props} viewData={data} />

      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
