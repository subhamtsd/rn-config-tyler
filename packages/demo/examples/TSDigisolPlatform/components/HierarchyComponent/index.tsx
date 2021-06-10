import React, { useState, useEffect } from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { events } from "../../configs/events/eventConfig";
import { routes } from "../../configs/routes/routesConfig";
import { ScreenJsonEditor } from "../ScreenJsonEditor";
import { componentGridStyle } from "../../styles/common";
import { ScrollView } from "react-native";
import { DataModal } from "../../../../components/NewNavbar/DataModal";

import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";

export const Hierarchy = (props: {
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
  console.log(getEvents(`${label}-btn-one`, setLayoutConfig));
  const [displayDataModal, setDisplayDataModal] = useState({"response":[{"catalogName":"one"}]});

  const fetchData = async () => {
    const res = await fetch(
      //`https://run.mocky.io/v3/8ff89274-cafc-4e1e-8f7f-0a3eed2d2d54`,
      `${SERVER_ENDPOINT}v1/catalog/list`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "TsdAdmin",
          roleKey: 1,
          // TODO : Conditional for default state undefined
          moduleName:"Catalog",
          // tabName:
          //   appState.global != undefined
          //     ? appState.global.tsdApp.activeTab != undefined
          //       ? appState.global.tsdApp.activeTab.name
          //       : "CreateOrders"
          //     : "CreateOrders",
          actionName:"Search",
        }),
      }
    ).then((res) => {
      return res.json()
    })
      .then((res) => {
        console.log("required data in display ", res);
        return setDisplayDataModal(res)
      });
  };
  const fetchCatData = async () => {
    const res = await fetch(
      //`https://run.mocky.io/v3/8ff89274-cafc-4e1e-8f7f-0a3eed2d2d54`,
      `${SERVER_ENDPOINT}v1/category/list`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "TsdAdmin",
          roleKey: 1,
          // TODO : Conditional for default state undefined
          moduleName:"Catalog",
          active:true,
          // tabName:
          //   appState.global != undefined
          //     ? appState.global.tsdApp.activeTab != undefined
          //       ? appState.global.tsdApp.activeTab.name
          //       : "CreateOrders"
          //     : "CreateOrders",
          actionName:"Search",
        }),
      }
    ).then((res) => {
      return res.json()
    })
      .then((res) => {
        console.log("required data in display ", res);
        return setDisplayDataModal(res)
      });
  };
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View>
      <View>
        {displayDataModal.response.map((item, index) => <TouchableOpacity onPress={()=>fetchCatData()} style={{}}><Text style={{
          fontSize: 14,
          color: "black",
          padding: 10,
        }}>{item.catalogName}</Text></TouchableOpacity>)}
      </View>

      {children || (appState && appState[label] && appState[label]?.children)}
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
