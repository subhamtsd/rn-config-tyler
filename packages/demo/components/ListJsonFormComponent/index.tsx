/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Text, View, ScrollView } from "react-native";
import { Grid } from "react-native-easy-grid";
import { events } from "../../examples/TSDigisolPlatform/configs/events/eventConfig";
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
  ntevents: any;
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

  const dataToRender = {
    orderLines: {
      title: "Order Lines",
      type: "object",
      properties: {
        orderLine: {
          title: "Order Line",
          type: "array",
          items: {
            type: "object",
            required: [
              "bookDate",
              "unitPrice",
              "orderedQty",
              "skuCode",
              "slotCode",
              "addressKey",
              "shipNode",
            ],
            properties: {
              bookDate: {
                title: "Booking Date",
                type: "string",
                uid: "bookDate",
                pattern: "[a-zA-Z0-9]",
              },
              unitPrice: {
                title: "Unit Price",
                type: "string",
                uid: "unitPrice",
                pattern: "^[0-9]+(.[0-9]{1,2})?$",
              },
              orderedQty: {
                title: "orderedQty",
                type: "string",
                uid: "orderedQty",
                pattern: "[0-9]",
              },
              skuCode: {
                title: "Sku Code",
                type: "string",
                displayType: "dropdown",
                dropdownLoadApiURL: "v1/sku/list",
                dropdownLoadApiMethod: "POST",
                uid: "skuCode",
                pattern: "[a-zA-Z0-9]",
              },
              slotCode: {
                title: "Slot Code",
                type: "string",
                uid: "slotCode",
                pattern: "[a-zA-Z0-9]",
              },
              addressKey: {
                title: "Address Key",
                type: "string",
                uid: "addressKey",
                pattern: "[0-9]",
              },
              shipNode: {
                title: "Ship Node",
                type: "string",
                uid: "shipNode",
                pattern: "[a-zA-Z0-9]",
              },
            },
          },
        },
      },
    },
  };

  const noOfColumns = Object.keys(
    dataToRender.orderLines.properties.orderLine.items.properties
  ).length;

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
            <Text>{noOfColumns}</Text>
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
              noOfColumns={noOfColumns}
              dataToRender={dataToRender}
            />
          </Grid>
        </ScrollView>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
