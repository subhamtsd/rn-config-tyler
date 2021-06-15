import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

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
  const [displayDataModal, setDisplayDataModal] = useState({"response":[{"catalogName":"loading","categoryName":"loading"}]});
  const [key,setKey]=useState(0);

  const fetchData = async () => {
    const res = await fetch(
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
          moduleName:"Catalog",
          actionName:"Search",
        }),
      }
    ).then((res) => {
      return res.json()
    })
      .then((res) => {
        console.log("required data in display ", res);
        setDisplayDataModal(res)
      });
  };
  const fetchCatData = async () => {
    const res = await fetch(
      `${SERVER_ENDPOINT}v1/category/listbycatlogkey`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalogKey:112264002,
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
        {displayDataModal.response.map((item, index) => <TouchableOpacity 
          onPress={()=>
            fetchCatData()
          } style={{}}><Text style={{
          fontSize: 14,
          color: "black",
          padding: 10,
        }}>{item.catalogName || item.categoryName}</Text></TouchableOpacity>)}
      </View>

      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const sidenavStyles = StyleSheet.create({
  centeredView: {
    minHeight: Dimensions.get("screen").height - 1000,
    flex: 1,
    marginLeft: 300,
  },
  modalView: {
    width: '15%',
    height: "100%",
    backgroundColor: "#3e3838",
    paddingLeft: 30,
    paddingTop: 50,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
