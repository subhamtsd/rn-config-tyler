import React, { createElement, useState } from "react";
import { Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector
} from "react-redux";
import { ActionComp, Comp5 } from "./components/Misc";
import { RandomPic } from "./components/RandomPic";
import { About } from "./components/About";
// import { JsonForm } from "./components/JsonForm";
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
1. DONE ::: Layout from JSON
2. Routes from JSON
3. DONE ::: Shared app State (working in this)
4. Events management from JSON
5. Mobile First, Web compatible
6. DONE ::: JSON Forms
7. JSON based Lists
8. API Connectors (Datafire)
9. Scrollable Views (Outer and Inner)
10. Examples config JSONs for realistic apps

*/

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

// components section
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

// pick from pre-loaded components and render properly, renders each component at column level
export const UXColumn = ({
  label,
  idx,
  style,
  colSize,
  colStyle,
  children,
  passProps
}) => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  const rProps = { dispatch, appState, action, styles };
  // console.log("appState : :: : --> ", appState.payload);
  const colSection = createElement(
    label &&
      appState.ui &&
      appState.ui[label] &&
      componentsSet[appState.ui[label]]
      ? componentsSet[appState.ui[label]] //check if there's a specified component for the cell
      : componentsSet[idx], // else render default component
    { ...passProps, ...rProps },
    (appState && appState.children && appState.children[label]) || children
  );
  return (
    <Col size={colSize} style={{ ...style, ...colStyle }} l>
      {colSection} {label}
    </Col>
  );
};

// render a grid layout as per the configuration
const GridSection = () => {
  // const history = useHistory();
  const layoutConfig = {
    links: {
      "/": {
        style: styles.navItem,
        linkStyle: styles.tabName,
        linkText: "Home"
      },
      "/about": {
        style: styles.navItem,
        linkStyle: styles.tabName,
        linkText: "About"
      },
      "/contact": {
        style: styles.navItem,
        linkStyle: styles.tabName,
        linkText: "Contact"
      }
    },
    layout: {
      // row no
      0: {
        rowConfig: {
          rowSize: 1,
          style: rowStyle
        },
        // col no
        0: {
          layout: {
            0: {
              // row no
              rowConfig: {
                rowSize: 1,
                style: rowStyle
              },
              0: {
                // col no
                colSize: 1,
                idx: "Home",
                label: "home",
                colStyle: { borderWidth: 4, minHeight: 212 }
              }
            },
            1: {
              // row no
              rowConfig: {
                rowSize: 1,
                style: rowStyle
              },
              0: {
                // col no
                colSize: 1,
                idx: "About",
                label: "about",
                colStyle: { borderWidth: 4, minHeight: 212 }
              },
              1: {
                // col no
                colSize: 1,
                idx: "Comp5",
                label: "comp5",
                colStyle: { borderWidth: 4, minHeight: 212 }
              }
            },
            2: {
              // row no
              rowConfig: {
                rowSize: 1,
                style: rowStyle
              },
              0: {
                // col no
                colSize: 4,
                idx: "RandomPic",
                label: "rpic",
                colStyle: { borderWidth: 4, minHeight: 212 }
              }
            }
          }
        },
        1: {
          // col no
          colSize: 2,
          idx: "Comp5",
          label: "comp5.1",
          schema,
          colStyle: { borderWidth: 4, minHeight: 212 }
        }
      },
      1: {
        // row no
        rowConfig: {
          rowSize: 1,
          style: rowStyle
        },
        0: {
          // col no
          colSize: 1,
          idx: "ActionComp",
          label: "actioncomp",
          colStyle: { borderWidth: 4, minHeight: 212 }
        },
        1: {
          // col no
          colSize: 2,
          idx: "Comp5",
          label: "comp51.2",
          colStyle: { borderWidth: 4, minHeight: 212 }
        }
      }
    }
  };

  const linksSection = Object.keys(layoutConfig.links).map((path) => {
    const { style, linkText, linkStyle } = layoutConfig.links[path];
    return (
      <Col to={path} underlayColor="#f0f4f7" style={style}>
        <Text style={linkStyle}>{linkText}</Text>
      </Col>
    );
  });

  const headerSection = <Row style={styles.nav}>{linksSection}</Row>;

  //  overall routing engine
  const UX = (layoutConfig, rowConfig) => {
    const gridSection = (rows, rowConfig) => {
      let { rowSize, style } = rowConfig;
      // builds the columns
      const colsSection = (rId, cols) => {
        let rowJsx = [];
        rowJsx = Object.keys(cols).map((cId) => {
          if (cId === "rowConfig") {
            return null;
          } else if (cols[cId].idx) {
            const { idx, label, colSize, props, children, colStyle } = cols[
              cId
            ];
            // console.log(label);

            const passProps = {
              ...props,
              ...cols[cId],
              idx,
              label,
              children,
              colSize,
              colStyle
            };

            return (
              <Col size={colSize} style={colStyle} key={`${rId}-${cId}`}>
                {/* {`r${rId}-c${cId} :: ${label}`} */}
                <UXColumn {...passProps} />
              </Col>
            );
          }
          if (cols[cId].layout) {
            // console.log(cols[cId].layout);
            return UX(cols[cId].layout, rowConfig); // FIXME:
          }
        });
        return rowJsx;
      };

      let gridJsx = [];
      gridJsx = Object.keys(rows).map((rId) => {
        // console.log(`rows`);
        // console.log(rows);
        return (
          <Row size={rowSize} style={rowStyle} key={rId}>
            {colsSection(rId, rows[rId])}
          </Row>
        );
      });
      return <Grid>{gridJsx}</Grid>; /// return all rows in layout
    };

    return gridSection(layoutConfig, rowConfig);
  };

  return (
    <Grid>
      <Row>{headerSection}</Row>
      {UX(layoutConfig.layout, layoutConfig.layout[0].rowConfig)}
    </Grid>
  );
};

//  overall container app
export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <GridSection />
      </ReduxProvider>
    );
  }
}
