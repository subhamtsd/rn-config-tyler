/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Form from "react-native-web-jsonschema-form";
import { UIProvider } from "react-native-web-ui-components";
import { getEvents } from "../../configs/events/eventConfig";
import useSafeSetState from "../../helper/useSafeState";
export { useSafeSetState };
const noOp = (): void => {};
export const JsonForm = ({
  formId = "form",
  setAppState,
  appState,
  _onBeforeSubmit = noOp,
  _onSuccess = noOp,
  _onError = noOp,
  _onSubmit = noOp,
  _onChange = noOp,
  _formData = {}, // This data
  _onClose = noOp,
  schema = {}, // This data
  uiSchema = {}, // this data
  label = "",
  _submitButton = false,
  _cancelButton = false,
  setLayoutConfig = {},
  ...props
}): AnyRecord => {
  // TODO: show loading indicator based on loading value
  const [loading, setLoading] = useSafeSetState(false);
  // TODO: show exceptions as errors
  const [exception, setException] = useSafeSetState(null);
  // TODO: show message
  const [message, setMessage] = useSafeSetState(null);
  // TODO: submit formData to ideal connected endpoint
  const [formData, setFormData] = useSafeSetState({
    ..._formData,
    ...appState?.$global[label]?.form?.formData, // FIXME: get this based on component property
  });

  console.log("AnyRecord : : : : ", _onBeforeSubmit);

  const onError = (event) => {
    console.log("*** onError ***");
    console.log(event);
    const { exceptions } = event.params;
    const exceptionsMessages = exceptions.map((messages) =>
      messages.join(", ")
    );
    _onError(event);
    // setLoading(false);
    // if (exceptionsMessages.length) {
    //   setException(exceptionsMessages.join("\n"));
    // }
  };
  const onErrorOk = () => setException(null);
  const stateAbbreviationRegex = /^[A-Z]{2}$/;
  // const errorSchema = {};
  const [errorSchema, setErrorSchema] = useState({});

  const validate = (values) => {
    const errorSchema = {};

    console.log("Values :::: ", values.stateAbbreviation);

    if (!stateAbbreviationRegex.test(values.stateAbbreviation)) {
      errorSchema.stateAbbreviation = [];
      // if (!values.stateAbbreviation) {
      //   errorSchema.stateAbbreviation.push("State cannot be empty.");
      // }
      errorSchema.stateAbbreviation.push(
        "State must have two uppercase letters."
      );
    }
    console.log("ERROR SCHEMA IN JSON FORM ::::: ", errorSchema);
    setErrorSchema(errorSchema);

    // In case you have multiple validators.
    // if (Object.keys(errorSchema).length) {
    //   throw errorSchema;
    // }
  };
  // form data mutator
  const onChange = (event) => {
    const { values } = event.params;
    // console.log("Hello this is values ib form :::: ", values);
    // validate(values);
    setFormData({
      ...formData,
      [event.params.name]: event.params.value,
    });
  };
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
          schema={schema}
          uiSchema={uiSchema}
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
          errorSchema={errorSchema}
          submitButton={_submitButton}
          cancelButton={_cancelButton}
          onChange={onChange}
          buttonPosition="center"
          {...getEvents(
            `${label}-form`,
            setLayoutConfig,
            setAppState,
            appState
          )}
        />
        {/* </MainContainer> */}
      </ThemeWrapper>
    </View>
  );
};
