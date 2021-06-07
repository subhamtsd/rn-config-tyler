/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import { createBrowserHistory } from "history";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Form from "react-native-web-jsonschema-form";
import { UIProvider } from "react-native-web-ui-components";
import { getEvents } from "../../layout";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { useState } from "react";
import { useEffect } from "react";
// import useSafeSetState from "../../helper/useSafeState";
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
  _onChange = noOp,
  _formData = {}, // This data
  _onClose = noOp,
  schema = {}, // This data
  uischema = {}, // this data
  label = "",
  _submitButton = false,
  _cancelButton = false,
  setLayoutConfig = {},
  ...props
}): AnyRecord => {
  // TODO: show loading indicator based on loading value
  // const [loading, setLoading] = useSafeSetState(false);
  // // TODO: show exceptions as errors
  // const [exception, setException] = useSafeSetState(null);
  // // TODO: show message
  // const [message, setMessage] = useSafeSetState(null);
  // // TODO: submit formData to ideal connected endpoint
  // const [formData, setFormData] = useSafeSetState({
  //   ..._formData,
  //   ...appState?.global[label]?.form?.formData,
  // });
  const [formData, setFormData] = useState(_formData);
  const [uiSchema, setUiSchema] = useState(uischema);
  const [formSchema, setFormSchema] = useState(schema);

  // console.log("AnyRecord : : : : ", _onBeforeSubmit);

  // const onError = (event) => {
  //   console.log("*** onError ***");
  //   console.log(event);
  //   const { exceptions } = event.params;
  //   const exceptionsMessages = exceptions.map((messages) =>
  //     messages.join(", ")
  //   );
  //   _onError(event);
  //   // setLoading(false);
  //   // if (exceptionsMessages.length) {
  //   //   setException(exceptionsMessages.join("\n"));
  //   // }
  // };
  // const onErrorOk = () => setException(null);
  // form data mutator
  // console.log("formData in jsonForm of Edit : : : ", formData);
  const [errorSchema, setErrorSchema] = useState({});
  const validate = (property, value) => {
    console.log(property, "   ", value);
    // if (
    //   (value == null || value == "" || value == undefined) &&
    //   formSchema.required.find(property)
    // ) {
    throw new Error("Mandatory Property");
    // }
  };
  const fetchData = async (keyName: string | number, body: {}) => {
    const res = await fetch(
      `${SERVER_ENDPOINT}${formSchema?.["properties"]?.[keyName]?.dropdownLoadApiURL}`,
      {
        method: formSchema?.["properties"]?.[keyName]?.dropdownLoadApiMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const resJSON = await res.json();
    if (formSchema?.["properties"]?.[keyName]?.displayType == "dropdown") {
      const value = [];
      for (const data of resJSON.response) {
        value.push(data[keyName]);
      }
      return value;
    } else if (formSchema["properties"][keyName]?.format == "date") {
      return {
        minDate: resJSON.response?.[0]?.startDate,
        maxDate: resJSON.response?.[resJSON.response.length - 1]?.startDate,
      };
    }
  };
  const cleanProperty = (propertyName, newFormData, newUiSchema) => {
    if (newFormData[propertyName]) {
      formSchema?.["properties"]?.[
        propertyName
      ]?.nextDependent?.dependentField?.forEach((property) => {
        cleanProperty(property.fieldName, newFormData, newUiSchema);
      });
    }
    delete newFormData[propertyName];
    if (formSchema?.["properties"]?.[propertyName]?.displayType == "dropdown") {
      delete newUiSchema[propertyName]["ui:enum"];
      delete newUiSchema[propertyName]["ui:enumName"];
    }
    if (formSchema?.["properties"]?.[propertyName]?.format == "date") {
      delete newUiSchema[propertyName]["ui:minDate"];
      delete newUiSchema[propertyName]["ui:maxDate"];
    }
    newUiSchema[propertyName]["ui:disabled"] = true;
  };

  const onChange = async (event) => {
    const { name, value } = event.params;
    // try {
    //   validate(name, value);
    // } catch (e) {
    //   const newErrorSchema = cloneDeep(errorSchema);
    //   newErrorSchema[name] = [];
    //   newErrorSchema[name].push(e.msg);
    //   setErrorSchema(errorSchema);
    //   return;
    // }
    // console.log(name, "  ", value, "  ", values);
    // setFormData({ ...formData, [name]: value });
    //   validate(name, value);
    const newFormData = { ...formData, [name]: value };
    if (value == null || value == "") {
      delete newFormData[name];
    }
    const newUiSchema = { ...uiSchema };
    formSchema?.["properties"]?.[name]?.nextDepended?.dependentField?.forEach(
      (property) => {
        cleanProperty(property.fieldName, newFormData, newUiSchema);
      }
    );
    setFormData(newFormData);
    if (value == null || value == "") {
      setUiSchema(newUiSchema);
    } else if (
      formSchema?.["properties"]?.[name]?.nextDependent?.dependentField
    ) {
      await Promise.all(
        formSchema?.["properties"]?.[name]?.nextDependent?.dependentField?.map(
          async (property) => {
            let flag = true;
            const body = {};
            formSchema?.["properties"]?.[
              property.fieldName
            ]?.dependency?.forEach((propertyName) => {
              if (
                newFormData[propertyName] == undefined ||
                newFormData[propertyName] == "" ||
                newFormData[propertyName] == null
              ) {
                flag = false;
                return;
              }
              body[propertyName] = newFormData[propertyName];
            });
            if (flag) {
              const data = await fetchData(property.fieldName, body);
              if (
                formSchema?.["properties"]?.[property.fieldName]?.displayType ==
                "dropdown"
              ) {
                newUiSchema[property.fieldName]["ui:enum"] = data;
                newUiSchema[property.fieldName]["ui:enumName"] = data;
              }
              if (
                formSchema?.["properties"]?.[property.fieldName]?.format ==
                "date"
              ) {
                newUiSchema[property.fieldName]["ui:minDate"] = data["minDate"];
                newUiSchema[property.fieldName]["ui:maxDate"] = data["maxDate"];
              }
              newUiSchema[property.fieldName]["ui:disabled"] = false;
            }
          }
        )
      );
      setUiSchema(newUiSchema);
    }
  };
  useEffect(() => {
    const newUiSchema = { ...uiSchema };
    Promise.all(
      Object.keys(formSchema?.["properties"]).map(async (name) => {
        if (
          (formSchema?.["properties"]?.[name]?.dependency?.length == 0 ||
            formSchema?.["properties"]?.[name]?.dependency == undefined) &&
          formData[name] &&
          formData[name] != "" &&
          formSchema?.["properties"]?.[name]?.nextDependent?.dependentField
        ) {
          await Promise.all(
            formSchema?.["properties"]?.[
              name
            ]?.nextDependent?.dependentField?.map(async (property) => {
              let flag = true;
              const body = {};
              formSchema?.["properties"]?.[
                property.fieldName
              ]?.dependency?.forEach((propertyName) => {
                if (
                  formData[propertyName] == undefined ||
                  formData[propertyName] == "" ||
                  formData[propertyName] == null
                ) {
                  flag = false;
                  return;
                }
                body[propertyName] = formData[propertyName];
              });
              if (flag) {
                const data = await fetchData(property.fieldName, body);
                if (
                  formSchema?.["properties"]?.[property.fieldName]
                    ?.displayType == "dropdown"
                ) {
                  newUiSchema[property.fieldName]["ui:enum"] = data;
                  newUiSchema[property.fieldName]["ui:enumName"] = data;
                }
                if (
                  formSchema?.["properties"]?.[property.fieldName]?.format ==
                  "date"
                ) {
                  newUiSchema[property.fieldName]["ui:minDate"] =
                    data["minDate"];
                  newUiSchema[property.fieldName]["ui:maxDate"] =
                    data["maxDate"];
                }
                newUiSchema[property.fieldName]["ui:disabled"] = false;
              }
            })
          );
        }
        setUiSchema(newUiSchema);
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
          color: "blue",
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
          //   style={{ margin: 30 }}
          formData={formData}
          schema={formSchema}
          uiSchema={uiSchema}
          errorSchema={errorSchema}
          submitButton={_submitButton}
          cancelButton={_cancelButton}
          filterEmptyValues={true}
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
