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
import { Col, Grid, Row } from "react-native-easy-grid";
import { getEvents } from "../../layout";
import { EditField } from "./EditField";

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
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState([]);

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
    setEdit(false);
  }, [data]);

  useEffect(() => {
    if (edit == true) {
      const editItem = [];
      for (let i = 0; i < filterData.length; i++) {
        if (checked[i]) {
          editItem.push({ key: i, item: filterData[i] });
        }
      }
    } else {
      setEditItem([]);
    }
  }, [edit]);

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

  const onChangeEditItem = (id, newItem) => {
    const newEditItem = [...editItem];
    newEditItem.map((data) => {
      if (data.key == id) {
        data.item = newItem;
      }
    });
    setEditItem(newEditItem);
  };

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
              padding: 5,
              borderWidth: 1,
              borderColor: "grey",
              minWidth: 200,
            },
            searchBarStyle,
          ]}
        />
        {edit ? (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingRight: "30px",
              },
            ]}
          >
            <View
              style={{
                alignItems: "center",
                margin: "5px",
              }}
            >
              <Button
                testID={`${props.label}-save-btn-one`}
                title={"Save"}
                color={buttonColor}
                // TODO : Handler is not comming props need to add this functionality
                onPress={() => setEdit(true)}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                margin: "5px",
              }}
            >
              <Button
                testID={`${props.label}-cancel-btn-one`}
                title={"Cancel"}
                color={buttonColor}
                // TODO : Handler is not comming props need to add this functionality
                onPress={() => setEdit(false)}
              />
            </View>
          </View>
        ) : (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingRight: "30px",
              },
            ]}
          >
            <View
              style={{
                alignItems: "center",
                margin: "5px",
              }}
            >
              <Button
                testID={`${props.label}-edit-btn-one`}
                title={"Edit"}
                color={buttonColor}
                disabled={checkedCount == 0}
                // TODO : Handler is not comming props need to add this functionality
                onPress={() => setEdit(true)}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                margin: "5px",
              }}
            >
              <Button
                testID={`${props.label}-delete-btn-one`}
                title={"Delete"}
                color={buttonColor}
                disabled={!edit}
                // TODO : Handler is not comming props need to add this functionality
                // onPress={() => setEdit(false)}
              />
            </View>
          </View>
        )}
      </View>
      <Grid>
        <ScrollView
          style={{ margin: 10, height: "100%", width: "100%", flex: 1 }}
        >
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
                      disabled={edit}
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
              </Col>
            </Row>
          ) : null}
          {filterData.map((d, i) => {
            return edit && checked[i] ? (
              <Row style={{ flexDirection: "row" }}>
                <Col
                  size={1}
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
                        disabled={edit}
                        onValueChange={checkboxHanlder(i)}
                      />
                    }
                  </Text>
                </Col>
                <Col
                  size={15}
                  // style={{}}
                  style={[
                    styles.tableVal,
                    dataStyle,
                    { borderColor: "blue", flexDirection: "row" },
                  ]}
                >
                  <TouchableOpacity
                    key={d.id}
                    disabled={edit}
                    style={{ flex: 1 }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {keys.length ? (
                        <EditField
                          data={d}
                          id={i}
                          dataStyle={dataStyle}
                          keys={keys}
                          formSchema={props.editFormLayout}
                          onChangeEditItem={onChangeEditItem}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </Col>
              </Row>
            ) : (
              <Row style={{ flexDirection: "row" }}>
                <Col
                  size={1}
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
                        disabled={edit}
                        onValueChange={checkboxHanlder(i)}
                      />
                    }
                  </Text>
                </Col>
                <Col
                  size={15}
                  // style={{}}
                  style={[
                    styles.tableVal,
                    dataStyle,
                    { flexDirection: "row" },
                    { alignItems: "center", marginTop: "5px" },
                  ]}
                >
                  <TouchableOpacity
                    key={d.id}
                    disabled={edit}
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
                    </View>
                  </TouchableOpacity>
                </Col>
              </Row>
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
