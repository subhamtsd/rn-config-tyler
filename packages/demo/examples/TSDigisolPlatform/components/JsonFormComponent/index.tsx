/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import useSafeSetState from "../../helper/useSafeState";
import { routes } from "../../configs/routes/routesConfig";
import { componentGridStyle } from "../../styles/common";
import { JsonForm } from "./JsonForm";
import { prepareSchema } from "../../helper/helper";

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

  const _formData = {
    firstName: "Raj",
    lastName: "Shah",
    stype: "Male",
    date: "11-01-2021",
    username: "raj@1234",
    password: "Raj@123",
    "Confirm password": "Raj@123",
    languages: ["Java", "C"],
    roleName: ["admin"],
    recievemsgs: true,
  };

  const [_schema, setSchema] = useSafeSetState({
    type: "object",
    required: [
      "firstName",
      "lastName",
      "stype",
      "date",
      "username",
      "password",
      "Confirm password",
      "languages",
      "recievemsgs",
    ],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
    },
  });

  // const languages = ["Java", "Python", "C"];

  const _uiSchema = {
    roleName: {
      "ui:title": "Role Name",
      "ui:placeholder": "Please select your Role",
      "ui:widget": "select",
    },
    // submitButton: false,
  };

  // // form schema
  // const _uiSchema = {
  //   languages: {
  //     "ui:title": "Languages Known",
  //     "ui:options": {
  //       addable: false,
  //       orderable: false,
  //       removable: false,
  //       minimumNumberOfItems: languages.length,
  //     },
  //     items: {
  //       // The `ui:iterate` allows you to define the uiSchema for each item of the array.
  //       // The default is to have a list of TextInput.
  //       "ui:iterate": (i: React.ReactText, { values }: any) => ({
  //         "ui:title": false,
  //         "ui:widget": "checkbox",
  //         "ui:widgetProps": {
  //           text: languages[i],
  //           value: languages[i],
  //           checked: (values.languages || []).includes(languages[i]),
  //         },
  //       }),
  //     },
  //   },
  //   recievemsgs: {
  //     "ui:title": "Are you okay if you recieve emails from our side?",
  //     "ui:widget": "radio",
  //     "ui:widgetProps": {
  //       style: { backgroundColor: "lightgrey" },
  //     },
  //     "ui:containerProps": {
  //       style: { paddingTop: 10 },
  //     },
  //   },
  //   stype: {
  //     "ui:title": "Gender",
  //     "ui:placeholder": "Please select your gender",
  //     "ui:widget": "select",
  //   },
  //   date: {
  //     "ui:widget": "date",
  //     "ui:title": "Select your Birthdate ",
  //   },
  //   upload: {
  //     "ui:widget": "file",
  //     "ui:title": "Upload your documents",
  //   },
  //   submitButton: false,
  //   age: {
  //     "ui:widget": "range",
  //   },
  //   //   "background-color":{
  //   //     'ui:widget':"ColorPicker"
  //   // },
  // };

  const initialFormSchema = {
    type: "object",
    required: ["keyName"],
    properties: {
      keyName: { type: "string" },
    },
    uischema: {},
  };

  const [formLayout, setformLayout] = useState(initialFormSchema);
  const [uiSchema, setUISchema] = useState(_uiSchema);
  const [responseStatus, setResponseStatus] = useState(200);

  useEffect(() => {
    const fetchData = async () => {
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
          });
      }

      // setformLayout(resJSON[objectName]);
    };
    fetchData();
  }, []);

  if (responseStatus === 204) {
    return (
      <View style={componentGridStyle}>
        <Text>No data found</Text>
      </View>
    );
  }

  console.log("formLayout setFormLayout : :: : ", formLayout.uischema);

  return (
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
        _submitButton={true}
        _cancelButton={true}
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
