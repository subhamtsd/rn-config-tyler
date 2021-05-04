/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  Pressable
  // Picker
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Col, Grid, Row } from "react-native-easy-grid";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";
import { useState } from "react";
import { routes } from "../../examples/TSDigisolPlatform/configs/routes/routesConfig";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";
import { prepareSchema } from "../../examples/TSDigisolPlatform/helper/helper";
// import DatePicker from 'react-native-web-ui-components/Datepicker';
import {Calendar, CalendarList, Agenda, Arrow} from 'react-native-calendars';
import Modal from "modal-react-native-web";


export const RenderTable = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  noOfColumns: any;
  dataToRender: any;
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
    noOfColumns,
    dataToRender,
  } = props;

  const [arrObj, setArrObj] = useState([]);

  const firstParent = Object.getOwnPropertyNames(dataToRender)[0];
  console.log("First Parent ::: " + firstParent);

  console.log("Props in ---> ", props.dataToRender[firstParent]);

  const secondParent = Object.getOwnPropertyNames(
    dataToRender[Object.getOwnPropertyNames(dataToRender)[0]].properties
  );
  console.log("Second Parent: " + secondParent);
  prepareSchema(
    props.dataToRender[firstParent].properties[secondParent[0]]
  ).then((schemaJson) => {
    console.log("SCHEMA JSON UPDATED IN RENDER TABLE :: ", schemaJson);
  });

  const tableHeaderObj =
    dataToRender[firstParent].properties[secondParent[0]].items.properties;

  tableHeaderObj["actionDisplay"] = {
    title: "Action",
    type: "button",
    uid: "action",
    pattern: "[]",
  };

  const requiredField =
    dataToRender[firstParent].properties[secondParent[0]].items.required;

  const keyIdPrefix = () => {
    const keyArray = Object.getOwnPropertyNames(
      dataToRender[firstParent].properties
    );
    return keyArray[0];
  };

  const intialJson = {};
  const [item, setItem] = useState({}); // Submit one row
  const [finalItem, setFinalItem] = useState({});
  const [listOfItems, setListItems] = useState([]); // Store all array of row data
  const [isSelected, setSelected] = useState(false);
  const [noOfRows, setNoOfRows] = useState(-1);
  const [noOfAddItemClick, setnoOfAddItemClick] = useState(-1);
  const [date, setDate] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  // const [currentRow,setCurrentRow] = useStateWithCallback(0,
  //   (currentRow)=>{
  //     console.log("currentRowInitial",currentRow)
  //     setModalVisible(!modalVisible)
  //   });

  console.log("finalItem : : : ", finalItem);
  console.log("ITEM :::",item);
  

  useEffect(() => {
    if (finalItem !== {}) {
      // If clicked on same row to add and finalItem is not equal to item
      if (finalItem[keyIdPrefix()] === noOfAddItemClick || finalItem !== item) {
        setListItems(() => [...listOfItems, finalItem]);
      }
    }
  }, [finalItem]);

  const fetchApi = (endPoint, httpMethod, body, routeToRedirect) => {
    const res1 = fetch(`${SERVER_ENDPOINT}${endPoint}`, {
      method: httpMethod,
      // method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((_data) => {
        setAppState({
          global: {
            tsdApp: {
              createComponent: {
                [appState.global.tsdApp.activeTab.name]: _data,
                formData: body,
              },
              viewComponent: {
                [appState.global.tsdApp.activeTab.name]: _data,
              },
            },
          },
        });
        console.log("DATA UPDATED .......");
        setLayoutConfig(routeToRedirect, "copy");
      });
  };

  const deleteHandler = (arrKey: any) => {
    console.log("array item : : ", listOfItems[arrKey]);
    setListItems(listOfItems.slice(listOfItems[arrKey], 1));
    setArrObj(arrObj.slice(arrObj[arrKey], 1));
  };
  
  let selectedDates = {};
  // const addDates = (prevDate) => {
  //   return {...prevDate,[keyIndex]:day.dateString}
  // }

  const rowSection = arrObj.map((arrKey,arrIndex) => {
     console.log("arrIndex : : : ", arrIndex);
    console.log("stateDate::::",date);
    
    return (
      <Row>
        {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
          console.log("keyIndex:::",keyIndex);
          // console.log("arrIndex : : : ", arrIndex);
          const schema = {
            type: "object",
            required: requiredField,
            properties: {
              // TODO : Here keyName should be replaced by value of variable keyName
              //   TODO : The label of each field needed to be hidden
              [keyName]: tableHeaderObj[keyName],
            },
          };
          
          if (schema?.properties?.[keyName]?.format === "date") {
            
            return (
              <Row
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "grey",
                  width: "100%",
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Col>
                  {<Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={detailViewStyles.centeredView}>
                      <View style={detailViewStyles.modalView}>
                        <Calendar
                          theme={{
                            backgroundColor: '#000',
                            calendarBackground: '#fff',
                            arrowColor: 'orange'
                          }}
                          // Initially visible month. Default = Date()
                          //current={new Date().toISOString().slice(0, 10)}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2012-05-10'}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2025-05-30'}
                          // Handler which gets executed on day press. Default = undefined
                          onDayPress={(day) => {
                            setDate({...date,[arrIndex]:day.dateString});
                            // setItem({...item,[keyName]:date[arrIndex]})
                            console.log("FINAL ITEMS ",item);
                            
                          }}
                          // Handler which gets executed on day long press. Default = undefined
                          onDayLongPress={(day) => { console.log('selected day', day) }}
                          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                          monthFormat={'yyyy MMM'}
                          // Handler which gets executed when visible month changes in calendar. Default = undefined
                          onMonthChange={(month) => { console.log('month changed', month) }}
                          // Hide month navigation arrows. Default = false
                          hideArrows={false}
                          // Replace default arrows with custom ones (direction can be 'left' or 'right')
                          //renderArrow={(direction) => (<Arrow/>)}
                          // Do not show days of other months in month page. Default = false
                          hideExtraDays={true}
                          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                          // day from another month that is visible in calendar page. Default = false
                          disableMonthChange={false}
                          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                          firstDay={1}
                          // Hide day names. Default = false
                          hideDayNames={false}
                          // Show week numbers to the left. Default = false
                          showWeekNumbers={false}
                          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                          onPressArrowLeft={subtractMonth => subtractMonth()}
                          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                          onPressArrowRight={addMonth => addMonth()}
                          // Disable left arrow. Default = false
                          disableArrowLeft={false}
                          // Disable right arrow. Default = false
                          disableArrowRight={false}
                          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                       
                          // Replace default month and year title with custom one. the function receive a date as parameter.
                          // Enable the option to swipe between months. Default = false
                          enableSwipeMonths={true}
                          markedDates={{
                           //[date.dateString]: {selected: true},
                            //[date.arrIndex] : {selected:true}
                            [date[arrIndex]]:{selected:true}
                          }}
                        />
                        <View
                          style={detailViewStyles.insideText}
                        >
                            <Pressable onPress={() => {
                              console.log("FINALDATE",date);
                              setItem({...item,[keyName]:date[arrIndex]})
                              setModalVisible(false)
                            }}>
                              <Text style={detailViewStyles.textStyle2}>
                                Close
                              </Text>
                            </Pressable>
                          
                        </View>
                      </View>
                    </View>
                  </Modal>}
                  <TouchableOpacity
                    style={detailViewStyles.button}
                    onPress={() => {
                      // setCurrentRow({arrIndex},()=>console.log()
                      // );
                      // setCurrentRow(arrIndex)
                      console.log("wantedIndex",arrIndex);
                      setModalVisible(!modalVisible)
                    }}
                  >
                    <Text style={detailViewStyles.textStyle}>{date[arrIndex]==undefined?(new Date().toISOString().slice(0, 10)):(date[arrIndex])}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            );
          }

          if (schema?.properties?.[keyName]?.displayType === "dropdown") {
            return (
              <Row
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "grey",
                  width: 140,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Col>
                  <Picker
                    //selectedValue={item[keyName]}
                    style={{
                      borderWidth: 1,
                      width: `100%`,
                      height: 36,
                      borderColor: "grey",
                      marginTop: 5,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      // setSelectedLanguage(itemValue);
                      setItem({
                        ...item,
                        [keyName]: itemValue,
                      });
                    }}
                  >
                    {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                    {schema?.properties?.[keyName]?.enum.map((ele, i) => {
                      return <Picker.Item label={ele} value={ele} key={i} />;
                    })}
                  </Picker>
                </Col>
              </Row>
            );
          }
          // TODO : schema element with Action button
          if (schema?.properties?.[keyName]?.type === "button") {
            return (
              <Col
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "grey",
                }}
              >
                <View
                  style={{
                    padding: 5,
                    width: `60%`,
                    alignContent: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        marginRight: 3,
                      }}
                    >
                      <Button
                        title={`+`}
                        color={"green"}
                        disabled={false}
                        onPress={() => {
                          console.log("Add Item");
                          // Submit the current row
                          // setItem --> push item into listOfItem
                          // IF data changed in row pushed --> push item into listOfItem
                          // If data not changed in the row --> Donot push into listOfItem
                          // TODO : BUG on double click it add same item every time
                          // TODO : wRITE A CALL BACK
                          setnoOfAddItemClick(noOfAddItemClick + 1);
                          item[keyIdPrefix()] = noOfRows;
                          // console.log("finalItem : : : ", finalItem);
                          console.log("Item : : : : ", item);
                          if (finalItem == {} || finalItem !== item) {
                            setFinalItem(item);
                          }
                          setItem({});
                        }}
                      ></Button>
                    </View>
                    <View
                      style={{
                        marginRight: 3,
                      }}
                    >
                      <Button
                        title={`x`}
                        color={"red"}
                        disabled
                        onPress={() => deleteHandler(arrKey)}
                      ></Button>
                    </View>
                  </View>
                </View>
              </Col>
            );
          }

          return (
            <Row
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "grey",
                width: 140,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 5,
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <Col>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: `100%`,
                    height: 30,
                    borderColor: "grey",
                    marginTop: 5,
                    padding: 17,
                  }}
                  onChangeText={(text) => {
                    setItem({
                      ...item,
                      [keyName]: text,
                    });
                    // setFinalItem({
                    //   ...item,
                    //   [keyName]: text,
                    // });
                  }}
                ></TextInput>
              </Col>
            </Row>
          );
        })}
      </Row>
    );
  });

  return (
    <View style={componentGridStyle}>
      <Row>
        <Col
          style={{
            marginLeft: 60,
            marginRight: 60,
            marginBottom: 20,
          }}
        >
          {/* ******************** Add Rows Button ******************** */}
          <Button
            title={`Add Row`}
            color="#0e73ca"
            onPress={() => {
              console.log("Add Row Clicked");
              // create new row
              // setNoOfRows(noOfRows + 1);
              setArrObj([...arrObj, noOfRows + 1]);
              setItem({});
              setNoOfRows(noOfRows + 1);
            }}
          ></Button>
        </Col>
        <Col
          style={{
            marginLeft: 60,
            marginRight: 60,
            marginBottom: 20,
          }}
        >
          {/* ******************** COPY ROWS BUTTON ********************************* */}
          <Button
            title={`Copy Row`}
            color="#0e73ca"
            disabled
            onPress={() => {
              console.log("Copy Row Clicked");
              // copy the last row
            }}
          ></Button>
        </Col>
      </Row>
      <ScrollView
        style={{
          borderWidth: 0,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        <Grid>
          {/* TABLE HEADER DATA */}
          <Row>
            {Object.keys(tableHeaderObj).map(function (keyName, keyIndex) {
              return (
                <Row
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "grey",
                    width: 140,
                    padding: 5,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Col
                    size={7.1}
                    style={
                      {
                        //   borderWidth: 3,
                        //   borderRightWidth: 2,
                        //   width: 220,
                        //   // padding: 5,
                        //   marginTop: 5,
                        //   alignContent: "center",
                        //   alignSelf: "center",
                      }
                    }
                  >
                    <Text
                      style={{
                        alignContent: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "15",
                      }}
                    >
                      {tableHeaderObj[keyName].title}
                    </Text>
                  </Col>
                </Row>
              );
            })}
          </Row>
          {/* TABLE DATA ROW */}
          <ScrollView
            style={{
              // borderWidth: 2,
              maxHeight: 250,
              height: 250,
            }}
          >
            {rowSection}
          </ScrollView>
          {/* TODO : This iteration should be done with the help of loop */}
        </Grid>
      </ScrollView>
      <View style={{ borderWidth: 0, marginLeft: 450, marginTop: 20 }}>
        <Button
          title={`Submit`}
          color="#0e73ca"
          onPress={() => {
            console.log("Final submit");
            const finalData =
              appState.global.tsdApp.createComponent[
              appState.global.tsdApp.activeTab.name
              ];
            console.log("final Data in the body Parameter 1st ::: ", finalData);
            finalData[firstParent] = {
              [secondParent[0]]: listOfItems,
            };
            console.log("final Data in the body Parameter 2nd ::: ", finalData);
            fetchApi(
              appState.global.tsdApp.activeAction.endPoint,
              "POST",
              finalData,
              routes["detail"]
            );
          }}
        ></Button>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const detailViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  item: {
    padding: 10,
    margin: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    opacity: 1,
    // borderRadius: 2,
    // height: 330,
    // alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    color: "#0d47a1",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#0d47a1",
    textAlign: "left",
  },
  subInfo: {
    fontSize: 12,
    color: "#1565c0",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonView: {
    marginLeft: 1,
    marginRight: 1,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: 35,
    width: "100%",
    marginTop: 4,
    marginBottom: 2,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  textStyle: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 10,
    marginRight: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    width: 100
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "#cccccc",
    borderRadius: 1,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  insideText: {
    width: 100
  }
});