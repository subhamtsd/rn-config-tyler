/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import SearchListComponent from "./SearchListComponent";
// import { useRouting } from "expo-next-react-navigation";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// TODO : Mention props types
export const ListRender = (props: {
  appState: {
    global: { tsdApp: { listComponent: { data: { response: any } } } };
  };
  listFormLayout: any[];
  events: any;
  getEvents: any;
  label: any;
  layoutConfig: any;
  setAppState: any;
  setLayoutConfig: any;
  styles: any;
}) => {
  // const {
  //   appState,
  //   label,
  //   styles,
  //   children,
  //   setAppState,
  //   layoutConfig,
  //   setLayoutConfig,
  //   getEvents,
  //   // listFormLayout,
  // } = props;

  const [] = useState([]);
  // const [loading, setLoading] = useState(true);

  console.log("Props in List Render : : : ", props);

  // if (loading)
  //   return (
  //     <View style={listRenderstyles.container}>
  //       <ActivityIndicator />
  //     </View>
  //   );

  return (
    <ScrollView>
      <Text style={listRenderstyles.heading}>Order Line List View</Text>
      <SearchListComponent
        data={
          props.appState.global != undefined
            ? props.appState.global.tsdApp.listComponent != undefined
              ? props.appState.global.tsdApp.listComponent.data.response
              : []
            : []
        }
        searchFields={props.listFormLayout.map((data: { field: any }) => {
          return data.field;
        })}
        visibleKeys={props.listFormLayout.map((data: { field: any }) => {
          return data.field;
        })}
        flexWidth={[]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={2} // Row-span
        searchBarWrapperStyle={null}
        searchBarStyle={null}
        titleStyle={null}
        dataStyle={{ color: "darkblue" }}
        inputPlaceholder="Search Here"
        buttonColor="#0e73ca"
        buttonTitle="Show"
        buttonPress={() => {
          console.log("Button Clicked From List COmponent");
        }}
        appState={props.appState}
        events={props.events}
        getEvents={props.getEvents}
        label={props.label}
        layoutConfig={props.layoutConfig}
        listFormLayout={props.listFormLayout}
        setAppState={props.setAppState}
        setLayoutConfig={props.setLayoutConfig}
        styles={props.styles}
      />
      {/* COmponent Satyam Rendered */}
      {/* <SearchList 
        data={data} 
        searchFields={["name", "description", "category", "subCategory"]} 
        visibleKeys={["name", "category", "description"]}
        flexWidth={[1,1,3]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={3} // Row-span
        searchBarWrapperStyle={null}
        searchBarStyle={null}
        titleStyle={null}
        dataStyle={{color: 'darkblue'}}
        inputPlaceholder="Search Here"
    />  */}
      {/* <View
        style={{
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Button
          accessibilityLabel="link"
          onPress={() => {
            goBack();
          }}
          title="Go Back"
        />
      </View> */}
    </ScrollView>
  );
};

const listRenderstyles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    // minHeight: Dimensions.get("window").height - 50,
    // minWidth: Dimensions.get("window").width / 4,
    // alignItems: "center",
    // flexGrow: 1,
    // justifyContent: "center",
  },
  text: {
    alignItems: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    color: "#0d47a1",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "blue",
  },
});
