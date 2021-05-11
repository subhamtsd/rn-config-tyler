import React, { useState } from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { componentGridStyle } from "../../styles/common";
// import { JSONEditor } from "../../../../components/JSONEditor";

import PropTypes from "prop-types";
import ace from "brace";
import "brace/mode/json";
import "brace/mode/javascript";
import "brace/theme/monokai";

import { JsonEditor as Editor } from "jsoneditor-react";
import "./ScreenJsonEditor.css";
import { routes } from "../../configs/routes/routesConfig";
import { Bold } from "react-native-web-ui-components";
import { useEffect } from "react";

export const ScreenJsonEditor = (props: {
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

  const initialJson = {
    tabName: "InventoryItem",
    actionMethod: "PUT",
    functionName: "Presales",
    actionUri: "InvItem/create",
    moduleName: "Inventory",
    actionName: "Create",
    properties: [
      {
        propertyPattern: "[a-zA-Z0-9]",
        propertyDisplayName: "Inventory Organisation Code",
        propertyName: "inventoryOrganizationCode",
        propertyType: "string",
        propertyRequired: "0",
        propertyDisplayType: "",
        apiUri: "",
        apiMethod: "",
      },
      {
        propertyPattern: "[a-zA-Z0-9]",
        propertyDisplayName: "UOM",
        propertyName: "uom",
        propertyType: "string",
        propertyRequired: "0",
        propertyDisplayType: "",
        apiUri: "",
        apiMethod: "",
      },
      {
        propertyPattern: "[a-zA-Z0-9]",
        propertyDisplayName: "Description",
        propertyName: "description",
        propertyType: "string",
        propertyRequired: "0",
        propertyDisplayType: "",
        apiUri: "",
        apiMethod: "",
      },
    ],
  };

  const [showJSON, setShowJSON] = useState(initialJson);
  const [finalJSON, setFinalJSON] = useState({});

  console.log(`label is ${label}`);
  console.log(getEvents(`${label}-btn-one`, setLayoutConfig));

  const handleChange = (event) => {
    return setShowJSON(event);
  };
  const onError = () => {
    console.log("error found");
  };
  const sendJSON = () => {
    fetchData();
  };
  const handleReset = () => {
    setShowJSON({ key: "value" });
  };

  const json = {};

  const fetchData = async () => {
    const res = await fetch(`${SERVER_ENDPOINT}v1/screen/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showJSON),
    });
    const resJSON = await res.json();

    // console.log("objectName : : : : ", objectName);
  };

  return (
    <View style={componentGridStyle}>
      {/*<Button
        testID={`${label}-btn-one`}
        title="HELLO DEMO"
        {...getEvents(
          `${label}-btn-one`,
          setLayoutConfig,
          setAppState,
          appState
        )}
        // onPress={() => {
        //   // setLayoutConfig(routes["edit"], "copy");
        //   console.log("Hello World from Default Component");
        // }}
      ></Button> */}
      <Editor
        ace={ace}
        key={1}
        value={showJSON}
        mode={"tree"}
        modes={["text", "code", "tree", "form", "view"]}
        onChange={handleChange}
        onError={onError}
        theme={"ace/theme/github"}
      />
      {/* <JSONEditor
                json={json}
                onChangeJSON={handleChange}
                onError={onError}
            /> */}
      <TouchableOpacity
        style={buttonStyle.button}
        onPress={() => {
          console.log("requiredJSON", showJSON);

          sendJSON();
        }}
      >
        <Text style={buttonStyle.text}>Show JSON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonStyle.button}
        onPress={() => {
          console.log("reset done", showJSON);

          setShowJSON({ key: "value" });
        }}
      >
        <Text style={buttonStyle.text}>RESET</Text>
      </TouchableOpacity>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

// JSONEditor.propTypes = {
//     json: PropTypes.object,
//     onError: PropTypes.func,
//     onChangeJSON: PropTypes.func,
// };

const buttonStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#0e73ca",
    height: 35,
    width: "180px",
    marginTop: 7,
    marginBottom: 0,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
