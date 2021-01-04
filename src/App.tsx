import React, { createElement, useState } from "react";
import { View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector
} from "react-redux";
import { JsonForm } from "./components/JsonForm";
import { ActionComp, Comp5 } from "./components/Misc";
import { action, store } from "./state-mgmt/consolidated";
/*
1. Layout from JSON
2. Routes from JSON
3. Shared app State (working in this)
4. Events management from JSON
5. Mobile First, Web compatible
6. JSON Forms
7. JSON based Lists
8. API Connectors (Datafire)
9. Scrollable Views (Outer and Inner)

*/

// ******************************************************************** //

// ******************************************************************** //

export const AAAConfig = {
  layout: {
    // Column
    c1: {
      // COLUMN
      "1.1": {
        // ROW
        "1.1.1": {
          name: "Comp5",
          size: 35
        },
        // ROW
        "1.1.2": {
          // Column
          name: "Comp5",
          size: 35
        }
      },
      // COLUMN
      "1.2": {
        // ROW
        "1.2.1": {
          name: "Comp5",
          size: 85
        },
        // ROW
        "1.2.2": {
          name: "Comp5",
          size: 35
        },
        // ROW
        "1.2.3": {
          // Column
          name: "Comp5",
          size: 35
        }
      }
    }
  }
};

// All routes which will be rendered
export const routesConfig = {
  AAA: AAAConfig
};

// ******************************************************************** //

export const colStyle = {
  borderWidth: 3,
  borderColor: "cyan"
};

export const rowStyle = {
  borderWidth: 2,
  borderColor: "red"
};

export const style1 = {
  borderWidth: 2,
  borderColor: "yellow"
};

export const gridStyle = {
  borderWidth: 1,
  borderColor: "blue",
  minHeight: 500
};

const RenderCol = (props) => {
  return (
    <Col style={props.colStyle} size={props.colSize}>
      {props.children}
    </Col>
  );
};

const RenderRow = (props) => {
  return (
    <Row size={props.rowSize} style={props.rowStyle}>
      <RenderCol colStyle={props.colStyle}>{props.children}</RenderCol>
    </Row>
  );
};

// comonents section
const theme = {
  input: {
    focused: {
      border: {
        borderColor: "yellow"
      }
    }
  }
};

const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" }
  }
};

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  JsonForm
};

// pick from pre-loaded components and render properly
export const Uix = ({ routeId, map, style, colStyle, rowSize = 1 }) => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const layoutConfig = routesConfig[routeId];
  const outerGridJsx = [];
  const gridJsx = Object.keys(map).map((ctr) => {
    const { idx, props, children, colSize, colStyle } = map[ctr];
    // console.log("appState : :: : --> ", appState);
    // console.log(` props.label >>> `, props.label);
    // console.log(` componentsSet[idx] >>> `, componentsSet[idx]);
    return (
      <RenderCol colSize={colSize} colStyle={{ ...style, ...colStyle }}>
        {createElement(
          props.label &&
            appState.ui &&
            appState.ui[props.label] &&
            componentsSet[appState.ui[props.label]]
            ? componentsSet[appState.ui[props.label]] //check if there's a specified component for the cell
            : componentsSet[idx], // else render default component
          { ...props, appState, dispatch },
          children
        )}
      </RenderCol>
    );
  });
  return (
    <Row size={rowSize} style={rowStyle}>
      {gridJsx}
    </Row>
  );
};

const GridSection = () => {
  const appState = useState((state) => state);
  const dispatch = useDispatch();
  console.log("appState : :: : --> ", appState.payload);
  const passProps = { dispatch, appState, action };
  // const layoutConfig = routesConfig[routeId];
  // console.log("Configuration : : : -->>>>>>> ", layoutConfig);

  return (
    <Grid style={gridStyle}>
      <RenderCol colSize={15} colStyle={colStyle}>
        <Uix
          rowSize={5}
          // style={{ ...rowStyle }}
          map={{
            0: {
              idx: "ActionComp",
              colSize: 1,
              props: {
                a: "a",
                b: "b",
                label: "111",
                ...passProps,
                colStyle: { borderWidth: 4 }
              }
            }
          }}
        />
        <Uix
          rowSize={96}
          style={{ ...rowStyle }}
          map={{
            0: {
              idx: "Comp5",
              colSize: 1,
              props: { a: "a", b: "b", label: "2222", ...passProps }
            }
          }}
        />
      </RenderCol>
      <RenderCol colSize={85} colStyle={colStyle}>
        <RenderRow rowSize={5}>
          <Uix
            style={{ ...rowStyle }}
            map={{
              0: {
                idx: "Comp5",
                props: { a: "a", b: "b", label: "87878787", ...passProps }
              }
            }}
          />
        </RenderRow>
        <RenderRow rowSize={40}>
          <Uix
            style={{ ...rowStyle }}
            rowSize={100}
            map={{
              0: {
                idx: "Comp5",
                colSize: 2,
                props: { a: "a", b: "b", label: "1010101", ...passProps }
              },
              1: {
                idx: "Comp5",
                colSize: 2,
                props: { a: "a", b: "b", label: "99999", ...passProps }
              },
              2: {
                idx: "Comp5",
                colSize: 3,
                props: { a: "a", b: "b", label: "8888", ...passProps }
              }
            }}
          />
        </RenderRow>
        <RenderRow rowSize={40}>
          <Uix
            style={{ ...rowStyle }}
            map={{
              0: {
                idx: "Comp5",
                colSize: 3,
                props: { a: "a", b: "b", label: "5555", ...passProps }
              },
              1: {
                idx: "JsonForm",
                colSize: 2,
                props: {
                  a: "a",
                  b: "b",
                  _onSubmit: (data) => {
                    console.log("****");
                    console.log(data);
                    console.log("sample event triggerred");
                    dispatch(
                      action("7777", ["7777", "99999"], {
                        data,
                        ui: "ActionComp"
                      })
                    );
                  },
                  label: "66666",
                  ...passProps,
                  schema,
                  style: { minHeight: 20 }
                }
              },
              2: {
                idx: "Comp5",
                colSize: 2,
                props: { a: "a", b: "b", label: "7777", ...passProps }
              }
            }}
          />
        </RenderRow>
        <RenderRow rowSize={2}>
          <Uix
            style={{ ...rowStyle }}
            map={{
              0: {
                idx: "Comp5",
                colSize: 1,
                props: { a: "a", b: "b", label: "19191919", ...passProps }
              }
            }}
          />
        </RenderRow>
        <RenderRow rowSize={2}>
          <Uix
            style={{ ...rowStyle }}
            map={{
              0: {
                idx: "Comp5",
                colSize: 1,
                props: { a: "a", b: "b", label: "202020", ...passProps }
              }
            }}
          />
        </RenderRow>
      </RenderCol>
    </Grid>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <View style={{ flex: 1 }}>
          <GridSection />
        </View>
      </ReduxProvider>
    );
  }
}
