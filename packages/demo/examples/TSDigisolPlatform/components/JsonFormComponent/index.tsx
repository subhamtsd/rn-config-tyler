/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import useSafeSetState from "../../helper/useSafeState";
import { routes } from "../../configs/routes/routesConfig";
import { componentGridStyle } from "../../styles/common";
import { JsonForm } from "./JsonForm";
import { prepareSchema } from "../../helper/helper";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";

export const JsonFormComponent = (props: {
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

  // console.log("DISPATCH : : : : ", dispatch);
  const activeTabName =
    appState?.global?.tsdApp?.activeTab?.name || "CreateOrder";
  const _formData =
    appState?.global?.tsdApp?.createComponent[activeTabName] ||
    appState?.global?.tsdApp?.searchComponent?.searchPayload;

  console.log("FORM DATA : :::: --- Create Form ::: ", _formData);

  const [loading, setloading] = useState(true);

  const _uiSchema = {
    roleName: {
      "ui:title": "Role Name",
      "ui:placeholder": "Please select your Role",
      "ui:widget": "select",
    },
    // submitButton: false,
  };

  const initialFormSchema = {};

  const [formLayout, setformLayout] = useState(initialFormSchema);
  const [uiSchema, setUISchema] = useState(_uiSchema);
  const [responseStatus, setResponseStatus] = useState(200);

  const actionStatus =
    appState.global != undefined
      ? appState.global.tsdApp.activeAction != undefined
        ? appState.global.tsdApp.activeAction.name
        : "Search"
      : "Search";

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const res = await fetch(`${SERVER_ENDPOINT}v1/schema/singleformLayout`, {
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
      });
      const status = res.status;
      console.log("status : :: : ", status);
      if (status === 204) {
        setResponseStatus(status);
      } else {
        const resJSON = await res.json();
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
            setformLayout(formLayout[objectName]);
            setUISchema(formLayout[objectName]);
            setloading(false);
          });
      }
    };
    fetchData();
    // setloading(false);
  }, []);
  if (responseStatus == 204) {
    return (
      <View style={componentGridStyle}>
        <Text>No data found</Text>
      </View>
    );
  }

  console.log("formLayout setFormLayout : :: : ", formLayout.uischema);

  const submitButtonView =
    appState.global === undefined ||
    (appState.global.tsdApp.activeAction.name === "Create" &&
      appState.global.tsdApp.activeModule.key === 23751) ||
    (appState.global.tsdApp.activeAction.name === "Create" &&
      appState.global.tsdApp.activeModule.key === 156051)
      ? "Add Address"
      : appState.global.tsdApp.activeAction.name === "Create"
      ? "Create"
      : "Search";

  const cancelButtonView =
    appState.global === undefined ||
    (appState.global.tsdApp.activeAction.name === "Create" &&
      appState.global.tsdApp.activeModule.key === 23751) ||
    (appState.global.tsdApp.activeAction.name === "Create" &&
      appState.global.tsdApp.activeModule.key === 156051)
      ? "Add OrderLine"
      : "Cancel";

  // console.log("from json:", buttonView);

  return loading ? null : (
    <ScrollView showsVerticalScrollIndicator={false} style={componentGridStyle}>
      <JsonForm
        setAppState={setAppState}
        appState={appState}
        schema={formLayout}
        // schema={_schema}
        uiSchema={formLayout.uischema}
        _formData={_formData}
        label={label}
        setLayoutConfig={setLayoutConfig}
        // _submitButton={actionStatus === "Search" ? "Search" : submitButtonView}
        // _cancelButton={true}
        _submitButton={submitButtonView}
        _cancelButton={cancelButtonView}
        // _onBeforeSubmit={(e) => {
        //   console.log("*** _onBeforeSubmit ***");
        //   console.log(e);
        // }}
        // _onSubmit={(e) => {
        //   console.log("*** _onSubmit ***");
        //   console.log(e);
        // }}
        // _onError={(e) => {
        //   console.log("*** _onError ***");
        //   console.log(e);
        // }}
        // _onSuccess={(e: any) => {
        //   console.log("e : : : : ", e);
        // }}
        // _onChange={(e) => {
        //   console.log("data changed");
        // }}
      />
      {/* </ScrollView> */}

      {/* <Link
        style={{
          backgroundColor: "blue",
          width: 50,
          height: 50,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
        to="/First"
      >
        Go
      </Link> */}
      {children || (appState && appState[label] && appState[label]?.children)}
    </ScrollView>
  );
};
