// TODO: See if the below LIB can be removed
import merge from "deepmerge";
import React, { createElement, useState } from "react";
import { Text, View } from "react-native";
// TODO: See if the below LIB can be removed
import { Col, Grid, Row } from "react-native-easy-grid";
import styles from "../styles";
// ******************************************************************** //

// render a grid layout as per the configuration
export const GridSection = ({ layoutConfig, setLayoutConfig, routes }) => {
  // const history = useHistory();

  // pick from pre-loaded components and render properly, renders each component at column level
  const UXColumn = ({
    label,
    key,
    idx,
    children,
    passProps,
    appState,
    setAppState,
    setLayoutConfig,
  }) => {
    const colSection = createElement(
      label &&
        appState[label]?.ui &&
        layoutConfig.componentsSet[appState[label]?.ui]
        ? layoutConfig.componentsSet[appState[label]?.ui]
        : layoutConfig.componentsSet[idx],
      {
        ...passProps,
        appState,
        routes,
        key,
        setAppState,
        ...styles,
        label,
        setLayoutConfig,
      },
      appState[label]?.children || children
    );
    return colSection;
  };
  const linksSection = Object.keys(layoutConfig.links).map((path, id) => {
    const { style, linkText, linkStyle } = layoutConfig.links[path];
    return (
      <View style={style} key={`${id}-${path}`}>
        <Text style={linkStyle}>{linkText}</Text>
      </View>
    );
  });

  const headerSection = <Col>{linksSection}</Col>;

  // TODO: add ability to add/remove labels and row/columns new from layout config
  const [appState, _setAppState] = useState({
    ui: {},
    children: {},
    props: {},
  });

  const setAppState = (newAppState) => {
    _setAppState(merge(appState, newAppState));
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
          // const style = rows[rId]?.rowConfig?.rowStyle || {};
          // console.log(rows[rId].rowConfig);

          if (rId === "colConfig") {
            return null;
          } else {
            // console.log(rows[rId]?.rowConfig?.rowSize);
            return (
              <Row
                size={rows[rId]?.rowConfig?.rowSize || 1}
                key={`${rId}`}
                style={{
                  borderWidth: 6,
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
          "ERROR  :::: Possibly some routing label is incorrect in youir routes configuration."
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

  // console.log(layoutConfig);

  return (
    <Grid style={{ flex: 1, borderWidth: 0, borderColor: "yellow" }}>
      <Row>{headerSection}</Row>
      <Row>{UX(layoutConfig?.layout) || {}}</Row>
    </Grid>
  );
};
