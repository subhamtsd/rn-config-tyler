/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import useSafeSetState from "../../../helper/useSafeState";
import { componentGridStyle } from "../../../styles/common";
import { JsonForm } from "../../JsonFormComponent/JsonForm";
import { prepareSchema } from "../../../helper/helper";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";

export const CreateOrderlineAddressComponent = (props: {
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
  _childDependency: any;
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
    _childDependency,
  } = props;

  console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));

  // console.log("DISPATCH : : : : ", dispatch);
  const activeTabName =
    appState?.$global?.tsdApp?.activeTab?.name || "CreateOrder";
  const _formData =
    appState?.$global?.tsdApp?.createComponent[activeTabName] || {};

  const [loading, setloading] = useState(true);

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

  // const initialFormSchema = {
  //   type: "object",
  //   required: ["keyName"],
  //   properties: {
  //     keyName: { type: "string" },
  //   },
  //   uischema: {},
  // };

  const initialFormSchema = {};

  const [formLayout, setformLayout] = useState(initialFormSchema);
  const [responseStatus, setResponseStatus] = useState(200);

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
          moduleKey: _childDependency[`${label}Dependency`].moduleKey,
          tabKey: _childDependency[`${label}Dependency`].tabKey,
          actionName: _childDependency[`${label}Dependency`].actionName,
          userId: "TsdAdmin",
        }),
      });

      const status = res.status;
      console.log("status : :: : ", status);
      if (status === 204) {
        setResponseStatus(status);
      } else {
        const resJSON = await res.json();
        // console.log(
        //   "response Json : : : : : orderLineAddressformLayout ---> ",
        //   resJSON
        // );
        prepareSchema(resJSON).then((schemaJson) => {
          const firstParent = Object.getOwnPropertyNames(schemaJson)[0];
          // console.log("SCHEMA JSON UPDATED IN RENDER TABLE :: ", schemaJson);
          schemaJson[firstParent].type = "object";
          setformLayout(schemaJson[firstParent]);
          setloading(false);
          // console.log("response Json : : : : : formLayout ---> ", resJSON);
        });

        //
        //   });
      }
    };
    fetchData();
    // setloading(false);
  }, []);

  // if (loading) {
  //   return (
  //     <View style={componentGridStyle}>
  //      <ActivityIndicator />
  //     </View>
  //   );
  // }

  if (responseStatus == 204) {
    return (
      <View style={componentGridStyle}>
        <Text>No data found</Text>
      </View>
    );
  }

  console.log("formLayout orderlineaddressFormLayout : :: : ", formLayout);

  // console.log("from json:", buttonView);

  return loading ? null : (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={componentGridStyle}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#0d47a1",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {UItitle}
        </Text>
        <JsonForm
          setAppState={setAppState}
          appState={appState}
          schema={formLayout}
          // schema={_schema}
          uiSchema={formLayout.uischema}
          _formData={_formData}
          setLayoutConfig={setLayoutConfig}
          _submitButton={"Save"}
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
    </View>
  );
};
