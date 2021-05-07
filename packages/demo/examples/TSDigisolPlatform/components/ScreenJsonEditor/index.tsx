import React, { useState } from "react";
import { Button, Text, View, TouchableOpacity,StyleSheet } from "react-native";
import { componentGridStyle } from "../../styles/common";
// import { JSONEditor } from "../../../../components/JSONEditor";

import PropTypes from "prop-types";
import ace from "brace";
import "brace/mode/json";
import "brace/mode/javascript"
import "brace/theme/monokai";

import { JsonEditor as Editor } from "jsoneditor-react";
import "./ScreenJsonEditor.css";
import { routes } from "../../configs/routes/routesConfig";
import { Bold } from "react-native-web-ui-components";

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

    const [showJSON,setShowJSON] = useState({})

    console.log(`label is ${label}`);
    console.log(getEvents(`${label}-btn-one`, setLayoutConfig));
    const handleChange = (event) => {
        return setShowJSON(event); 
    }
    const onError = () => {
        console.log("error found");
        
    }
    const json = {};

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
                value={{}}
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
                  // setCurrentRow({arrIndex},()=>console.log()
                      // );
                      // setCurrentRow(arrIndex)
                  console.log("required json",showJSON);
                }}
            >
                <Text style={buttonStyle.text}>Show JSON</Text>
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
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})