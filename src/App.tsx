import React, { createElement, useState } from "react";
import { Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector
} from "react-redux";
import { Link } from "react-router-native";
// import { JsonForm } from "./components/JsonForm";
import { ActionComp, Comp5 } from "./components/Misc";
import { RandomPic } from "./components/RandomPic";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { action, store } from "./state-mgmt/consolidated";

const styles = {
  container: {
    marginTop: 25,
    padding: 10
  },
  tabName: {
    color: "white"
  },
  header: {
    fontSize: 20,
    backgroundColor: "skyblue",
    marginTop: 10,
    padding: 15
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "coral"
  },
  subNavItem: {
    padding: 15
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
};

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
  Home,
  About,
  RandomPic
  // JsonForm
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
    const colSection = createElement(
      props.label &&
        appState.ui &&
        appState.ui[props.label] &&
        componentsSet[appState.ui[props.label]]
        ? componentsSet[appState.ui[props.label]] //check if there's a specified component for the cell
        : componentsSet[idx], // else render default component
      { ...props, appState, dispatch },
      (appState && appState.children && appState.children[props.label]) ||
        children
    );
    return (
      <RenderCol colSize={colSize} colStyle={{ ...style, ...colStyle }}>
        {colSection}
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
  const passProps = { dispatch, appState, action, styles };
  // const layoutConfig = routesConfig[routeId];
  // console.log("Configuration : : : -->>>>>>> ", layoutConfig);

  // const history = useHistory();

  return (
    <Grid style={styles.container}>
      <Row style={styles.nav}>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text style={styles.tabName}>Home</Text>
        </Link>
        <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text style={styles.tabName}>About</Text>
        </Link>
        <Link to="/topics" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text style={styles.tabName}>Topics</Text>
        </Link>
      </Row>
      <Row style={gridStyle}>
        <RenderCol colSize={15} colStyle={colStyle}>
          <Uix
            rowSize={5}
            // style={{ ...rowStyle }}
            map={{
              0: {
                idx: "ActionComp",
                colSize: 1,
                props: {
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
                props: {
                  label: "2222",
                  ...passProps
                },
                children: (
                  <Col style={{ marginTop: 150 }}>
                    <Text>
                      "2222 >> Text coming from a children part from UIX"
                    </Text>
                  </Col>
                )
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
                  props: { label: "87878787", ...passProps }
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
                  props: {
                    label: "1010101",
                    ...passProps
                  },
                  children: (
                    <Col>
                      <Text>
                        1010101 >>> Text coming from a children part from UIX
                      </Text>
                    </Col>
                  )
                },
                1: {
                  idx: "RandomPic",
                  colSize: 2,
                  props: { label: "99999", ...passProps }
                },
                2: {
                  idx: "About",
                  colSize: 3,
                  props: {
                    label: "8888",
                    ...passProps
                  },
                  children: (
                    <View>
                      <Text> "HHHH" </Text>
                    </View>
                  )
                }
              }}
            />
          </RenderRow>
          <RenderRow rowSize={40}>
            {/* <Route exact path="/about" component={About} />
              <Route exact path="/" component={Home} /> */}
            <Uix
              style={{ ...rowStyle }}
              map={{
                0: {
                  idx: "Comp5",
                  colSize: 3,
                  props: { label: "5555", ...passProps }
                },
                1: {
                  idx: "Comp5",
                  colSize: 2,
                  props: {
                    _onSubmit: (data) => {
                      console.log("****");
                      console.log(data);
                      console.log("sample event triggerred");
                      dispatch(
                        action(["7777", "99999"], {
                          data,
                          ui: ["RandomPic", "ActionComp"]
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
                  props: { label: "7777", ...passProps }
                }
              }}
            />
          </RenderRow>
          <RenderRow rowSize={2}>
            {/* <Route path="/about" component={About} /> */}
            <Uix
              style={{ ...rowStyle }}
              map={{
                0: {
                  idx: "Comp5",
                  colSize: 1,
                  props: { label: "19191919", ...passProps }
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
                  props: { label: "202020", ...passProps }
                }
              }}
            />
          </RenderRow>
        </RenderCol>
      </Row>
    </Grid>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <GridSection />
      </ReduxProvider>
    );
  }
}
