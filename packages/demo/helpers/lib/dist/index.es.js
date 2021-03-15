import React, { useState, createElement } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import merge from "deepmerge";
import { object } from "dot-object";
import { Col, Grid, Row } from "react-native-easy-grid";

var JSONEditor = function () {
  return React.createElement(View, null, React.createElement(Text, null, "."));
};

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

var rowStyle = {
  borderWidth: 1,
  borderColor: "red",
};
var styles = {
  container: {
    marginTop: 25,
    padding: 10,
  },
  tabName: {
    color: "white",
  },
  header: {
    fontSize: 20,
    backgroundColor: "skyblue",
    marginTop: 10,
    padding: 15,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "coral",
  },
  subNavItem: {
    padding: 15,
  },
  topic: {
    textAlign: "center",
    fontSize: 15,
  },
};

// All component which will be rendered
// ******************************************************************** //
var overwriteMerge = function (destinationArray, sourceArray, options) {
  return sourceArray;
};
// render a grid layout as per the configuration
var App = function (props) {
  var _a = useState(props === null || props === void 0 ? void 0 : props.config),
    config = _a[0],
    setConfig = _a[1];
  var routes = props === null || props === void 0 ? void 0 : props.routes;
  var componentsSet =
    props === null || props === void 0 ? void 0 : props.config.componentsSet;
  // const history = useHistory();
  var getInitEvents = props.getInitEvents;
  var getEvents = props.getEvents;
  // TODO: add ability to add/remove labels and row/columns new from layout config
  var _b = useState({
      ui: {},
      children: {},
      props: {},
      $global: {},
    }),
    appState = _b[0],
    _setAppState = _b[1];
  // logic to update layout config (which is stored in config state var)
  var setLayoutConfig = function (config, isDottedFormat) {
    if (isDottedFormat === void 0) {
      isDottedFormat = false;
    }
    // find out if the object is in collapsed/dotted format
    if (isDottedFormat) {
      // expand to proper JSON from dotted notation
      config = object(config);
    }
    setConfig(
      merge(
        config,
        {
          layout: config,
        },
        { arrayMerge: overwriteMerge }
      )
    );
  };
  // logic to update app state
  var setAppState = function (newAppState, isPartial) {
    if (isPartial === void 0) {
      isPartial = true;
    }
    if (isPartial) {
      _setAppState(
        merge(appState, newAppState, { arrayMerge: overwriteMerge })
      );
    } else {
      _setAppState(newAppState);
    }
  };
  // pick from pre-loaded components and render properly, renders each component at column level
  var UXColumn = function (colProps) {
    var _a, _b, _c, _d;
    var label = colProps.label,
      key = colProps.key,
      idx = colProps.idx,
      children = colProps.children,
      passProps = colProps.passProps,
      appState = colProps.appState,
      setAppState = colProps.setAppState,
      setLayoutConfig = colProps.setLayoutConfig;
    console.log("label is " + label);
    var colSection = createElement(
      label &&
        appState[label] &&
        ((_a = appState[label]) === null || _a === void 0 ? void 0 : _a.ui) &&
        componentsSet[
          (_b = appState[label]) === null || _b === void 0 ? void 0 : _b.ui
        ]
        ? componentsSet[
            (_c = appState[label]) === null || _c === void 0 ? void 0 : _c.ui
          ]
        : componentsSet[idx],
      __assign(
        __assign(
          __assign(__assign({}, passProps), {
            appState: appState,
            routes: routes,
            key: key,
            setAppState: setAppState,
          }),
          styles
        ),
        {
          label: label,
          setLayoutConfig: setLayoutConfig,
          getEvents: getEvents,
          getInitEvents: getInitEvents,
        }
      ),
      ((_d = appState[label]) === null || _d === void 0
        ? void 0
        : _d.children) || children
    );
    return colSection;
  };
  var linksSection = Object.keys(
    (config === null || config === void 0 ? void 0 : config.links) || {}
  ).map(function (path, id) {
    var _a = config === null || config === void 0 ? void 0 : config.links[path],
      containerStyle = _a.containerStyle,
      linkText = _a.linkText,
      linkStyle = _a.linkStyle;
    return React.createElement(
      Col,
      {
        to: path,
        underlayColor: "#f0f4f7",
        style: containerStyle,
        key: id + "-" + path,
      },
      React.createElement(Text, { style: linkStyle }, linkText)
    );
  });
  var headerSection = React.createElement(
    Col,
    { style: __assign({}, styles.nav) },
    linksSection
  );
  //  overall routing engine
  var UX = function (layoutConfig) {
    var _a, _b;
    // window.appState = appState;
    // window.setAppState = setAppState;
    var gridSection = function (rows, setLayoutConfig) {
      // builds the columns
      var colsSection = function (rId, cols) {
        var rowJsx = [];
        rowJsx = Object.keys(cols).map(function (cId, colNo) {
          var _a, _b, _c, _d;
          if (cId === "rowConfig") {
            return null;
          } else if (cols[cId].idx) {
            var _e = cols[cId],
              idx = _e.idx,
              label = _e.label,
              colSize = _e.colSize,
              props_1 = _e.props,
              children = _e.children,
              colStyle = _e.colStyle;
            var passProps = __assign(
              __assign(__assign({}, props_1), cols[cId]),
              {
                idx: idx,
                label: label,
                children: children,
                colSize: colSize,
                colStyle: colStyle,
                appState: appState,
                setAppState: setAppState,
                setLayoutConfig: setLayoutConfig,
                getEvents: getEvents,
              }
            );
            // console.log(`colSize is ${colSize}`);
            return React.createElement(
              Col,
              {
                size: colSize,
                style: __assign({}, colStyle),
                key: rId + "-" + colNo,
              },
              React.createElement(UXColumn, __assign({}, passProps))
            );
          }
          if (cols[cId].layout) {
            // console.log(cols[cId]?.layout.colConfig?.colSize);
            return React.createElement(
              Col,
              {
                key: rId + "-" + colNo,
                size:
                  ((_b =
                    (_a = cols[cId].layout) === null || _a === void 0
                      ? void 0
                      : _a.colConfig) === null || _b === void 0
                    ? void 0
                    : _b.colSize) || 1,
                style: __assign(
                  __assign(
                    {},
                    ((_d =
                      (_c = cols[cId].layout) === null || _c === void 0
                        ? void 0
                        : _c.colConfig) === null || _d === void 0
                      ? void 0
                      : _d.colStyle) || {}
                  ),
                  { borderWidth: 0, borderColor: "blue" }
                ),
              },
              React.createElement(Grid, { style: {} }, UX(cols[cId].layout))
            );
          }
        });
        // console.log(`rowSize is ${rowSize}`);
        return rowJsx;
      };
      var gridJsx = [];
      if (rows && Object.keys(rows)) {
        gridJsx = Object.keys(rows).map(function (rId) {
          var _a, _b, _c, _d;
          if (rId === "colConfig") {
            return null;
          } else {
            // console.log(rows[rId]?.rowConfig?.rowSize);
            return React.createElement(
              Row,
              {
                size:
                  ((_b =
                    (_a = rows[rId]) === null || _a === void 0
                      ? void 0
                      : _a.rowConfig) === null || _b === void 0
                    ? void 0
                    : _b.rowSize) || 1,
                key: "" + rId,
                style: __assign(
                  { borderWidth: 6, borderColor: "gray" },
                  (_d =
                    (_c = rows[rId]) === null || _c === void 0
                      ? void 0
                      : _c.rowConfig) === null || _d === void 0
                    ? void 0
                    : _d.rowStyle
                ),
              },
              colsSection(rId, rows[rId])
            );
          }
        });
        return React.createElement(
          Col,
          { style: { borderWidth: 0, borderColor: "red" } },
          gridJsx
        ); /// return all rows in layout
      } else {
        console.log(
          "ERROR  :::: Possibly some routing label is incorrect in youir routes configuration."
        );
      }
    };
    return React.createElement(
      Col,
      {
        size:
          ((_a =
            layoutConfig === null || layoutConfig === void 0
              ? void 0
              : layoutConfig.colConfig) === null || _a === void 0
            ? void 0
            : _a.colSize) || 1,
        style: __assign(
          {},
          (_b =
            layoutConfig === null || layoutConfig === void 0
              ? void 0
              : layoutConfig.colConfig) === null || _b === void 0
            ? void 0
            : _b.colStyle
        ),
      },
      gridSection(layoutConfig, setLayoutConfig)
    );
  };
  // console.log(layoutConfig);
  if (
    !(config === null || config === void 0 ? void 0 : config.layout) ||
    !(routes && Object.keys(routes).length > 0) ||
    !(componentsSet && Object.keys(componentsSet).length > 0)
  ) {
    return React.createElement(
      View,
      null,
      React.createElement(Text, null, "Loading ...")
    );
  }
  return React.createElement(
    Grid,
    { style: { flex: 1, borderWidth: 0, borderColor: "yellow" } },
    (props === null || props === void 0 ? void 0 : props.debug) &&
      Platform.OS === "web"
      ? React.createElement(JSONEditor, {
          json: config,
          onChangeJSON: function (json) {
            // TODO: add schema conformation for JSONEditor values of component names
            setConfig(json);
          },
        })
      : null,
    React.createElement(
      TouchableOpacity,
      null,
      React.createElement(
        Row,
        { style: { maxHeight: 35, marginTop: "0%" } },
        headerSection
      )
    ),
    React.createElement(
      Row,
      null,
      UX(config === null || config === void 0 ? void 0 : config.layout) || {}
    )
  );
};

