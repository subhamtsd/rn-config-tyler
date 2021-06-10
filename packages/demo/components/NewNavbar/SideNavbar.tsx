/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable, Dimensions } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";
import { routes } from "../../examples/TSDigisolPlatform/configs/routes/routesConfig";
import Modal from "modal-react-native-web";
import {DataModal} from "./DataModal";
import { Ionicons } from '@expo/vector-icons';

export const SideNavbar = ({modalDisplay,functionProp,displayModule,props}:any) => {
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
    const [dataModules,setDataModules] = useState({});
    const [modalData, setModalData] = useState({"children":[]});
    const [tabView, setTabView] = useState(false);
    const [selectedIndex, setIndex] = useState(0);
    console.log("dummy :", displayModule);

    const fetchData1 = async () => {
        const res = await fetch(
          `https://run.mocky.io/v3/8ff89274-cafc-4e1e-8f7f-0a3eed2d2d54`,
          // {
          //   method: "POST",
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({}),
          // }
        ).then((res)=>{
          return res.json()})
        .then((res)=>
        {console.log("required data ",res);
        return setModalData(res)});
      };
      useEffect(()=>{
        fetchData1
    },[])
      console.log("data modal :",modalData);
      

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
                                    }
                                    }
                                >
                                    <Ionicons name="close" size={24} color="#fff" />
                                </TouchableOpacity>
                                </View>
                                {tabView ? <View>{displayModule.modules[selectedIndex].tabs.map((tab, index) =>
                                    <TouchableOpacity onPress={()=>
                                        {setDataVisible(true);
                                        fetchData1;
                                        setLayoutConfig(routes["orderDetail"], "copy");
                                    }
                                    }>
                                        <Text style={{
                                            fontSize: 14,
                                            color: "white",
                                            padding: 10,
                                        }}>
                                            {tab.tabDisplayName}
                                        </Text>
                                    </TouchableOpacity>)}
                                </View> : <View>{displayModule.modules.map((item, key) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIndex(key);
                                            setTabView(true);
                                            //setLayoutConfig(routes["editOrderLineDetail"], "copy");
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