/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Form from "react-native-web-jsonschema-form";
import { UIProvider } from "react-native-web-ui-components";
import { getEvents } from "../../layout";
import { useEffect } from "react";
import { formDependency, formCleanProperty } from "../../helper/helper";

// export { useSafeSetState };
const noOp = (): void => {};
export const JsonForm = ({
  formId = "form",
  setAppState,
  appState,
  _onBeforeSubmit = noOp,
  _onSuccess = noOp,
  _onError = noOp,
  _onSubmit = noOp,
  _formData = {}, // This data
  _onClose = noOp,
  formSchema = {}, // This data
  uischema = {}, // this data
  label = "",
  _submitButton = true,
  _cancelButton = true,
  setLayoutConfig = {},
  ...props
}): AnyRecord => {
  // TODO: show loading indicator based on loading value
  // TODO: show exceptions as errors
  //   const [exception, setException] = useSafeSetState(null);
  // TODO: show message
  //   const [message, setMessage] = useSafeSetState(null);
  // TODO: submit formData to ideal connected endpoint

  // TODO:
  // const [formData, setFormData] = useSafeSetState({
  //   ...appState?.global?.tsdApp?.formData?.[label], // FIXME: get this based on component property
  // });
  const [formData, setFormData] = useState(_formData);
  const [uiSchema, setUiSchema] = useState(uischema);

  // console.log("_formDatA :::: ", formData);
  // console.log("_formSchema :::: ", formSchema);
  // console.log("_uiSchema :::: ", uiSchema);
  // console.log("jsonformcomponent create", label);
  // console.log("AnyRecord : : : : ", _onBeforeSubmit);

  //   const onError = (event) => {
  //     console.log("*** onError ***");
  //     console.log(event);
  //     const { exceptions } = event.params;
  //     const exceptionsMessages = exceptions.map((messages) =>
  //       messages.join(", ")
  //     );
  //     _onError(event);
  //     // setLoading(false);
  //     // if (exceptionsMessages.length) {
  //     //   setException(exceptionsMessages.join("\n"));
  //     // }
  //   };

  //   const onErrorOk = () => setException(null);

  //   const stateAbbreviationRegex = /^[A-Z]{2}$/;
  //   const [errorSchema, setErrorSchema] = useState({});

  //   const validate = (values) => {
  //     const errorSchema = {};

  //     console.log("Values :::: ", values.stateAbbreviation);

  //     if (!stateAbbreviationRegex.test(values.stateAbbreviation)) {
  //       errorSchema.stateAbbreviation = [];
  //       // if (!values.stateAbbreviation) {
  //       //   errorSchema.stateAbbreviation.push("State cannot be empty.");
  //       // }
  //       errorSchema.stateAbbreviation.push(
  //         "State must have two uppercase letters."
  //       );
  //     }
  //     console.log("ERROR SCHEMA IN JSON FORM ::::: ", errorSchema);
  //     setErrorSchema(errorSchema);
  //   };
  const onChange = async (event) => {
    const { name, value } = event.params;
    const newFormData = { ...formData, [name]: value };
    if (value == null || value == "") {
      delete newFormData[name];
    }
    const newUiSchema = { ...uiSchema };
    formSchema?.["properties"]?.[name]?.nextDepended?.dependentField?.forEach(
      (property) => {
        formCleanProperty(
          property.fieldName,
          newFormData,
          newUiSchema,
          formSchema
        );
      }
    );
    await formDependency(name, newFormData, newUiSchema, formSchema);
    setFormData(newFormData);
    setUiSchema(newUiSchema);
  };
  useEffect(() => {
    const newUiSchema = { ...uiSchema };
    Promise.all(
      Object.keys(formSchema?.["properties"]).map(async (name) => {
        await formDependency(name, formData, newUiSchema, formSchema);
      })
    ).then(() => {
      setUiSchema(newUiSchema);
    });
  }, []);

  const theme = {
    input: {
      focused: StyleSheet.create({
        border: {
          borderColor: "#5cabc5",
          borderWidth: 2,
          borderStyle: "solid",
        },
        background: {
          backgroundColor: "white",
        },
        text: {
          fontSize: 14,
          color: "#545454",
        },
        placeholder: {
          color: "#FAFAFA",
        },
        opacity: {
          opacity: 1,
        },
        selected: {
          color: "#5cabc5",
        },
        unselected: {
          color: "#FAFAFA",
        },
      }),
    },
  };
  // const onSubmit = async (event) => {
  //   await onBeforeSubmit(event);
  //   setLoading(true);
  //   const { values } = event.params;
  //   _onSubmit(event);
  //   // const mutation = getMutation({
  //   //   values,
  //   //   controller,
  //   //   action,
  //   // });
  //   // return mutate({ client, mutation }).catch((err) => {
  //   //   throw toErrorSchema(err);
  //   // });
  // };
  const ThemeWrapper = ({ children }) => {
    return (
      <UIProvider
        theme={theme}
        history={Platform.OS === "web" ? createBrowserHistory() : {}}
      >
        {children}
      </UIProvider>
    );
  };

  const languages = ["Java", "Python", "C"]; //data example for checkbox poc

  return (
    <View>
      <ThemeWrapper>
        {/* <MainContainer
        style={{
          padding: "2%",
          marginHorizontal: 10,
          marginVertical: 10,
          minHeight: 10,
        }}
      > */}
        {/* <Text>{label}</Text> */}
        <Form
          // style={{ margin: 30 }}

          formData={formData}
          schema={formSchema}
          uiSchema={uiSchema}
          onChange={onChange}
          filterEmptyValues={true}
          // TODO : FOR ERROR SCHEMA POC
          // schema={{
          //   type: "object",
          //   properties: {
          //     stateAbbreviation: { type: "string", required: true },
          //   },
          // }}
          // uiSchema={{
          //   stateAbbreviation: {
          //     "ui:widgetProps": {
          //       mask: "aa",
          //     },
          //   },
          // }}

          // TODO: FOR CHECKBOX UI POC
          // schema={{
          //   type: "object",
          //   properties: {
          //     languages: {
          //       type: "array",
          //       items: {
          //         type: "string",
          //       },
          //     },
          //   }
          // }}

          submitButton={_submitButton}
          cancelButton={_cancelButton}
          // TODO : WHEN TEST CHECKBOX uncomment next 2 line and comment above line
          // onChange={_onChange}
          buttonPosition="center"
          {...getEvents(
            `${label}-form`,
            setLayoutConfig,
            setAppState,
            appState,
            label
          )}
        />
        {/* </MainContainer> */}
      </ThemeWrapper>
    </View>
  );
};
