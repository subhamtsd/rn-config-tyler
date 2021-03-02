/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { match } from "assert";
import React, { useEffect, useState } from "react";
import Modal from "modal-react-native-web";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
  Alert,
  Pressable,
} from "react-native";

import { Col, Grid, Row } from "react-native-easy-grid";
import { routes } from "../../examples/TSDigisolPlatform/configs/routes/routesConfig";
import { componentGridStyle } from "../../examples/TSDigisolPlatform/styles/common";

const TextRender = ({ textFeild, value }: any) => {
  console.log("Error value : : : ", value);
  return (
    <Row
      style={{
        margin: 3,
        // borderWidth: 1,
      }}
    >
      <Col
        style={
          {
            // borderWidth: 1,
          }
        }
      >
        <Text>{textFeild} : </Text>
      </Col>
      <Col
        style={
          {
            // borderWidth: 1,
          }
        }
      >
        <Text>{JSON.stringify(value)}</Text>
      </Col>
    </Row>
  );
};

const Item = ({ item, onPress, style }: any) => (
  <ScrollView
    style={{
      height: 300,
    }}
  >
    {" "}
    <TouchableOpacity onPress={onPress} style={[detailViewStyles.item, style]}>
      <Grid
        style={{
          flex: 1,
          // borderWidth: 3,
        }}
      >
        <Row>
          <Col>
            <Text style={detailViewStyles.title}>{item.displayName}</Text>
          </Col>
        </Row>
        <Row
          style={{
            // borderWidth: 1,
            padding: 10,
            flex: 1,
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Col
            style={
              {
                // borderWidth: 1,
              }
            }
          >
            <View>
              {Object.keys(item).map(function (keyName, keyIndex) {
                return <TextRender textFeild={keyName} value={item[keyName]} />;
              })}
            </View>
          </Col>
        </Row>
      </Grid>
    </TouchableOpacity>
  </ScrollView>
);

export const ShowEntity = (props: {
  props: {
    appState: any;
    label: any;
    styles: any;
    children: any;
    setAppState: any;
    layoutConfig: any;
    setLayoutConfig: any;
    getEvents: any;
    events: any;
  };
  viewData: any;
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
  } = props.props;

  const viewData = props.viewData;
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  // console.log("Props : : : : in ShowEntity : : : : ", appState);

  console.log("viewData : : : : ", props);

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? "#e0e0e0" : "#fff";

    return (
      <View>
        <ScrollView
          style={{
            minHeight: 450,
            flex: 1,
            borderWidth: 0,
            // minHeight: Dimensions.get("window").height - 85,
            padding: 10,
            margin: 15,
            maxHeight: 500,
            borderTopWidth: 1,
            borderTopColor: "#c5c5c5",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Grid
            style={{
              flex: 1,
              borderWidth: 0,
              // minHeight: Dimensions.get("window").height - 85,
              padding: 10,
              margin: 15,
              maxHeight: 550,
              borderTopWidth: 1,
              borderTopColor: "#c5c5c5",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <Row>
              <Col>
                <ScrollView style={{}}>
                  <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    style={{
                      backgroundColor,
                      shadowColor: "#000",
                      // shadowOffset: { width: 0, height: 2 },
                      // shadowOpacity: 0.5,
                      // shadowRadius: 2,
                      // elevation: 5,
                    }}
                  />
                </ScrollView>
              </Col>
              <Col
                style={{
                  alignSelf: "center",
                }}
              >
                <Row
                  style={{
                    flex: 1,
                    // minHeight: Dimensions.get("window").height - 85,
                    padding: 10,
                    margin: 15,
                    maxHeight: 550,
                    borderWidth: 1,
                    borderColor: "#c5c5c5",
                    // shadowColor: "#000",
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.5,
                    // shadowRadius: 2,
                    // elevation: 5,
                  }}
                >
                  <Col style={{}}>
                    <View style={detailViewStyles.buttonView}>
                      <TouchableOpacity
                        style={detailViewStyles.button}
                        onPress={() => {
                          console.log("Hello Button ");
                          const res = fetch(
                            `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
                            {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                userId: "TsdAdmin",
                                roleKey: 1,
                                moduleName:
                                  appState.global != undefined
                                    ? appState.global.tsdApp.activeModule.name
                                    : "Service Orders",
                                tabName:
                                  appState.global != undefined
                                    ? appState.global.tsdApp.activeTab.name
                                    : "CreateOrders",
                                actionName: "Edit",
                              }),
                            }
                          )
                            .then((res) => res.json())
                            .then((_data) => {
                              setAppState({
                                global: {
                                  tsdApp: {
                                    editComponent: {
                                      action: {
                                        name:
                                          _data.businessFunctions[0].modules[0]
                                            .tabs[0].actions[0].actionName,
                                        key:
                                          _data.businessFunctions[0].modules[0]
                                            .tabs[0].actions[0].actionKey,
                                        endPoint: _data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
                                          /{[^}]*}/,
                                          ""
                                        ),
                                        httpMethod:
                                          _data.businessFunctions[0].modules[0]
                                            .tabs[0].actions[0].httpMethod,
                                        showButton:
                                          _data.businessFunctions[0].modules[0]
                                            .tabs[0].actions[0].showButton,
                                      },
                                    },
                                  },
                                },
                              });
                              console.log(
                                "appState in Edit event : : : ",
                                appState
                              );
                            });
                          setLayoutConfig(routes["edit"]);
                        }}
                      >
                        {/* <Image
                          style={detailViewStyles.button}
                          source={require("../../../../assets/images/edit.svg")}
                        /> */}

                        <Text style={detailViewStyles.textStyle}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                  </Col>
                  <Col>
                    {
                      // <View style={detailViewStyles.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert("Modal has been closed.");
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <View style={detailViewStyles.centeredView}>
                          <View style={detailViewStyles.modalView}>
                            <Text style={detailViewStyles.modalText}>
                              Are you sure you want to delete ??
                            </Text>
                            <View
                              style={{
                                // borderWidth: 2,
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  margin: 10,
                                }}
                              >
                                <Pressable
                                  style={[
                                    detailViewStyles.button,
                                    detailViewStyles.buttonClose,
                                    { backgroundColor: "red" },
                                  ]}
                                  onPress={() => {
                                    // TODO : Add API for the Deleting the Selected row Data
                                    setModalVisible(!modalVisible);
                                    setLayoutConfig(routes["search"]);
                                  }}
                                >
                                  <Text style={detailViewStyles.textStyle2}>
                                    Delete
                                  </Text>
                                </Pressable>
                              </View>
                              <View
                                style={{
                                  margin: 10,
                                }}
                              >
                                <Pressable
                                  style={[
                                    detailViewStyles.button,
                                    detailViewStyles.buttonClose,
                                  ]}
                                  onPress={() => setModalVisible(!modalVisible)}
                                >
                                  <Text style={detailViewStyles.textStyle2}>
                                    Cancel
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </View>
                      </Modal>
                      // </View>
                    }
                    <View style={detailViewStyles.buttonView}>
                      <TouchableOpacity
                        style={detailViewStyles.button}
                        onPress={() => {
                          setModalVisible(true);
                        }}
                      >
                        <Text style={detailViewStyles.textStyle}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <View style={detailViewStyles.container}>
        {/* <SafeAreaView style={styles.container}> */}
        {/* <Text>{JSON.stringify(viewData)}</Text>
        <Text>{JSON.stringify(data)}</Text> */}
        <FlatList
          data={[viewData]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        {/* </SafeAreaView> */}
        {/* TODO : Remove before final demo */}
        {/* <Text>
    {JSON.stringify(props)} 
  </Text> */}
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
    marginLeft: 50,
    marginRight: 150,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5cabc5",
    height: 35,
    width: "100%",
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
    // marginLeft: 10,
    // marginRight: 10,
    color: "white",
    fontWeight: "bold",
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
    padding: 35,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
