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
import { Grid } from "react-native-easy-grid";
import { isPropertyAssignment } from "typescript";
import { events } from "../../examples/TSDigisolPlatform/configs/events/eventConfig";
import { prepareSchema } from "../../examples/TSDigisolPlatform/helper/helper";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";
import { RenderTable } from "./RenderTable";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";

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

  const initialVal = {
    key: "values",
  };
  // const [data, setdata] = useState(initialVal);
  const [formLayout, setformLayout] = useState(initialVal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormLayout = async () => {
      setLoading(true);
      const res = await fetch(
        `${SERVER_ENDPOINT}v1/schema/singlechildformLayout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "TsdAdmin",
            roleKey: 1,
            moduleKey:
              props._childDependeny.listJsonFormComponentDependency.moduleKey,
            tabKey:
              props._childDependeny.listJsonFormComponentDependency.tabKey,
            actionName:
              props._childDependeny.listJsonFormComponentDependency.actionName,
          }),
        }
      );
      const resJSON = await res.json();
      setformLayout(resJSON);
      console.log("response Json : : : : : formLayout ---> ", resJSON);
      setLoading(false);
    };
    fetchFormLayout();
  }, []);

  return loading ? (
    <View style={componentGridStyle}>
      <ActivityIndicator />
    </View>
  ) : (
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
            {/* <Text>{noOfColumns}</Text> */}
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
              dataToRender={formLayout}
            />
          </Grid>
        </ScrollView>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

// {// body of parent form
// },
// addresses : [
//   {},{},{},{}
// ]

// const dataToRender2 = {
//   parentCategories: {
//     title: "Parent Categories",
//     type: "object",
//     properties: {
//       parentCategory: {
//         title: "parentCategory",
//         type: "array",
//         items: {
//           type: "object",
//           required: ["sequence", "code"],
//           properties: {
//             sequence: {
//               title: "Sequence",
//               type: "string",
//               format: "",
//               uid: "sequence",
//               pattern: "[0-9]",
//             },
//             code: {
//               title: "Code",
//               type: "string",
//               format: "",
//               uid: "code",
//               pattern: "[a-zA-Z0-9]",
//             },
//           },
//         },
//       },
//     },
//   },
// };

// // OrderLine
// const dataToRender1 = {
//   orderLines: {
//     title: "Order Lines",
//     type: "object",
//     properties: {
//       orderLine: {
//         title: "Order Line",
//         type: "array",
//         items: {
//           type: "object",
//           required: [
//             "bookDate",
//             "unitPrice",
//             "orderedQty",
//             "skuCode",
//             "slotCode",
//             "addressKey",
//             "shipNode",
//           ],
//           properties: {
//             bookDate: {
//               title: "Booking Date",
//               type: "string",
//               uid: "bookDate",
//               pattern: "[a-zA-Z0-9]",
//             },
//             unitPrice: {
//               title: "Unit Price",
//               type: "string",
//               uid: "unitPrice",
//               pattern: "^[0-9]+(.[0-9]{1,2})?$",
//             },
//             orderedQty: {
//               title: "orderedQty",
//               type: "string",
//               uid: "orderedQty",
//               pattern: "[0-9]",
//             },
//             skuCode: {
//               title: "Sku Code",
//               type: "string",
//               displayType: "dropdown",
//               dropdownLoadApiURL: "v1/sku/list",
//               dropdownLoadApiMethod: "POST",
//               uid: "skuCode",
//               pattern: "[a-zA-Z0-9]",
//             },
//             slotCode: {
//               title: "Slot Code",
//               type: "string",
//               uid: "slotCode",
//               pattern: "[a-zA-Z0-9]",
//             },
//             addressKey: {
//               title: "Address Key",
//               type: "string",
//               uid: "addressKey",
//               pattern: "[0-9]",
//             },
//             shipNode: {
//               title: "Ship Node",
//               type: "string",
//               uid: "shipNode",
//               pattern: "[a-zA-Z0-9]",
//             },
//           },
//         },
//       },
//     },
//   },
// };
