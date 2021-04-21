import merge from "deepmerge";
import { object } from "dot-object";
import React, { createElement, useState } from "react";
import { Text } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { AppProps, UXColumnProps } from "../AppProps";
import { JSONEditor } from "../components/JSONEditor";
import { styles } from "../styles";

// ******************************************************************** //
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

// render a grid layout as per the configuration
export const App = (props: AppProps) => {
  const [config, setConfig] = useState(props?.config);
  const [ui, setUi] = useState({ ui: {} });
  // TODO: add ability to add/remove labels and row/columns new from layout config
  const [appState, _setAppState] = useState({
    ui: {},
    children: {},
    props: {},
    $global: {},
  });

  // logic to update layout config (which is stored in config state var)
  const setLayoutConfig = (
    // config,
    _config,
    format = "none",
    // isDottedFormat = false
  ) => {
    if (format === "dotted") {
      _config = object(config);
      setConfig(
        merge(
          props?.config,
          {
            layout: _config,
          },
          { arrayMerge: overwriteMerge }
        )
      );
    } else if (format === "copy") {
      // copy into current, no merge

      const _NewConfig = {
        componentsSet: props?.config?.componentsSet,
        links: props?.config?.links,
        layout: _config,
      };
      // console.log("Config with copy :::: ", _config);
      // console.log("Config with props :::: ", props?.config);
      // setConfig({ _config });

      // setConfig({ ...config, layout: _config });

      setConfig(_NewConfig);
    } else if (format === "sustain") {
      // copy from current
      _config = config;
      setConfig(merge(props?.config, { layout: _config }));
    } else {
      setConfig(
        merge(
          props?.config,
          {
            layout: _config,
          },
          { arrayMerge: overwriteMerge }
        )
      );
    }
    // find out if the object is in collapsed/dotted format
    // if (isDottedFormat) {
    //   // expand to proper JSON from dotted notation
    //   config = object(config);
    // }
    // setConfig(
    //   merge(
    //     props?.config,
    //     {
    //       layout: config,
    //     },
    //     { arrayMerge: overwriteMerge }
    //   )
    // );
  };

  // logic to update app state
  const setAppState = (newAppState, isPartial = true) => {
    if (isPartial) {
      _setAppState(
        merge(appState, newAppState, { arrayMerge: overwriteMerge })
      );
    } else {
      _setAppState(newAppState);
    }
  };

  // const history = useHistory();
  const getInitEvents = props.getInitEvents;
  const getEvents = props.getEvents;
  const routes = props.routes;

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

    const colSection = createElement(
      label && appState[label]?.ui && config.componentsSet[appState[label]?.ui]
        ? config.componentsSet[appState[label]?.ui]
        : config.componentsSet[idx],
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
  const linksSection = Object.keys(config.links || {}).map((path, id) => {
    const { style, linkText, linkStyle } = config.links[path];
    return (
      <Col
        to={path}
        underlayColor="#f0f4f7"
        style={style}
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
      {props?.debug ? (
        <JSONEditor
          json={config}
          onChangeJSON={(json) => {
            // TODO: add schema conformation for JSONEditor values of component names
            setConfig(json);
          }}
        />
      ) : null}
      {/* <Row style={{ maxHeight: "5vh" }}>{headerSection}</Row> */}
      <Row>{UX(config?.layout) || {}}</Row>
    </Grid>
  );
};
