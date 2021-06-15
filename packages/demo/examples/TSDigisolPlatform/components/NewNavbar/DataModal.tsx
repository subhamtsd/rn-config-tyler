/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable, Dimensions } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import Modal from "modal-react-native-web";
import { Ionicons } from '@expo/vector-icons';

export const DataModal = (props: {
    modalDisplay: any;
    functionProp: any;
    displayModule: any;
}) => {
    const {
        modalDisplay,
        functionProp,
        displayModule
    } = props;

    const [modalVisible, setModalVisible] = useState(modalDisplay);
    const [tabView, setTabView] = useState(false);
    const [displayDataModal,setDisplayDataModal] = useState({"children":[]})
    const [selectedIndex, setIndex] = useState(0);
    console.log("dummy :", displayModule);

    const fetchData = async () => {
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
        {console.log("required data in display ",res);
        return setDisplayDataModal(res)});
      };
      useEffect(()=>{
        fetchData();
    },[])

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
                                    style={{marginLeft:"60%",alignSelf:"flex-end"}}
                                    onPress={() => {
                                        setModalVisible(false);
                                        functionProp(false);
                                    }
                                    }
                                >
                                    <Ionicons name="close" size={24} color="#fff" />
                                </TouchableOpacity>
                                </View>
                                <View>
                                    {displayDataModal.children.map((item,index)=><TouchableOpacity><Text style={{
                                            fontSize: 14,
                                            color: "white",
                                            padding: 10,
                                        }}>{item}</Text></TouchableOpacity>)}
                                </View>
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
        marginLeft: 300,
        // marginTop: "9vh"
    },
    modalView: {
        // margin: 20,
        width: '15%',
        // position: "absolute",
        // padding: '2%',
        height: "100%",
        backgroundColor: "#3e3838",
        paddingLeft: 30,
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