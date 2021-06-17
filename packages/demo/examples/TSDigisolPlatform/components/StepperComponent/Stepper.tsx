/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-key */
import * as React from "react";
import { View } from "react-native";
import { data } from "./data";
import { StepperComponent } from "./index";

export const Stepper = ({
  label,
  setAppState,
  setLayoutConfig,
  getEvents,
  appState,
}) => {
  return (
    <View
      style={{
        borderWidth: 0,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 20,
        margin: 5,
        // width: "70%",
        // height: "40%",
      }}
    >
      {data.map((step) => {
        return (
          <View>
            <StepperComponent
              setLayoutConfig={setLayoutConfig}
              setAppState={setAppState}
              appState={appState}
              label={label}
              getEvents={getEvents}
              labelID={step.labelID}
              name={step.name}
              bgColor={step.event[0].onPress.style.activeColor}
              isDisable={step.event[0].onPress.style.isDisabled}
              disabledColor={step.event[0].onPress.style.disabledColor}
              progressBarShow={step.nextActive.hasNextActiveSteps}
              childNode={
                step.dependent.hasDependent ? step.dependent.dependentList : []
              }
            />
          </View>
        );
      })}
    </View>
  );
};
