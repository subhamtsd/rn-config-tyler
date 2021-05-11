/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
// import { JsonForm } from "../../../../components/json-form/JsonForm";
// import { useSelector, useDispatch } from "react-redux";
import useSafeSetState from "../../helper/useSafeState";
import { routes } from "../../configs/routes/routesConfig";
import { componentGridStyle } from "../../styles/common";
import { JsonForm } from "./JsonForm";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { parseFormData } from "../../helper/helper";
import { prepareSchema } from "../../helper/helper";

export const EditComponent = (props: {
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

  const _formData = parseFormData(
    appState.global.tsdApp.viewComponent[appState.global.tsdApp.activeTab.name]
  );

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
      // stype: {
      //   enum: ["Male", "Female", "Others"],
      //   type: "string",
      // },
      // date: {
      //   format: "date",
      //   type: "string",
      //   title: "Date",
      // },
      // username: { type: "string" },
      // password: { type: "string" },
      // "Confirm password": { type: "string" },
      // languages: {
      //   type: "array",
      //   items: {
      //     type: "string",
      //   },
      // },
      // recievemsgs: { type: "boolean" },
      // upload: {
      //   format: "data-url",
      //   type: "string",
      // },
      // age: {
      //   type: "integer",
      //   title: "Age",
      // },
    },
  });

  const languages = ["Java", "Python", "C"];

  // // form schema
  const _uiSchema = {
    languages: {
      "ui:title": "Languages Known",
      "ui:options": {
        addable: false,
        orderable: false,
        removable: false,
        minimumNumberOfItems: languages.length,
      },
      items: {
        // The `ui:iterate` allows you to define the uiSchema for each item of the array.
        // The default is to have a list of TextInput.
        "ui:iterate": (i: React.ReactText, { values }: any) => ({
          "ui:title": false,
          "ui:widget": "checkbox",
          "ui:widgetProps": {
            text: languages[i],
            value: languages[i],
            checked: (values.languages || []).includes(languages[i]),
          },
        }),
      },
    },
    recievemsgs: {
      "ui:title": "Are you okay if you recieve emails from our side?",
      "ui:widget": "radio",
      "ui:widgetProps": {
        style: { backgroundColor: "lightgrey" },
      },
      "ui:containerProps": {
        style: { paddingTop: 10 },
      },
    },
    stype: {
      "ui:title": "Gender",
      "ui:placeholder": "Please select your gender",
      "ui:widget": "select",
    },
    date: {
      "ui:widget": "date",
      "ui:title": "Select your Birthdate ",
    },
    upload: {
      "ui:widget": "file",
      "ui:title": "Upload your documents",
    },
    submitButton: false,
    age: {
      "ui:widget": "range",
    },
    //   "background-color":{
    //     'ui:widget':"ColorPicker"
    // },
  };

  const initialFormSchema = {
    type: "object",
    required: ["keyName"],
    properties: {
      keyName: { type: "string" },
    },
  };

  const [formLayout, setformLayout] = useState(initialFormSchema);

  useEffect(() => {
    let resJson;
    let preparedSchema;
    const fetchData = async () => {
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
              ? appState.global.tsdApp.editComponent.action != undefined
                ? appState.global.tsdApp.editComponent.action.name
                : "Edit"
              : "Edit",
        }),
      });
      const resJSON = await res.json();
      // console.log("resJson ::::: edit component---> ", resJSON);

      // const resJSON = await res.json();
      // console.log("response Json : : : : : EditformLayout ---> ", resJSON);
      prepareSchema(resJSON)
        .then((schemaJson) => {
          // console.log("SchemaJson edit updated : : :: ", schemaJson);
          return schemaJson;
        })
        .then((formLayout) => {
          // console.log("Schema edit returned : : : ", formLayout);
          // console.log("edit component appstate:", appState.global);
          const objectName =
            appState.global != undefined
              ? appState.global.tsdApp.editComponent.action.name +
                appState.global.tsdApp.activeTab.name +
                "Schema"
              : "EditCreateOrdersSchema";

          // console.log("objectName : : : : ", objectName);
          setformLayout(formLayout[objectName]);
          // setloading(false);
        });

      // console.log("objectName : : : : ", objectName);
    };
    fetchData();
  }, []);

  // console.log("formData  : : :  in edit component : : : ", _formData);

  // console.log("FormLayout Json in Edit Component : : : ", formLayout);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={componentGridStyle}>
      <JsonForm
        setAppState={setAppState}
        appState={appState}
        schema={formLayout}
        // schema={_schema}
        _submitButton={"UPDATE"}
        _cancelButton={true}
        uiSchema={formLayout.uischema}
        _formData={_formData}
        label={label}
        setLayoutConfig={setLayoutConfig}
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
