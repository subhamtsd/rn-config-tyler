/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Grid } from "react-native-easy-grid";
import { prepareSchema } from "../../helper/helper";
import { componentGridStyle } from "../../styles/common";
import { RenderTable } from "./RenderTable";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";

export const ListJsonFormComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
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
    events,
    _childDependency,
  } = props;

  console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log("listJsonFormComponent :::: ---> ", props);

  const initialVal = {
    key: "values",
  };
  // const [data, setdata] = useState(initialVal);
  const [formLayout, setformLayout] = useState(initialVal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormLayout = async () => {
      setLoading(true);
      const res = await fetch(
        `${SERVER_ENDPOINT}v1/schema/singlechildformLayout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "TsdAdmin",
            roleKey: 1,
            moduleKey: _childDependency[`${label}Dependency`].moduleKey,
            tabKey: _childDependency[`${label}Dependency`].tabKey,
            actionName: _childDependency[`${label}Dependency`].actionName,
          }),
        }
      );
      const resJSON = await res.json();
      await prepareSchema(resJSON);
      setformLayout(resJSON);
      console.log("response Json : : : : : listformLayout ---> ", resJSON);
      setLoading(false);
    };
    fetchFormLayout();
  }, []);

  return loading ? null : (
    <View style={componentGridStyle}>
      {/* <Text style={{}}>ListJsonFormComponent *** {label}</Text>
      <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      {/* <Text> AA {appState?.$appState?.loginValues}</Text> */}
      <View>
        <ScrollView>
          <Grid>
            {/* <Text>{noOfColumns}</Text> */}
            <RenderTable
              appState={appState}
              label={label}
              styles={styles}
              children={children}
              setAppState={setAppState}
              layoutConfig={layoutConfig}
              setLayoutConfig={setLayoutConfig}
              getEvents={getEvents}
              events={events}
              noOfColumns={7}
              maxNoOfRows={100}
              dataToRender={formLayout}
              checkBox={false}
              checkBoxButton={false}
              submitButton={"Submit"}
            />
          </Grid>
        </ScrollView>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
