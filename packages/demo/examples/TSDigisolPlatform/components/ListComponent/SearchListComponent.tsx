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
  CheckBox,
} from "react-native";
// import { CheckBox } from "@react-native-community/checkbox";
import PropTypes from "prop-types";
import SearchInput, { createFilter } from "react-native-search-filter";
import { Col, Grid, Row } from "react-native-easy-grid";
import { getEvents } from "../../layout";
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
  const [checkedCount, setCheckedCount] = useState(0);
  const [filterData, setFilterData] = useState(data);

  const keys = visibleKeys || Object.keys(data[0] || []);

  console.log("keys ::: --- ", keys, " \n : showTitleKey ::: ", showTitleKey);

  const checkAllHandler = (val) => {
    setSelected(val);
    const tempArray = [];
    for (let i = 0; i < numberOfLines; i++) {
      tempArray.push(val);
    }
    setChecked(tempArray);
    if (val) {
      setCheckedCount(numberOfLines);
    } else {
      setChecked(tempArray);
      setCheckedCount(0);
    }
  };

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < filterData.length; i++) {
      tempArray.push(false);
    }
    setChecked(tempArray);
  }, [filterData]);

  useEffect(() => {
    setFilterData(data);
    setCheckedCount(0);
  }, [data]);

  const checkboxHanlder = (index) => (e) => {
    const newArr = [...checked]; // copying the old datas array
    newArr[index] = !newArr[index];
    const addCount = newArr[index] ? 1 : -1;
    let newCount;
    setCheckedCount((oldCount) => {
      newCount = oldCount + addCount;
      return newCount;
    });
    setChecked(newArr);
    if (newCount == numberOfLines) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  // console.log("Checked Array : : : ", checked, numberOfLines, checkedCount);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          searchBarWrapperStyle,
        ]}
      >
        <SearchInput
          placeholder={inputPlaceholder || "Enter Keyword to Search"}
          onChangeText={(value) =>
            setFilterData(data.filter(createFilter(value, searchFields)))
          }
          style={[
            {
              padding: 10,
              borderWidth: 1,
              borderColor: "grey",
              width: "20vw",
              height: "5vh",
              marginLeft: 10,
            },
            searchBarStyle,
          ]}
        />
      </View>
      <ScrollView
        style={{
          margin: 10,
          flex: 1,
        }}
      >
        <ScrollView
          horizontal
          style={{
            flexDirection: "column",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <Grid
            style={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View>
              {data.length && keys.length ? (
                <Row style={styles.headerRow}>
                  <Col
                    size={1}
                    style={[
                      {
                        alignSelf: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text adjustsFontSizeToFit allowFontScaling>
                      {
                        <CheckBox
                          color="#0e73ca"
                          value={isSelected}
                          onValueChange={checkAllHandler}
                        />
                      }
                    </Text>
                  </Col>
                  <Col
                    size={15}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {showTitleKey.map((key, i) => (
                      <Col
                        // size={3}
                        style={[
                          // { flex: flexWidth ? flexWidth[i] : 1 },
                          { flex: 2 },
                          // { borderWidth: 0, borderColor: "red" },
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
                            minWidth: "150px",
                            marginLeft: 5,
                            marginRight: 20,
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
                  </Col>
                </Row>
              ) : null}
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              {filterData.map((d, i) => {
                // console.log("D : i --> ", d, "+" + " " + i);
                return (
                  <Row
                    key={d.id}
                    style={[
                      styles.tableVal,
                      {
                        flexDirection: "row",
                        flex: 1,
                        minHeight: "6vh",
                      },
                    ]}
                  >
                    <Col
                      size={1}
                      style={[
                        dataStyle,
                        // { borderColor: "blue" },
                        {
                          alignItems: "center",
                          marginTop: "5px",
                          alignSelf: "center",
                        },
                      ]}
                    >
                      <Text adjustsFontSizeToFit allowFontScaling>
                        {
                          <CheckBox
                            color="#0e73ca"
                            value={checked[i]}
                            // disabled={edit}
                            onValueChange={checkboxHanlder(i)}
                          />
                        }
                      </Text>
                    </Col>
                    <Col
                      size={15}
                      // style={{}}
                      style={[
                        // styles.tableVal,
                        dataStyle,
                        { flexDirection: "row" },
                        { alignItems: "center", marginTop: "5px" },
                      ]}
                    >
                      <TouchableOpacity
                        key={d.id}
                        // disabled={edit}
                        style={{ flex: 1 }}
                        {...getEvents(
                          `${props.label}-show-btn-one`,
                          props.setLayoutConfig,
                          props.setAppState,
                          props.appState,
                          d
                        )}
                      >
                        <View style={{ flexDirection: "row" }}>
                          {keys.length
                            ? keys.map((key, i) => (
                                // Remove numberOfLines and ellipsizeMode, if the content row span doesn't bother us
                                // Doesn't seem too polished for web
                                <Col
                                  // size={3}
                                  key={i}
                                  style={[dataStyle]}
                                >
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
                                      // borderWidth: 0,
                                      minWidth: "150px",
                                      marginLeft: 5,
                                      marginRight: 20,
                                      padding: 5,
                                      fontSize: 12,
                                    }}
                                  >
                                    {d[key]}
                                  </Text>
                                </Col>
                              ))
                            : null}
                        </View>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                );
              })}
            </View>
          </Grid>
        </ScrollView>
      </ScrollView>
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
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  headerRow: {
    flexDirection: "row",
    // alignContent: "flex-start",
    // textAlign: "flex-start",
    borderBottomWidth: 2,
    minHeight: "5vh",
    // flex: 1,
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
