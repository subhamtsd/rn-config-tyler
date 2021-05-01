import React, { createElement, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { AppProps, UXColumnProps } from "../AppProps";
import { JSONEditor } from "../components/JSONEditor";
import { styles } from "../styles";
import {
  setAppState as sa,
  setLayoutConfig as sl,
  setGlobalState as sg,
} from "./helpers";
// All component which will be rendered

// ******************************************************************** //

// render a grid layout as per the configuration
export const App = (props: AppProps) => {
  const [config, setConfig] = useState(props?.config);
  const routes = props?.routes;
  const componentsSet = props?.config?.componentsSet;
  // const history = useHistory();
  const getInitEvents = props?.getInitEvents ? props?.getInitEvents : () => {};
  const getEvents = props?.getEvents ? props?.getEvents : () => {};

  // TODO: add ability to add/remove labels and row/columns new from layout config
  const [appState, _setAppState] = useState({
    ui: {},
    children: {},
    props: {},
    $global: {},
  });

  let tailwind = (s) => {
    return {};
  };
  if (props?.config?.tw) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tailwind = require("tailwind-rn");
  }

  // logic to update layout config (which is stored in config state var)
  const setLayoutConfig = (_config, format = "none") => {
    sl(setConfig, config, _config, format);
  };

  // logic to update app state
  const setAppState = (newAppState, format = "none") => {
    sa(_setAppState, appState, newAppState, format);
  };

  // // logic to update global state
  // const setGlobalState = (newAppState, format = "none") => {
  //   sg(_setGlobalState, globalState, newAppState, format);
  // };

  // pick from pre-loaded components and render properly, renders each component at column level
  const UXColumn = (colProps: UXColumnProps) => {
    const {
      label,
      key,
      idx,
      children,
      passProps,
      appState,
      setAppState,
      setLayoutConfig,
      colClass,
    } = colProps;
    console.log(`label is ${label}`);
    const colSection = createElement(
      label &&
        appState[label] &&
        appState[label]?.ui &&
        componentsSet[appState[label]?.ui]
        ? componentsSet[appState[label]?.ui]
        : componentsSet[idx],
      {
        ...passProps,
        appState,
        colClass,
        routes,
        key,
        setAppState,
        ...styles,
        label,
        setLayoutConfig,
        getEvents,
        getInitEvents,
      },
      appState[label]?.children || children
    );
    return colSection;
  };

  //  overall routing engine
  const UX = (layoutConfig) => {
    // window.appState = appState;
    // window.setAppState = setAppState;
    const gridSection = (rows, setLayoutConfig) => {
      // builds the columns
      const colsSection = (rId, cols) => {
        let rowJsx = [];
        rowJsx = Object.keys(cols).map((cId, colNo) => {
          if (cId === "rowConfig") {
            return null;
          } else if (cols[cId].idx) {
            const {
              idx,
              label,
              colSize,
              props,
              children,
              colStyle,
              colClass,
            } = cols[cId];

            const passProps = {
              ...props,
              ...cols[cId],
              idx,
              label,
              children,
              colSize,
              colClass,
              colStyle: { ...colStyle, ...colClass },
              appState,
              setAppState,
              setLayoutConfig,
              getEvents,
            };

            console.log(`colClass is `, colClass);
            return (
              <Col
                size={colSize}
                style={{ ...colStyle, ...tailwind(colClass) }}
                key={`${rId}-${colNo}`}
              >
                <UXColumn colClass={colClass} {...passProps} />
              </Col>
            );
          }
          if (cols[cId].layout) {
            // console.log(cols[cId]?.layout.colConfig?.colSize);

            return (
              <Col
                key={`${rId}-${colNo}`}
                size={
                  cols[cId].layout?.layoutConfig?.size ||
                  cols[cId]?.layout.colConfig?.colSize
                }
                style={{
                  borderWidth: 0,
                  borderColor: "blue",
                  ...cols[cId].layout?.colConfig?.colStyle,
                  ...tailwind(cols[cId].layout?.colClass),
                }}
              >
                <Grid style={tailwind(cols[cId]?.colClass)}>
                  {UX(cols[cId].layout)}
                </Grid>
              </Col>
            );
          }
        });
        // console.log(`rowSize is ${rowSize}`);
        return rowJsx;
      };

      let gridJsx = [];
      if (rows && Object.keys(rows)) {
        gridJsx = Object.keys(rows).map((rId) => {
          if (rId === "layoutConfig") {
            return null;
          } else {
            console.log(rows[rId]);

            return (
              <Row
                key={`${rId}`}
                size={rows[rId] && rows[rId][0]?.size}
                style={{
                  borderColor: "gray",
                  ...rows[rId]?.colStyle,
                  ...tailwind(rows?.layoutConfig?.layoutClass),
                }}
              >
                {colsSection(rId, rows[rId])}
              </Row>
            );
          }
        });
        return (
          <Col style={{ borderWidth: 0, borderColor: "red" }}>{gridJsx}</Col>
        ); /// return all rows in layout
      } else {
        console.log(
          "ERROR  :::: Possibly some routing label is incorrect in your routes configuration."
        );
      }
    };

    return (
      <Col
        style={{
          ...layoutConfig?.colConfig?.colStyle,
          ...tailwind(layoutConfig?.colClass),
        }}
      >
        {gridSection(layoutConfig, setLayoutConfig)}
      </Col>
    );
  };

  // console.log(layoutConfig);
  if (
    !config?.layout ||
    !(componentsSet && Object.keys(componentsSet).length > 0)
  ) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <Grid style={{ flex: 1, borderWidth: 0, borderColor: "yellow" }}>
      {props?.debug && Platform.OS === "web" ? (
        <JSONEditor
          json={config}
          onChangeJSON={(json) => {
            // TODO: add schema conformation for JSONEditor values of component names
            setConfig(json);
          }}
        />
      ) : null}
      <Row>{UX(config?.layout) || {}}</Row>
    </Grid>
  );
};
