/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "modal-react-native-web";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Col, Grid, Row } from "react-native-easy-grid";
import { routes } from "../../configs/routes/routesConfig";
import { componentGridStyle } from "../../styles/common";
import { ShowQRCodeComponent } from "../../components/ShowQRCodeComponent";

const TextRender = ({ textFeild, value }: any) => {
  // console.log("Error value : : : ", value);
  const valueToShow = JSON.stringify(value);
  const lengthOfValue = valueToShow.length;
  const finalValue = valueToShow.substring(1, lengthOfValue - 1);
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
        <Text style={{ color: "#6B7280", fontWeight: "500", fontSize: 14 }}>
          {textFeild} :{" "}
        </Text>
      </Col>
      <Col
        style={
          {
            // borderWidth: 1,
          }
        }
      >
        <Text
          style={{
            color: "#000",
            fontStyle: "italic",
            fontWeight: "400",
            fontSize: 14,
          }}
        >
          {finalValue}
        </Text>
      </Col>
    </Row>
  );
};

const Item = ({ item, onPress, style, UItitle }: any) => (
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
            <Text style={detailViewStyles.title}>{UItitle}</Text>
          </Col>
        </Row>
        <Row
          style={{
            // borderWidth: 1,
            padding: 10,
            flex: 1,
            marginTop: 10,
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
    UItitle: any;
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
    UItitle,
    events,
  } = props.props;

  console.log("Layout Config in showEntity :::: ", label);

  const viewData = props.viewData;
  const [modalQRVisible, setModalQRVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log("appState : : : : in ShowEntity : : : : ", props.props);

  console.log("viewData in showEntity : :: : : ", viewData);

  const [selectedId, setSelectedId] = useState(null);
  const [qrcodeVisible, setqrcodeVisible] = useState(true);
  const [isOrderScreen, setIsOrderScreen] = useState(false);

  useEffect(() => {
    if (appState.$global.tsdApp.activeModule.key === 23751) {
      // TODO : REMOVE HARDCODING for service order
      setIsOrderScreen(true);
    } else if (appState.$global.tsdApp.activeModule.key === 156051) {
      // TODO : REMOVE HARDCODING for sales order
      setIsOrderScreen(true);
    } else {
      setIsOrderScreen(false);
    }
  }, [appState.$global.tsdApp.activeModule.key]);

  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? "#e0e0e0" : "#fff";
    const QRbackgroundColor =
      appState.$global.tsdApp.activeModule.name === "ServiceOrders" ||
      appState.$global.tsdApp.activeModule.name === "SalesOrder"
        ? 1
        : 0.3;

    return (
      <View>
        <ScrollView style={componentGridStyle}>
          <Grid
            style={{
              flex: 1,
              margin: 15,
              borderTopWidth: 1,
              borderTopColor: "#c5c5c5",
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <Row
              style={{
                flex: 1,
                paddingVertical: "1%",
                paddingHorizontal: 10,
                marginLeft: "70%",
                marginRight: "2%",
                maxHeight: 550,
                borderWidth: 0,
                borderColor: "#c5c5c5",
              }}
            >
              {/* <Col>
                <Text>{UItitle}</Text>
              </Col> */}
              <Col style={{}}>
                <View style={detailViewStyles.buttonView}>
                  <Feather
                    name="edit-2"
                    size={24}
                    color="black"
                    testID={`${label}-edit-btn`}
                    {...getEvents(
                      `${label}-edit-btn`,
                      setLayoutConfig,
                      setAppState,
                      appState,
                      viewData
                    )}
                  />
                </View>
              </Col>

              <Col style={{}}>
                {
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalQRVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalQRVisible(!modalQRVisible);
                    }}
                  >
                    <View style={detailViewStyles.centeredView}>
                      <View style={detailViewStyles.modalQRView}>
                        <View
                          style={{
                            width: "100%",
                            height: 40,
                            borderTopEndRadius: 5,
                            borderTopStartRadius: 5,
                            backgroundColor: "#ccc",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Order Details</Text>
                        </View>
                        <ShowQRCodeComponent
                          appState={appState}
                          label={label}
                          styles={styles}
                          children={children}
                          setAppState={setAppState}
                          layoutConfig={layoutConfig}
                          setLayoutConfig={setLayoutConfig}
                          events={events}
                          getEvents={getEvents}
                          qrcodeImage={
                            viewData.qrName === undefined ||
                            viewData.qrName === ""
                              ? "default.png"
                              : viewData.qrName
                          }
                        />
                        <Pressable
                          style={[
                            detailViewStyles.buttonQR,
                            detailViewStyles.buttonClose,
                          ]}
                          onPress={() => setModalQRVisible(!modalQRVisible)}
                        >
                          <Text style={detailViewStyles.textStyle2}>close</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                }
                <View style={detailViewStyles.buttonView}>
                  <Ionicons
                    name="ios-qr-code-outline"
                    size={24}
                    color="black"
                    disabled={
                      appState.$global.tsdApp.activeModule.name ===
                        "ServiceOrders" ||
                      appState.$global.tsdApp.activeModule.name === "SalesOrder"
                        ? false
                        : true
                    }
                    testID={`${label}-QR-btn`}
                    {...getEvents(
                      `${label}-QR-btn`,
                      setLayoutConfig,
                      setAppState,
                      appState,
                      setModalQRVisible
                    )}
                    // onPress={() => {
                    //   console.log("Button Clicked ::: --> ", viewData?.qrLink);
                    //   const qrcodeStatus = !qrcodeVisible;
                    //   setModalQRVisible(!modalQRVisible);
                    // }}
                  />
                </View>
              </Col>

              <Col>
                {
                  // <View style={detailViewStyles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDeleteVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalDeleteVisible(!modalDeleteVisible);
                    }}
                  >
                    <View style={detailViewStyles.centeredView}>
                      <View style={detailViewStyles.modalDeleteView}>
                        <Text style={detailViewStyles.modalText}>
                          Are you sure you want to delete ?
                        </Text>
                        <View
                          style={{
                            // borderWidth: 2,
                            flexDirection: "row",
                          }}
                        >
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
                                testID={`${label}-delete-btn`}
                                {...getEvents(
                                  `${label}-delete-btn`,
                                  setLayoutConfig,
                                  setAppState,
                                  appState
                                )}
                                style={[
                                  detailViewStyles.button,
                                  detailViewStyles.buttonClose,
                                  { backgroundColor: "red" },
                                ]}
                                onPress={() => {
                                  // TODO : Add API for the Deleting the Selected row Data
                                  setModalDeleteVisible(!modalDeleteVisible);
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
                                        moduleName:
                                          appState?.$global?.tsdApp != undefined
                                            ? appState.$global.tsdApp
                                                .activeModule.name
                                            : "Service Orders",
                                        tabName:
                                          appState?.$global?.tsdApp != undefined
                                            ? appState.$global.tsdApp.activeTab
                                                .name
                                            : "CreateOrders",
                                        actionName: "Delete",
                                      }),
                                    }
                                  )
                                    .then((res) => res.json())
                                    .then((_data) => {
                                      console.log(
                                        "_Data  in showEntity : :: ",
                                        _data
                                      );

                                      setAppState(
                                        {
                                          $global: {
                                            tsdApp: {
                                              deleteComponent: {
                                                action: {
                                                  name: _data
                                                    .businessFunctions[0]
                                                    .modules[0].tabs[0]
                                                    .actions[0].actionName,
                                                  key: _data
                                                    .businessFunctions[0]
                                                    .modules[0].tabs[0]
                                                    .actions[0].actionKey,
                                                  endPoint:
                                                    _data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
                                                      /{[^}]*}/,
                                                      ""
                                                    ),
                                                  uriParams:
                                                    _data.businessFunctions[0]
                                                      .modules[0].tabs[0]
                                                      .actions[0].uriParams,
                                                  httpMethod:
                                                    _data.businessFunctions[0]
                                                      .modules[0].tabs[0]
                                                      .actions[0].httpMethod,
                                                  showButton:
                                                    _data.businessFunctions[0]
                                                      .modules[0].tabs[0]
                                                      .actions[0].showButton,
                                                },
                                              },
                                            },
                                          },
                                        },
                                        "isPartial"
                                      );
                                      // console.log(
                                      //   "DELETE API PART :::: ::",
                                      //   appState.$global.tsdApp.viewComponent[
                                      //     appState.$global.tsdApp.activeTab
                                      //       .name
                                      //   ][
                                      //     _data.businessFunctions[0]
                                      //       .modules[0].tabs[0].actions[0]
                                      //       .uriParams
                                      //   ]
                                      // );

                                      // TODO : Appstate was getting delayed from adding the state for delete action made direct api data to add endpoint and uriparams
                                      const res = fetch(
                                        `${SERVER_ENDPOINT}${_data.businessFunctions[0].modules[0].tabs[0].actions[0].endPoint.replace(
                                          /{[^}]*}/,
                                          ""
                                        )}${
                                          appState.$global.tsdApp.viewComponent[
                                            appState.$global.tsdApp.activeTab
                                              .name
                                          ][
                                            _data.businessFunctions[0]
                                              .modules[0].tabs[0].actions[0]
                                              .uriParams
                                          ]
                                        }`,
                                        {
                                          method:
                                            _data.businessFunctions[0]
                                              .modules[0].tabs[0].actions[0]
                                              .httpMethod,
                                          headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            isHardDelete: "true",
                                          }),
                                        }
                                      );
                                    })
                                    .then((result) => {
                                      // const keyName =
                                      //   appState.$global.tsdApp.deleteComponent
                                      //     .action.uriParams;
                                      console.log(
                                        "result : : : : in showEntity : :: : ",
                                        result
                                      );
                                    });
                                  setLayoutConfig(routes["search"], "copy");
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
                                onPress={async () => {
                                  // remove the delete action from delete component in action
                                  setModalDeleteVisible(!modalDeleteVisible);
                                  await setAppState(
                                    {
                                      $global: {
                                        tsdApp: {
                                          deleteComponent: {
                                            action: {},
                                          },
                                        },
                                      },
                                    },
                                    "isPartial"
                                  );
                                }}
                              >
                                <Text style={detailViewStyles.textStyle2}>
                                  Cancel
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  // </View>
                }
                <View style={detailViewStyles.buttonView}>
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="black"
                    // style={detailViewStyles.button}
                    onPress={() => {
                      setModalDeleteVisible(true);
                    }}
                  />
                </View>
              </Col>
            </Row>
            <Row>
              <Col>
                <ScrollView style={{}}>
                  <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    style={{
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                    }}
                    UItitle={UItitle}
                  />
                </ScrollView>
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
          keyExtractor={(item) => {
            console.log("item.id ::: ", item);
            item?.id || {};
          }}
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
    padding: 5,
    margin: 5,
    marginVertical: 0,
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
    color: "#343A40",
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
    backgroundColor: "#0e73ca",
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
  buttonQR: {
    alignItems: "center",
    height: 35,
    width: "30%",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 30,
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
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 50,
  },
  modalQRView: {
    // margin: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 70,
    marginVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  modalDeleteView: {
    // margin: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 70,
    marginVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  QRcontainer: {
    backgroundColor: "#f3f9fb",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
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
    marginHorizontal: 30,
    marginVertical: 35,
  },
});
