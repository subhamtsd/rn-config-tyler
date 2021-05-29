/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  CheckBox,
} from "react-native";
// import { CheckBox } from "@react-native-community/checkbox";
import PropTypes from "prop-types";
import SearchInput, { createFilter } from "react-native-search-filter";
import { routes } from "../../configs/routes/routesConfig";
import { Col, Grid, Row } from "react-native-easy-grid";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { getEvents } from "../../configs/events/eventConfig";
// import { useHistory } from "react-router-native";

{
  /* 
    <SearchList 
        data={data} 
        searchFields={["name", "description", "category", "subCategory"]} 
        visibleKeys={["name", "category", "description"]}
        flexWidth={[1,1,3]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={3} // Row-span
        searchBarWrapperStyle={null}
        searchBarStyle={null}
        titleStyle={null}
        dataStyle={{color: 'darkblue'}}
        inputPlaceholder="Search Here"
    /> 
*/
}

export default function SearchListComponent({
  data,
  searchFields,
  visibleKeys,
  showTitleKey,
  flexWidth,
  titleStyle,
  dataStyle,
  inputPlaceholder,
  numberOfLines,
  searchBarWrapperStyle,
  searchBarStyle,
  buttonTitle,
  buttonColor,
  buttonPress,
  ...props
}: any) {
  // const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [isSelected, setSelected] = useState(false);

  console.log("Props in SearchListComponent :: : ", {
    data,
    searchFields,
    visibleKeys,
    showTitleKey,
    flexWidth,
    titleStyle,
    dataStyle,
    inputPlaceholder,
    numberOfLines,
    searchBarWrapperStyle,
    searchBarStyle,
    buttonTitle,
    buttonColor,
    buttonPress,
    ...props,
  });

  const [checked, setChecked] = useState([]); // [false, false]
  const filterData = data.filter(createFilter(searchItem, searchFields));

  const keys = visibleKeys || Object.keys(data[0] || []);

  console.log("keys ::: --- ", keys, " \n : showTitleKey ::: ", showTitleKey);

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < numberOfLines; i++) {
      tempArray.push(isSelected);
    }
    isSelected ? setChecked(tempArray) : setChecked([]);
  }, [isSelected]);

  const checkboxHanlder = (index) => (e) => {
    const newArr = [...checked]; // copying the old datas array
    newArr[index] = !newArr[index];

    setChecked(newArr);
  };

  console.log("Checked Array : : : ", checked);

  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
        borderWidth: 0,
        borderColor: "red",
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            // justifyContent: "space-around",
            // borderWidth: 2,
          },
          searchBarWrapperStyle,
        ]}
      >
        <SearchInput
          placeholder={inputPlaceholder || "Enter Keyword to Search"}
          onChangeText={(value) => setSearchItem(value)}
          style={[
            { padding: 5, borderWidth: 1, borderColor: "grey", minWidth: 200 },
            searchBarStyle,
          ]}
        />
      </View>
      <Grid>
        <ScrollView style={{ margin: 10, borderWidth: 0, width: "100%" }}>
          {data.length && keys.length ? (
            <Row style={styles.headerRow}>
              <Col
                size={1}
                style={[
                  styles.tableVal,
                  dataStyle,
                  {
                    borderWidth: 0,
                    borderColor: "red",
                    alignItems: "center",
                    marginTop: "5px",
                  },
                ]}
              >
                <Text adjustsFontSizeToFit allowFontScaling>
                  {
                    <CheckBox
                      color="#0e73ca"
                      value={isSelected}
                      onValueChange={setSelected}
                    />
                  }
                </Text>
              </Col>

              {showTitleKey.map((key, i) => (
                <Col
                  size={3}
                  style={[
                    styles.tableVal,
                    // { flex: flexWidth ? flexWidth[i] : 1 },
                    { flex: 2 },
                    { borderWidth: 0, borderColor: "red" },
                    titleStyle,
                  ]}
                  key={i}
                >
                  <Text
                    adjustsFontSizeToFit
                    allowFontScaling
                    style={{
                      // alignContent: "center",
                      // alignSelf: "center",
                      // textAlign: "center",
                      // textAlignVertical: "center",
                      width: "150px",
                      marginLeft: 5,
                      marginRight: 5,
                      // borderWidth: 1,
                      fontWeight: "bold",
                      fontSize: 15,
                      flexWrap: "wrap",
                    }}
                    key={i}
                  >
                    {key.substring(0, 1).toUpperCase() + key.substring(1)}
                  </Text>
                </Col>
              ))}
              <Col
                size={3}
                style={[
                  styles.tableVal,
                  // { flex: flexWidth ? flexWidth[i] : 1 },
                  { borderWidth: 0 },
                  { flex: 2 },
                  titleStyle,
                ]}
              >
                <Text
                  adjustsFontSizeToFit
                  allowFontScaling
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    textAlign: "center",
                    textAlignVertical: "center",
                    maxWidth: "150px",
                    marginLeft: 5,
                    marginRight: 5,
                    fontWeight: "bold",
                  }}
                >
                  Action
                </Text>
              </Col>
            </Row>
          ) : null}
          {filterData.map((d, i) => {
            // console.log("D : i --> ", d, "+" + " " + i);
            return (
              <TouchableOpacity key={d.id}>
                <View style={{ flexDirection: "row" }}>
                  <Col
                    size={1.5}
                    style={[
                      styles.tableVal,
                      dataStyle,
                      { borderColor: "blue" },
                      { alignItems: "center", marginTop: "5px" },
                    ]}
                  >
                    <Text adjustsFontSizeToFit allowFontScaling>
                      {
                        <CheckBox
                          color="#0e73ca"
                          value={checked[i]}
                          onValueChange={checkboxHanlder(i)}
                        />
                      }
                    </Text>
                  </Col>
                  {keys.length
                    ? keys.map((key, i) => (
                        // Remove numberOfLines and ellipsizeMode, if the content row span doesn't bother us
                        // Doesn't seem too polished for web
                        <Col
                          size={3}
                          key={i}
                          style={[
                            styles.tableVal,
                            dataStyle,
                            { borderColor: "blue" },
                          ]}
                        >
                          {/* <ScrollView horizontal style={{ maxWidth: 350 }}> */}
                          <Text
                            adjustsFontSizeToFit
                            allowFontScaling
                            key={i}
                            {...props}
                            // style={[
                            //   styles.tableVal,
                            //   // { flex: flexWidth ? flexWidth[i] : 1 },
                            //   { flex: 3 },
                            //   dataStyle,
                            // ]}
                            style={{
                              // alignContent: "center",
                              // alignSelf: "center",
                              // textAlign: "center",
                              // textAlignVertical: "center",
                              borderWidth: 0,
                              maxWidth: "150px",
                              marginLeft: 20,
                              marginRight: 20,
                              padding: 5,
                              fontSize: 12,
                            }}
                          >
                            {d[key]}
                          </Text>
                          {/* </ScrollView> */}
                        </Col>
                      ))
                    : null}

                  <Col size={3} key={i} style={[styles.tableVal, dataStyle]}>
                    <View
                      style={{
                        alignItems: "center",
                        margin: "5px",
                      }}
                    >
                      {
                        <Button
                          testID={`${props.label}-show-btn-one`}
                          title={buttonTitle}
                          color={buttonColor}
                          {...getEvents(
                            `${props.label}-show-btn-one`,
                            props.setLayoutConfig,
                            props.setAppState,
                            props.appState
                          )}
                          // TODO : Handler is not comming props need to add this functionality
                          onPress={() => {
                            console.log("i ==> ", i);
                            console.log("d ==> ", d);
                            const res = fetch(
                              `${SERVER_ENDPOINT}v1/schema/modulelayout`,
                              {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  userId: "TsdAdmin",
                                  roleKey: 1,
                                  // TODO : Conditional for default state undefined
                                  tabName:
                                    props.appState.global != undefined
                                      ? props.appState.global.tsdApp
                                          .activeTab != undefined
                                        ? props.appState.global.tsdApp.activeTab
                                            .name
                                        : "Create Order"
                                      : "Create Order",
                                  moduleName:
                                    props.appState.global != undefined
                                      ? props.appState.global.tsdApp
                                          .activeModule != undefined
                                        ? props.appState.global.tsdApp
                                            .activeModule.name
                                        : "Service Orders"
                                      : "Service Orders",
                                  actionName: "View",
                                }),
                              }
                            )
                              .then((res) => res.json())
                              .then((_data) => {
                                console.log(
                                  "_Data in searchList ::::::",
                                  _data
                                );
                                // get data from view action
                                const res1 = fetch(
                                  `${SERVER_ENDPOINT}${_data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
                                    /{[^}]*}/,
                                    ""
                                  )}/${
                                    d[
                                      _data.businessFunctions[0].modules[0]
                                        .tabs[0].actions[0].uriParams
                                    ]
                                  }`,
                                  {
                                    method:
                                      _data.businessFunctions[0].modules[0]
                                        .tabs[0].actions[0].httpMethod,
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                      languageKey: 1,
                                    },
                                    // body: JSON.stringify(args.params.values),
                                  }
                                )
                                  .then((res1) => res1.json())
                                  .then((data) => {
                                    // console.log(
                                    //   "GET API IN SEARCH : ::::",
                                    //   data
                                    // );
                                    return data;
                                  })
                                  .then((finalData) => {
                                    console.log(
                                      "appState in Search List :::",
                                      props.appState
                                    );

                                    props.setAppState(
                                      {
                                        global: {
                                          tsdApp: {
                                            viewComponent: {
                                              [props.appState.global.tsdApp
                                                .activeTab.name]: finalData,
                                            },
                                          },
                                        },
                                      },
                                      "isPartial"
                                    );
                                  })
                                  .then(() => {
                                    console.log(
                                      "APPSTATE IN LIST VIEW : :::: ",
                                      props.appState
                                    );
                                    // props.setLayoutConfig(
                                    //   routes.detail,
                                    //   "copy"
                                    // );
                                    // TODO : REMOVE HARDCODING
                                    if (
                                      props.appState.global.tsdApp.activeModule
                                        .key === 23751 ||
                                      props.appState.global.tsdApp.activeModule
                                        .key === 156051
                                    ) {
                                      props.setLayoutConfig(
                                        routes.orderDetail,
                                        "copy"
                                      );
                                    } else {
                                      props.setLayoutConfig(
                                        routes.detail,
                                        "copy"
                                      );
                                    }
                                  });
                                // console.log("GET API IN SEARCH :::: ", res1);
                              });
                            // props.setAppState({
                            //   global: {
                            //     tsdApp: {
                            //       listComponent: {
                            //         selectedRowKey: d,
                            //       },
                            //     },
                            //   },
                            // });
                            // TODO :Search List component is missing open ticket
                            // console.log(
                            //   "appState in searchListComponent ",
                            //   props.appState
                            // );
                          }}
                        />
                      }
                    </View>
                  </Col>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Grid>
    </ScrollView>
  );
}

SearchListComponent.propTypes = {
  data: PropTypes.array,
  searchFields: PropTypes.array,
  visibleKeys: PropTypes.array,
  flexWidth: PropTypes.array,
  numberOfLines: PropTypes.number,
  titleStyle: PropTypes.object,
  dataStyle: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  searchBarWrapperStyle: PropTypes.object,
  searchBarStyle: PropTypes.object,
  buttonTitle: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonPress: PropTypes.object,
};

const styles = StyleSheet.create({
  tableHead: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    alignSelf: "flex-start",
    fontWeight: "bold",
    // borderWidth: 2,
  },
  tableVal: {
    // flex: 1,
    // padding: 5,
    // borderWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  headerRow: {
    flexDirection: "row",
    // alignContent: "flex-start",
    // textAlign: "flex-start",
    borderBottomWidth: 2,
    // borderWidth: 1,
    borderBottomColor: "grey",
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    padding: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
