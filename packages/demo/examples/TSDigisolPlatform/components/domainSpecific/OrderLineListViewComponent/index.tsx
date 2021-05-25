/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Dimensions, ScrollView, Text, View } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { events } from "../../../configs/events/eventConfig";
import { routes } from "../../../configs/routes/routesConfig";
import { componentGridStyle } from "../../../styles/common";
import { ListRender } from "./ListRender";

export const OrderLineListViewComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  UItitle: any;
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
    UItitle,
  } = props;

  console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  const [listFormLayout, setlistFormLayout] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        // "https://run.mocky.io/v3/1683d639-a832-4ce5-9173-1dfeff6dd741",
        `${SERVER_ENDPOINT}v1/schema/singleformLayout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            moduleKey: 156051,
            roleKey: 1,
            tabKey: 171505,
            userId: "TsdAdmin",
            actionName: "List",
          }),
        }
      );
      // console.log("Res : : : : : : ", res);
      const resJSON = await res.json();
      // TODO : HARDCODING remove
      // const property =
      //   appState.global != undefined
      //     ? `List` + `${appState.global.tsdApp.activeTab.name}` + `Schema`
      //     : `ListCreateOrdersSchema`;

      // console.log("Property : : : ", property);

      setlistFormLayout(resJSON[`ListORDERLINESchema`]);
    };
    fetchData();
  }, []);

  return (
    <View style={componentGridStyle}>
      <ScrollView horizontal>
        <ListRender
          listFormLayout={listFormLayout}
          appState={appState}
          label={label}
          styles={styles}
          children={children}
          setAppState={setAppState}
          layoutConfig={layoutConfig}
          setLayoutConfig={setLayoutConfig}
          getEvents={getEvents}
          events={events}
          UItitle={UItitle}
        />
      </ScrollView>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
