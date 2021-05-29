import React from "react";
import { Text, View, FlatList } from "react-native";

export const TodoApp2 = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  text: any;
  id: any;
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
    text,
    id,
  } = props;

  return (
    <View>
      {/* <Text style={{}}>TodoApp2 *** {label}</Text> */}
      {/* <View 
        style={{
          backgroundColor: 'skyblue',
          padding: 10,
          margin:2,
          borderRadius: 4,
          borderColor:"black",
          flexDirection: 'row',
          alignItems: 'center',
          width:'30%'
        }}
      >
        <Text >{id}) {text}</Text>
      </View> */}
      {(appState?.$global?.setTaskItems || []).map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
