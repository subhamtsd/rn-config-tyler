import React, { createElement, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { AppProps, UXColumnProps } from "../AppProps";
import { JSONEditor } from "../components/JSONEditor";
import { styles } from "../styles";
import { setAppState as sa, setLayoutConfig as sl } from "./helpers";
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

  // logic to update layout config (which is stored in config state var)
  const setLayoutConfig = (_config, format = "none") => {
    sl(setConfig, config, _config, format);
  };

  // logic to update app state
  const setAppState = (newAppState, isPartial = true) => {
    sa(_setAppState, appState, newAppState, isPartial);
  };

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
  const linksSection = Object.keys(config?.links || {}).map((path, id) => {
    const { containerStyle, linkText, linkStyle } = config?.links[path];
    return (
      <Col
        to={path}
        underlayColor="#f0f4f7"
        style={containerStyle}
        key={`${id}-${path}`}
      >
        <Text style={linkStyle}>{linkText}</Text>
      </Col>
    );
  });

  const headerSection = <Col style={{ ...styles.nav }}>{linksSection}</Col>;

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
            const { idx, label, colSize, props, children, colStyle } = cols[
              cId
            ];

            const passProps = {
              ...props,
              ...cols[cId],
              idx,
              label,
              children,
              colSize,
              colStyle,
              appState,
              setAppState,
              setLayoutConfig,
              getEvents,
            };

            // console.log(`colSize is ${colSize}`);
            return (
              <Col
                size={colSize}
                style={{ ...colStyle }}
                key={`${rId}-${colNo}`}
              >
                <UXColumn {...passProps} />
              </Col>
            );
          }
          if (cols[cId].layout) {
            // console.log(cols[cId]?.layout.colConfig?.colSize);

            return (
              <Col
                key={`${rId}-${colNo}`}
                size={cols[cId].layout?.colConfig?.colSize || 1}
                style={{
                  ...(cols[cId].layout?.colConfig?.colStyle || {}),
                  borderWidth: 0,
                  borderColor: "blue",
                }}
              >
                <Grid style={{}}>{UX(cols[cId].layout)}</Grid>
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
          if (rId === "colConfig") {
            return null;
          } else {
            // console.log(rows[rId]?.rowConfig?.rowSize);
            return (
              <Row
                // size={rows[rId]?.rowConfig?.rowSize || 1}
                key={`${rId}`}
                style={{
                  borderWidth: 0,
                  borderColor: "gray",
                  ...rows[rId]?.rowConfig?.rowStyle,
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
        size={layoutConfig?.colConfig?.colSize || 1}
        style={{
          ...layoutConfig?.colConfig?.colStyle,
        }}
      >
        {gridSection(layoutConfig, setLayoutConfig)}
      </Col>
    );
  };

  console.log("LAYOUT CONFIG ACTIVE :::: ", config);
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
      {/* {props?.debug && Platform.OS === "web" ? (
        <JSONEditor
          json={config}
          onChangeJSON={(json) => {
            // TODO: add schema conformation for JSONEditor values of component names
            setConfig(json);
          }}
        />
      ) : null} */}
      <TouchableOpacity>
        <Row style={{ maxHeight: 35, marginTop: "0%" }}>{headerSection}</Row>
      </TouchableOpacity>
      <Row>{UX(config?.layout) || {}}</Row>
    </Grid>
  );
};