// initialize the props to be passed
var noOp = function () {
  /* */
};
var init = function (moduleConfig, fetchConfig, getComponentsSet) {
  if (moduleConfig === void 0) {
    moduleConfig = {};
  }
  if (fetchConfig === void 0) {
    fetchConfig = null;
  }
  var passProps = {
    config:
      moduleConfig === null || moduleConfig === void 0
        ? void 0
        : moduleConfig.appConfig,
    routes:
      moduleConfig === null || moduleConfig === void 0
        ? void 0
        : moduleConfig.routes,
    getEvents:
      (moduleConfig === null || moduleConfig === void 0
        ? void 0
        : moduleConfig.getEvents) || noOp,
    getInitEvents:
      (moduleConfig === null || moduleConfig === void 0
        ? void 0
        : moduleConfig.getInitEvents) || noOp,
  };
  return new Promise(function (resolve, reject) {
    if (fetchConfig) {
      return fetch(fetchConfig.url, {
        headers: __assign({}, fetchConfig.headers),
      })
        .then(function (_data) {
          return _data.json();
        })
        .then(function (data) {
          var appConfig = data.appConfig;
          data.routes;
          var componentsSet = getComponentsSet();
          appConfig.componentsSet = componentsSet;
          passProps.config = appConfig;
          console.log(passProps);
          return resolve(passProps);
        });
    } else {
      return resolve(passProps);
    }
  });
};

export { App, JSONEditor, init, rowStyle, styles };
