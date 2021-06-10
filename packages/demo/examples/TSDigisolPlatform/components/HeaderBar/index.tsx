/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { relative } from "path";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import { routes } from "../../configs/routes/routesConfig";
// import { useSelector, useDispatch } from "react-redux";

export const HeaderBar = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
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
  } = props;

  console.log("LayoutConfig ::: ", layoutConfig);

  // useEffect(() => {
  //   getInitEvents(`${label}-$init`, setLayoutConfig, setAppState);
  // }, []);

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));

  // const state = useSelector((s: any) => s);

  // console.log("State in header bar : : : : ", state);

  // setAppState({
  //   global: {
  //     tsdApp: {
  //       activeModule: {
  //         name: "",
  //         key: "",
  //       },
  //       activeTab: {
  //         name: "",
  //         key: "",
  //       },
  //       activeAction: {
  //         name: "",
  //         key: "",
  //       },
  //     },
  //   },
  // });

  return (
    <View
      testID={`${label}-$init`}
      {...getEvents(`${label}-$init`, setLayoutConfig, setAppState)}
      style={HeaderStyles.container}
    >
      {/* <Text style={{}}>HeaderBar *** {label}</Text> */}
      {/* <Text>
        <h1>DEMO FOR TODO APP</h1>
      </Text> */}
      {/* <Button
        testID={`${label}-btn-one`}
        title="TODO APP DEMO"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      <Row>
        <Col>
          <View style={HeaderStyles.logoViewStyle}>
            {/* <Text style={HeaderStyles.logoTextStyle}>TSD LOGO</Text> */}
            <Image
              source={require("../../../../../../assets/images/tsdLogo.png")}
              style={HeaderStyles.logoTextStyle}
            />
          </View>
        </Col>
        <Col>
          <View style={HeaderStyles.userNameViewStyle}>
            <Text style={HeaderStyles.userNameTextStyle}>Customer Name</Text>
          </View>
        </Col>
        <Col>
          <View style={HeaderStyles.logoutViewStyle}>
            {/* <Text style={HeaderStyles.logoutTextStyle}>Logout</Text> */}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: "grey",
                // width: "6vh",
                // height: "6vh",
                // alignItems: "center",
                // paddingRight: 10,
                flex: 1,
                margin: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              testID={`${label}-btn-one`}
              // TODO: Remove this hardcoding
              onPress={() => {
                setAppState(
                  {
                    $global: {
                      tsdApp: {
                        activeBuisnessFunction: {
                          name: "Foundation",
                          key: "1000",
                        },
                        activeModule: {
                          name: "Catalog",
                          key: "2001",
                        },
                        activeTab: {
                          name: "Catalog",
                          key: "3000",
                        },
                        activeAction: {
                          name: "Search",
                          key: "4003",
                          endPoint: "v1/catalog/list",
                          httpMethod: "POST",
                          showButton: true,
                        },
                        createComponent: {
                          layout: {},
                        },
                        searchComponent: {
                          Organisation: {},
                        },
                        formToggle: {
                          formSelected: routes["search"],
                          messages: "Show Form",
                        },
                      },
                    },
                  },
                  "isPartial"
                );
                setLayoutConfig(routes["defaultAppConfig"], "copy");
              }}
              {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
            >
              {/* <Text>Default State</Text> */}
              <Image
                source={require("../../../../../../assets/images/icons8-update-file-96.png")}
                style={{
                  width: "6vh",
                  height: "6vh",
                }}
              />
            </TouchableOpacity>
          </View>
        </Col>
      </Row>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#eab358",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  logoViewStyle: {
    margin: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 30,
  },
  logoTextStyle: {
    // marginLeft: 30,
    // marginTop: 2,
    // marginBottom: 10,
    width: "21vh",
    height: "7vh",
    // borderWidth: 1,
  },
  userNameViewStyle: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  userNameTextStyle: {
    fontSize: 17,
  },
  logoutViewStyle: {
    // borderWidth: 1,
    // marginTop: 5,
    // marginBottom: 5,
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    marginRight: 50,
  },
  logoutTextStyle: {
    marginLeft: 150,
    marginRight: 100,
    marginTop: 10,
    marginBottom: 26,
  },
});
