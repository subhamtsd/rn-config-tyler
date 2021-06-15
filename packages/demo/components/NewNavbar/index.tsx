import React, { useState, useEffect } from "react";
import { Button, Text, View, Pressable, Modal, StyleSheet } from "react-native";
import { SideNavbar } from "./SideNavbar";
import { SERVER_ENDPOINT } from "../../../../../../config/endpoint";

import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';

// import Foundation from "../../../../assets/icons/Foundation.svg";
// import File from "../../../../assets/icons/file.svg";
// import Configurator from "../../../../assets/icons/Configurator.png";

import { TouchableOpacity } from "react-native-web";

export const NewNavbar = (props: {
    appState: any;
    label: any;
    styles: any;
    children: any;
    setAppState: any;
    layoutConfig: any;
    setLayoutConfig: any;
    getEvents: any;
    events: any;
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
    } = props;

    console.log(`label is ${label}`);
    // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
    console.log(props.appState);

    const [listDataSource, setListDataSource] = useState([]);
    const [activeFunction,setActiveFunction] = useState("");
    const [visible, setVisible] = useState(false);
    const [modules,setModules] = useState({});

    let moduleJSON;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                // `https://run.mocky.io/v3/1f38d881-eaae-4fcd-b6fe-05fdc83f5554`,
                `${SERVER_ENDPOINT}v1/schema/`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: "TsdAdmin",
                        roleKey: 1,
                    }),
                }
            );
            const resJSON = await res.json();
            //   moduleJSON=resJSON;
            setListDataSource(resJSON.businessFunctions);
        };
        fetchData();
        // console.log("appState in useEffect : : : ", appState);
        // setAppState({ global: { total: 1 } });
    }, []);
    console.log("data of BusinessFunctions :", listDataSource);
    console.log("data of modules :", modules);

    return (
        <View style={{ height: "100vh", display: "flex", flexDirection: "row", position: "fixed",marginTop:-35 }}>
            <View style={{ height: "100%", width: "90px", backgroundColor: "#373330", alignItems: "center" }}>
                <View style={{ backgroundColor: activeFunction==="foundation"?"#4a4542":"#373330",width:"100%",paddingVertical:"20%" ,marginTop: "10vh", alignItems: "center" }}>
                    {/* hard coded because not sure how to get the icons */}
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            setModules(listDataSource[0]);
                            setActiveFunction("foundation");
                            console.log('pressed open');
                        }}
                    >
                        <FontAwesome5
                            name="layer-group"
                            size={24}
                            color="#aaa6a0"
                            style={{marginBottom: 10, alignSelf: "center" }}
                        />
                        <Text
                            style={{color:"#aaa6a0",fontSize:10,fontWeight:"bold"}}
                        >
                            FOUNDATION
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: activeFunction==="sales"?"#4a4542":"#373330",width:"100%",paddingVertical:"30%", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            setModules(listDataSource[1]);
                            setActiveFunction("sales");
                            console.log('pressed open');
                        }}
                    >
                        <Foundation
                            name="dollar" 
                            size={40} 
                            color="#aaa6a0"
                            style={{marginBottom: 5, alignSelf: "center" }}    
                        />
                        <Text style={{color:"#aaa6a0",fontSize:10,fontWeight:"bold"}}>SALES</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: activeFunction==="postsales"?"#4a4542":"#373330",width:"100%",paddingVertical:"30%", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            setModules(listDataSource[2]);
                            setActiveFunction("postsales");
                            console.log('pressed open');
                        }}
                    >
                        <FontAwesome5 
                            name="file-invoice-dollar" 
                            size={24} 
                            color="#aaa6a0"
                            style={{marginBottom: 15, alignSelf: "center" }}   
                        />
                        <Text style={{color:"#aaa6a0",fontSize:10,fontWeight:"bold"}}>POST SALES</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: activeFunction==="configurator"?"#4a4542":"#373330",width:"100%",paddingVertical:"30%", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                            setModules(listDataSource[3]);
                            setActiveFunction("configurator");
                            console.log('pressed open');
                        }}
                    >
                        <FontAwesome5 
                            name="rocket" 
                            size={24} 
                            color="#aaa6a0" 
                            style={{marginBottom: 15, alignSelf: "center" }}  
                        />
                        <Text style={{color:"#aaa6a0",fontSize:10,fontWeight:"bold"}}>CONFIGURATOR</Text>
                    </TouchableOpacity>
                </View>
                {/* <Pressable
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#f48b29',
                        height: 35,
                        width: '32%',
                        marginTop: 20,
                        paddingTop: 7,
                        paddingBottom: 5,
                        paddingLeft: 30,
                        paddingRight: 30,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
                    onPress={() => {
                        setVisible(true);
                        console.log('pressed open');
                    }}>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>open</Text>
                </Pressable> */}
            </View>

            {
                visible && <SideNavbar
                    modalDisplay={visible}
                    functionProp={setVisible}
                    stylingProp={setActiveFunction}
                    displayModule={modules}
                    props={props}
                />
            }
        </View>
    );

};

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
        padding: 50,
    },
    modalView: {
        // margin: 20,
        width: '70%',
        padding: '2%',
        backgroundColor: '#f3f9fb',
        height: "100vh",
        marginLeft: 15,
        marginVertical: -75,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    buttonClose: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        height: 35,
        width: '30%',
        marginTop: 20,
        marginBottom: 5,
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    errorMessage: {
        color: '#545454',
        // paddingRight: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalCancelText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});