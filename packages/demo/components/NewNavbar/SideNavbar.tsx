/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable, Dimensions } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";
import { routes } from "../../examples/TSDigisolPlatform/configs/routes/routesConfig";
import Modal from "modal-react-native-web";
import {DataModal} from "./DataModal";
import { Ionicons } from '@expo/vector-icons';

export const SideNavbar = ({modalDisplay,functionProp,stylingProp,displayModule,props}:any) => {
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

    const [modalVisible, setModalVisible] = useState(modalDisplay);
    const [dataVisible, setDataVisible] = useState(false);
    const [activeModule,setActiveModule] = useState("");
    const [moduleKey,setActiveModuleKey] = useState(-1);
    const [dataModules,setDataModules] = useState({});
    const [modalData, setModalData] = useState({"children":[]});
    const [tabView, setTabView] = useState(false);
    const [data,setdata] = useState([]);
    const [selectedIndex, setIndex] = useState(0);
    console.log("dummy :", displayModule);

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(`${SERVER_ENDPOINT}v1/schema/modulelayout`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "TsdAdmin",
              roleKey: 1,
              // TODO : Conditional for default state undefined
              moduleName:
                appState.global != undefined
                  ? activeModule !=""
                    ? activeModule
                    : "ServiceOrders"
                  : "ServiceOrders",
              // tabName:
              //   appState.global != undefined
              //     ? appState.global.tsdApp.activeTab != undefined
              //       ? appState.global.tsdApp.activeTab.name
              //       : "CreateOrders"
              //     : "CreateOrders",
              actionName:
                appState.global != undefined
                  ? appState.global.tsdApp.activeAction != undefined
                    ? appState.global.tsdApp.activeAction.name
                    : "Search"
                  : "Search",
            }),
          });
          const resJSON = await res.json();
          // console.log("active module : : : :", state.activeModuleSelection);
          // console.log(
          //   "Buisness Functions with Tabs",
          //   resJSON.businessFunctions[0].modules[0].tabs
          // );
          setdata(resJSON.businessFunctions[0].modules[0].tabs);
        };
        fetchData();
      }, []);

    console.log("data modal :",data);
    console.log("state of newNavbar :",appState);
      

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={sidenavStyles.centeredView}>

                    <View style={{ justifyContent: "flex-start", height: "100%", }}>
                        <View style={sidenavStyles.modalView}>
                            <View style={{ height: "100%" }}>
                                <View style={{display:"flex",flexDirection:"row"}}>
                                {tabView ? <TouchableOpacity
                                    onPress={() => {
                                        setTabView(false);
                                    }
                                    }
                                >
                                    <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                                </TouchableOpacity>: null}
                                {tabView ? <Text style={{
                                                marginTop: -10,
                                                fontSize: 20,
                                                color: "white",
                                                fontWeight: "bold",
                                                padding: 10,
                                            }}>{displayModule.modules[selectedIndex].moduleDisplayName}</Text>: <Text style={{
                                                marginTop: -15,
                                                fontSize: 24,
                                                color: "white",
                                                fontWeight: "bold",
                                                padding: 10,
                                            }}>{displayModule.functionName}</Text>}
                                <TouchableOpacity
                                    style={{alignItems:"flex-end"}}
                                    onPress={() => {
                                        setModalVisible(false);
                                        functionProp(false);
                                        stylingProp("");
                                    }
                                    }
                                >
                                    <Ionicons name="close" size={24} color="#fff" />
                                </TouchableOpacity>
                                </View>
                                {tabView ? <View>{displayModule.modules[selectedIndex].tabs.map((item, index) =>
                                    <TouchableOpacity onPress={()=>
                                        {setDataVisible(true)
                                            setAppState(
                                                {
                                                  global: {
                                                    tsdApp: {
                                                        activeModule: {
                                                                      name: activeModule,
                                                                      key: moduleKey,
                                                                    },
                                                      activeTab: {
                                                        name: item.tabName,
                                                        key: item.tabKey,
                                                      },
                                                      activeAction: {
                                                        name: item.actions[0].actionName,
                                                        key: item.actions[0].actionKey,
                                                        endPoint: item.actions[0].endPoint,
                                                        httpMethod: item.actions[0].httpMethod,
                                                        showButton: item.actions[0].showButton,
                                                      },
                                                      createComponent: null,
                                                      listComponent: {
                                                        data: {
                                                          response: [],
                                                        },
                                                      },
                                                      formData: null,
                                                    },
                                                  },
                                                },
                                                "isPartial"
                                              );
                                    }
                                    }>
                                        <Text style={{
                                            fontSize: 14,
                                            color: "white",
                                            padding: 10,
                                        }}>
                                            {item.tabDisplayName}
                                        </Text>
                                    </TouchableOpacity>)}
                                </View> : <View>{displayModule.modules.map((item, key) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIndex(key);
                                            setTabView(true);
                                            setActiveModule(item.moduleName);
                                            setActiveModuleKey(item.moduleKey);
                                            // const filteredAction = item.tabs[0].actions.find(
                                            //     ({ actionName }) => actionName === "Search"
                                            //   );
                                            //   setAppState({
                                            //     global: {
                                            //       tsdApp: {
                                            //         activeModule: {
                                            //           name: item.moduleName,
                                            //           key: item.moduleKey,
                                            //         },
                                            //         activeTab: {
                                            //           name: item.tabs[0].tabName,
                                            //           key: item.tabs[0].tabKey,
                                            //         },
                                            //         activeAction: {
                                            //           name: filteredAction.actionName,
                                            //           key: filteredAction.actionKey,
                                            //           endPoint: filteredAction.endPoint,
                                            //           httpMethod: filteredAction.httpMethod,
                                            //           showButton: filteredAction.showButton,
                                            //         },
                                            //       },
                                            //     },
                                            //   });
                                            //   setLayoutConfig(routes["defaultAppConfig"], "copy");
                                        }
                                        }
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: "white",
                                                padding: 10,
                                            }}>
                                            {item.moduleDisplayName}
                                        </Text>
                                    </TouchableOpacity>
                                ))}</View>}
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const sidenavStyles = StyleSheet.create({
    centeredView: {
        minHeight: Dimensions.get("screen").height - 1000,
        // position:"absolute",
        flex: 1,
        // borderWidth: 4,
        // borderColor: "pink",
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
        // padding: 50,
        marginLeft: 90,
        // marginTop: "9vh"
    },
    modalView: {
        // margin: 20,
        width: '15%',
        // position: "absolute",
        // padding: '2%',
        height: "100%",
        backgroundColor: "#4a4542",
        paddingLeft: 10,
        paddingTop: 50,
        // borderRadius: 5,
        // marginHorizontal: 70,
        // marginVertical: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    buttonClose: {
        alignItems: "center",
        backgroundColor: '#f48b29',
        height: 35,
        width: "30%",
        marginTop: 20,
        marginBottom: 5,
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
    text: {
        color: "#fff",
        marginTop: 30,
        // paddingRight: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalCancelText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});