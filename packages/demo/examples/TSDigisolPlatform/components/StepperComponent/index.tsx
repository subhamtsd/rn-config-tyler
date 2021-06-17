/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const StepperComponent = ({
  name,
  labelID,
  appState,
  label,
  setAppState,
  setLayoutConfig,
  getEvents,
  bgColor = "#2196f3",
  isDisable = false,
  disabledColor = "grey",
  progressBarShow = false,
  childNode = [],
}) => {
  return (
    <View style={{ flexDirection: "row", borderWidth: 0 }}>
      <TouchableOpacity
        testID={`${label}-${labelID}`}
        disabled={isDisable}
        {...getEvents(`${label}-${labelID}`, setLayoutConfig, setAppState)}
      >
        <View
          style={{
            width: 50,
            height: 25,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "grey",
            backgroundColor: isDisable ? disabledColor : bgColor,
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: "#c5c5c5",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 8, fontWeight: "bold" }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
      {
        // bottom line then circle on finding child node
        childNode.length != 0 ? (
          <View style={{ borderWidth: 0, maxWidth: 5, marginRight: -4 }}>
            <View style={{ borderWidth: 0, maxWidth: 5 }}>
              <View
                style={{
                  borderWidth: 0,
                  marginTop: 25,
                  width: 3,
                  height: 20,
                  marginLeft: -13,
                  backgroundColor: "#2196f3",
                }}
              ></View>
            </View>
            <View style={{ flexDirection: "row" }}>
              {childNode.map(
                (step: {
                  labelID: any;
                  name: any;
                  event: { onPress: { style: { disabledColor: any } } }[];
                  nextActive: { hasNextActiveSteps: any };
                  dependent: { hasDependent: any; dependentList: any };
                }) => {
                  return (
                    <View style={{ borderWidth: 0, marginLeft: -20 }}>
                      <StepperComponent
                        appState={appState}
                        label={label}
                        getEvents={getEvents}
                        setLayoutConfig={setLayoutConfig}
                        setAppState={setAppState}
                        labelID={step.labelID}
                        name={step.name} //TODO :: subham has to check this
                        bgColor={step.event[0].onPress.style.activeColor}
                        isDisable={step.event[0].onPress.style.isDisabled}
                        disabledColor={
                          step.event[0].onPress.style.disabledColor
                        }
                        progressBarShow={step.nextActive.hasNextActiveSteps}
                        childNode={
                          step.dependent.hasDependent
                            ? step.dependent.dependentList
                            : []
                        }
                      />
                    </View>
                  );
                }
              )}
            </View>
          </View>
        ) : null
      }
      {
        // For rendering the Left blue line
        progressBarShow ? (
          <View
            style={{
              // borderWidth: 1,
              marginTop: 10,
              width: 50,
              height: 3,
              backgroundColor: "#2196f3",
            }}
          ></View>
        ) : (
          <View />
        )
      }
    </View>
  );
};
