/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { appConfig } from "../../examples/TSDigisolPlatform/configs/layouts/dashboardLayout";
import { routes } from "../../examples/TSDigisolPlatform/configs/routes/routesConfig";

const ExpandableComponent = ({ item, onClickFunction, props }: any) => {
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
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(100);

  // console.log("props : : : : ", props);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={ExpandableComponentStyles.header}
      >
        {/* <Link to='/home'> */}
        <Text style={ExpandableComponentStyles.headerText}>
          {item.functionName}
        </Text>
        {/* </Link> */}
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: "hidden",
        }}
      >
        {/*Content under the header of the Expandable List Item*/}
        {item.modules.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={ExpandableComponentStyles.content}
            // TODO : Add generic way to make things work on press of any sub category
            onPress={() => {
              // TODO : How to seprate this part to make it a generic component ? [setAppState is taking indivisual modules one by one]
              // on click of the module tsdApp state will be updated with new activeModule
              // console.log(
              //   "item : : : in Ex component : : : ",
              //   item.tabs[0].actions
              // );
              const filteredAction = item.tabs[0].actions.find(
                ({ actionName }) => actionName === "Search"
              );
              setAppState({
                global: {
                  tsdApp: {
                    activeModule: {
                      name: item.moduleName,
                      key: item.moduleKey,
                    },
                    activeTab: {
                      name: item.tabs[0].tabName,
                      key: item.tabs[0].tabKey,
                    },
                    activeAction: {
                      name: filteredAction.actionName,
                      key: filteredAction.actionKey,
                      endPoint: filteredAction.endPoint,
                      httpMethod: filteredAction.httpMethod,
                      showButton: filteredAction.showButton,
                    },
                  },
                },
              });
              setLayoutConfig(routes["defaultAppConfig"], "copy");
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                padding: 10,
                // TODO : Optimised and add some generalise logic for this
                backgroundColor:
                  appState.global != undefined
                    ? appState.global.tsdApp.activeModule.name ===
                      item.moduleName
                      ? "#b2c560"
                      : ""
                    : item.moduleName === item.moduleName
                    ? "#b2c560"
                    : "",
              }}
            >
              {item.moduleDisplayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ExpandableComponentStyles = StyleSheet.create({
  header: {
    backgroundColor: "#5cabc5",
    padding: 20,
    flex: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    fontStyle: "italic",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 16,
    marginRight: 16,
    elevation: 15,
  },
  text: {
    fontSize: 16,
    color: "white",
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#82bed2",
  },
});

export default ExpandableComponent;
