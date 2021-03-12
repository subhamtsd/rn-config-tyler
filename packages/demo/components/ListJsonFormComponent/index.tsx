/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import { Grid } from "react-native-easy-grid";
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

  const [data, setdata] = useState({});
  const [responseStatus, setResponseStatus] = useState(200);

  const dataToRender = {
    Addresses: {
      title: "Addresses",
      type: "object",
      properties: {
        address: {
          title: "Address",
          type: "array",
          items: {
            type: "object",
            required: ["city", "state", "firstName", "lastName", "postalCode"],
            properties: {
              city: {
                title: "City",
                type: "string",
                format: "",
                displayType: "dropdown",
                dropdownLoadApiURL: "v1/device/list",
                dropdownLoadApiMethod: "POST",
                uid: "city",
                pattern: "[A-Z{3,6}]",
              },
              state: {
                title: "State",
                type: "string",
                format: "",
                uid: "state",
                pattern: "[A-Z{3,6}]",
              },
              firstName: {
                title: "First Name",
                type: "string",
                format: "",
                uid: "firstName",
                pattern: "[a-zA-Z0-9]",
              },
              lastName: {
                title: "Last Name",
                type: "string",
                format: "",
                uid: "lastName",
                pattern: "[a-zA-Z0-9]",
              },
              postalCode: {
                title: "Postal Code",
                type: "string",
                format: "",
                uid: "postalCode",
                pattern: "[a-zA-Z0-9]",
              },
            },
          },
        },
      },
    },
  };

  const dataToRender2 = {
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

  // OrderLine
  const dataToRender1 = {
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
  useEffect(() => {
    const fetchFormLayout = async () => {
      const res = await fetch(
        `http://localhost:8080/transaction-web/v1/schema/singleformLayout`,
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
              appState.global != undefined
                ? appState.global.tsdApp.activeModule != undefined
                  ? appState.global.tsdApp.activeModule.key
                  : "23751"
                : "23751",
            tabKey:
              appState.global != undefined
                ? appState.global.tsdApp.activeTab != undefined
                  ? appState.global.tsdApp.activeTab.key
                  : "34601"
                : "34601",
            actionName:
              appState.global != undefined
                ? appState.global.tsdApp.activeAction != undefined
                  ? appState.global.tsdApp.activeAction.name
                  : "Search"
                : "Search",
          }),
        }
      );
      const resJSON = await res.json();
      const status = res.status;
      if (status === 204) {
        setResponseStatus(status);
      }
      console.log("response Json : : : : : formLayout ---> ", resJSON);
      prepareSchema(resJSON)
        .then((schemaJson) => {
          console.log("SchemaJson updated : : :: ", schemaJson);
          return schemaJson;
        })
        .then((formLayout) => {
          console.log("Schema returened : : : ", formLayout);
          const objectName =
            appState.global != undefined
              ? appState.global.tsdApp.activeAction.name +
                appState.global.tsdApp.activeTab.name +
                "Schema"
              : "SearchCreateOrdersSchema";

          console.log("objectName : : : : ", objectName);
          console.log(
            "____formLayout_____:::::",
            formLayout[objectName][`properties`]
          );
          setdata(formLayout[objectName]["properties"]);
          // setformLayout(formLayout[objectName]);
          // setUISchema(formLayout[objectName]);
        });
    };
    // return () => {};
    fetchFormLayout();
  }, []);

  // if (responseStatus) {
  //   return (
  //     <View style={componentGridStyle}>
  //       <Text>No data found</Text>
  //     </View>
  //   );
  // }
  // TODO : Remove hardcoding
  const noOfColumns = Object.keys(
    dataToRender.Addresses.properties.address.items.properties
    // dataToRender.parentCategories.properties.parentCategory.items.properties
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
