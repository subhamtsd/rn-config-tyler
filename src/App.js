import React, { createElement, useState } from "react";
import { Button, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector
} from "react-redux";
import { createStore } from "redux";

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

// redux action
function action(idx, payload) {
  return {
    type: "ACTION_TRIGGER",
    ui: payload.ui,
    idx
  };
}

// redux reducer
function reducer(state = [], action) {
  switch (action.type) {
    case "ACTION_TRIGGER":
      return { ...state, ui: { "5555": action.ui, "99999": action.ui } };
    default:
      return state;
  }
}

// redux store
const store = createStore(reducer, {});

// comonents section
export const Comp5 = ({ label, dispatch, appState }) => (
  <View>
    <Text style={{ textAlign: "center" }}>{label}</Text>
    <Text>
      {appState && appState.payload && JSON.stringify(appState.payload)}
    </Text>
  </View>
);

export const ActionComp = ({ label, dispatch, appState }) => {
  console.log(`appState `, appState);
  return (
    <View
      style={
        {
          /* borderWidth: 4, height: "20%" */
        }
      }
    >
      <Text style={{ textAlign: "center" }}>{label}</Text>
      <Button
        title={"Trigger"}
        onPress={() => {
          console.log("sample event triggerred");
          dispatch(
            action(label, { sample_key: "sample_val", ui: "ActionComp" })
          );
        }}
      ></Button>
      <Text>{appState && JSON.stringify(appState)}</Text>
    </View>
  );
};
// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp
};

// pick from pre-loaded components and render properly
export const Uix = ({
  routeId,
  map,
  style,
  colStyle,
  newGrid = false,
  newRow = false,
  rowSize = 1
}) => {
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

  return newGrid && newRow ? (
    <RenderRow rowSize={rowSize} rowStyle={rowStyle}>
      <Grid>{gridJsx}</Grid>
    </RenderRow>
  ) : newGrid ? (
    <Grid>{gridJsx}</Grid>
  ) : newRow ? (
    <RenderRow rowSize={rowSize} rowStyle={rowStyle}>
      {gridJsx}
    </RenderRow>
  ) : (
    gridJsx
  );
};

const GridSection = () => {
  const appState = useState((state) => state);
  const dispatch = useDispatch();
  console.log("appState : :: : --> ", appState.payload);
  const passProps = { dispatch, appState };
  // const layoutConfig = routesConfig[routeId];
  // console.log("Configuration : : : -->>>>>>> ", layoutConfig);

  return (
    <Grid style={gridStyle}>
      <RenderCol colSize={15} colStyle={colStyle}>
        <Uix
          newRow={true}
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
          newRow={true}
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
            newGrid={true}
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
            newGrid={true}
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
            newGrid={true}
            map={{
              0: {
                idx: "Comp5",
                colSize: 3,
                props: { a: "a", b: "b", label: "5555", ...passProps }
              },
              1: {
                idx: "Comp5",
                colSize: 2,
                props: { a: "a", b: "b", label: "66666", ...passProps }
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
