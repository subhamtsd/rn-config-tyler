import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import ExpandableComponent from "./ExpandableComponent";

export const NavigationBar = (props: {
  appState;
  label;
  styles;
  children;
  setAppState;
  layoutConfig;
  setLayoutConfig;
  getEvents;
  events;
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
  const [loading, setLoading] = useState(true);
  const [listDataSource, setListDataSource] = useState([]);
  const [multiSelect] = useState(true);

  return (
    <View style={NavStyles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default NavigationBar;

const NavStyles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  //   titleText: {
  //     flex: 1,
  //     fontSize: 22,
  //     fontWeight: 'bold',
  //   },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: "#606070",
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  subHeader: {
    fontSize: 15,
  },
});
