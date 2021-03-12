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
}) {
  // const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [isSelected, setSelected] = useState(false);

  console.log("Props in SearchListComponent :: : ", {
    data,
    searchFields,
    visibleKeys,
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
  // const initalCheckboxState = () => {
  //   var initialStateArray = [];
  //   for (var i = 0; i < numberOfLines; i++) {
  //     initialStateArray.push(false);
  //   }
  //   return initialStateArray;
  // };
  const [checked, setChecked] = useState([]); // [false, false]
  const filterData = data.filter(createFilter(searchItem, searchFields));

  // visibleKeys.push("Action");

  const keys = visibleKeys || Object.keys(data[0] || []);

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < numberOfLines; i++) {
      tempArray.push(isSelected);
    }
    isSelected ? setChecked(tempArray) : setChecked([]);
  }, [isSelected]);

  // const toggleCheck = (i) => {
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     newState[i] = !prevState[i];
  //     return newState;
  //   });
  // };

  // const selectAll = (value) => {
  //   setSelected(value);
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     for (const i in newState) {
  //       newState[i] = value;
  //     }
  //     return newState;
  //   });
  // };

  // useEffect(() => {
  //   let allChecked = true;
  //   for (const i in checked) {
  //     if (checked[i] === false) {
  //       allChecked = false;
  //     }
  //   }
  //   if (allChecked) {
  //     setSelected(true);
  //   } else {
  //     setSelected(false);
  //   }
  // }, [isSelected]);

  // const selectAll = (value) => {
  //   setSelected(value);
  //   setSelected((prevState) => {
  //     const newState = { ...prevState };
  //     for (const i in newState) {
  //       newState[i] = value;
  //     }
  //     return newState;
  //   });
  // };t

  const checkboxHanlder = (index) => (e) => {
    const newArr = [...checked]; // copying the old datas array
    newArr[index] = !newArr[index];

    setChecked(newArr);
  };

  console.log("Checked Array : : : ", checked);

  return (
    <View style={{ flex: 1, width: "100%" }}>
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
        <ScrollView style={{ margin: 10 }}>
          {data.length && keys.length ? (
            <Row style={styles.headerRow}>
              <Col style={[styles.tableVal, dataStyle]}>
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

              {keys.map((key, i) => (
                <Col
                  style={[
                    styles.tableVal,
                    // { flex: flexWidth ? flexWidth[i] : 1 },
                    { flex: 2 },
                    titleStyle,
                  ]}
                  key={i}
                >
                  <Text
                    adjustsFontSizeToFit
                    allowFontScaling
                    style={{
                      alignContent: "center",
                      alignSelf: "center",
                      textAlign: "center",
                      textAlignVertical: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                    key={i}
                  >
                    {key.substring(0, 1).toUpperCase() + key.substring(1)}
                  </Text>
                </Col>
              ))}
              <Col
                style={[
                  styles.tableVal,
                  // { flex: flexWidth ? flexWidth[i] : 1 },
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
                    marginLeft: 20,
                    marginRight: 20,
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
                  <Col style={[styles.tableVal, dataStyle]}>
                    <Text>
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
                        <Col key={i} style={[styles.tableVal, dataStyle]}>
                          <ScrollView horizontal style={{ maxWidth: 350 }}>
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
                                alignContent: "center",
                                alignSelf: "center",
                                textAlign: "center",
                                textAlignVertical: "center",
                                // marginLeft: 20,
                                // marginRight: 20,
                                // fontWeight: "bold",
                              }}
                            >
                              {d[key]}
                            </Text>
                          </ScrollView>
                        </Col>
                      ))
                    : null}

                  <Col key={i} style={[styles.tableVal, dataStyle]}>
                    <View style={{ alignItems: "center" }}>
                      {
                        <Button
                          title={buttonTitle}
                          color={buttonColor}
                          // TODO : Handler is not comming props need to add this functionality
                          onPress={() => {
                            console.log("i ==> ", i);
                            console.log("d ==> ", d);
                            // history.push(
                            //   `/orderdetails/${d.orderKey}/${d.addressKey}`
                            // );
                            props.setAppState({
                              global: {
                                tsdApp: {
                                  listComponent: {
                                    selectedRowKey: d,
                                  },
                                },
                              },
                            });
                            // TODO :Search List component is missing open ticket
                            console.log(
                              "appState in searchListComponent ",
                              props.appState
                            );
                            props.setLayoutConfig(routes.detail);
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
    </View>
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
    padding: 5,
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
