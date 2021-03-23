/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { values } from "core-js/core/array";
import { setDate } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Grid } from "react-native-easy-grid";
import { isPropertyAssignment } from "typescript";
import { events } from "../../examples/TSDigisolPlatform/configs/events/eventConfig";
import { prepareSchema } from "../../examples/TSDigisolPlatform/helper/helper";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";
import { RenderTable } from "./RenderTable";

export const ListJsonFormComponent = (props: {
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
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log("listJsonFormComponent :::: ---> ", props);

  const dataToRender = {
    parentCategories: {
      title: "Parent Categories",
      type: "object",
      properties: {
        parentCategory: {
          title: "parentCategory",
          type: "array",
          items: {
            type: "object",
            required: ["sequence", "code"],
            properties: {
              sequence: {
                title: "Sequence",
                type: "string",
                format: "",
                uid: "sequence",
                pattern: "[0-9]",
              },
              code: {
                title: "Code",
                type: "string",
                format: "",
                uid: "code",
                pattern: "[a-zA-Z0-9]",
              },
            },
          },
        },
      },
    },
  };

  return (
    <View style={componentGridStyle}>
      {/* <Text style={{}}>ListJsonFormComponent *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      {/* <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <View>
        <ScrollView>
          <Grid>
            <RenderTable
              appState={appState}
              label={label}
              styles={styles}
              children={children}
              setAppState={setAppState}
              layoutConfig={layoutConfig}
              setLayoutConfig={setLayoutConfig}
              getEvents={getEvents}
              events={events}
              noOfColumns={7}
              dataToRender={dataToRender}
            />
          </Grid>
        </ScrollView>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
