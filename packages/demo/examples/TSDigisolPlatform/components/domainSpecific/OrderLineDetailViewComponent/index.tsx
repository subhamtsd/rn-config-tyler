/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View } from "react-native";
import { ShowEntity } from "../../../components/DetailComponent/ShowEntity";

export const OrderLineDetailViewComponent = (props: {
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

  return (
    <View>
      {/* <Text style={{}}>OrderLineDetailViewComponent *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button>
      <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <ShowEntity
        props={props}
        viewData={appState?.$global?.tsdApp?.orderLineDetail}
      />

      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
