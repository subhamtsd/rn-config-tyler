/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchListComponent from "./SearchListComponent";

// TODO : Mention props types
export const ListRender = (props: {
  appState: any;
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

  const [isPaginationAvailable, setIsPaginationAvailable] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [prevKey, setPrevKey] = useState(0);
  const [nextKey, setNextKey] = useState(0);
  const [noOfRows, setnoOfRows] = useState(10);
  const [responseData, setResponseData] = useState({});
  const [pageArray, setPageArray] = useState(["0"]);

  if (props.appState.global.tsdApp.listComponent?.data?.page?.pageSize === "") {
    setIsPaginationAvailable(false);
  }

  console.log("Props in List Render : : : ", props);

  // if (loading)
  //   return (
  //     <View style={listRenderstyles.container}>
  //       <ActivityIndicator />
  //     </View>
  //   );

  const fetchApi = async (endPoint, httpMethod, body) => {
    const res = await fetch(
      `http://localhost:8080/transaction-web/${endPoint}`,
      {
        method: httpMethod,
        // method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const resJSON = await res.json();
    // TODO : HERE IT IS USED TO MODIFY THE VALUE OF NEXT AND PREV BUTTON
    console.log("resJson in listRender : : :: : ", resJSON.status);

    if (resJSON.status === "FAILURE") {
      setFinalData([]);
    } else {
      setFinalData(resJSON.response);
    }
    // setResponseData(resJSON);
    // setFinalData(resJSON.response);
    // TODO : Remove hardcoding for pageSize
    // When the pageSize is not empty string
    if (resJSON.pageSize === "") {
      setIsPaginationAvailable(false);
    } else {
      setPrevKey(nextKey);
      setNextKey(resJSON.page?.lastRecordKey);
    }
  };

  useEffect(() => {
    fetchApi(
      props.appState.global.tsdApp.activeAction.endPoint,
      props.appState.global.tsdApp.activeAction.httpMethod,
      props.appState.global.tsdApp.searchComponent.searchPayload
    );
  }, []);
  // if (props.appState.global != undefined) {
  //   if (props.appState.global.tsdApp.listComponent != undefined) {
  //     if (
  //       props.appState.global.tsdApp.listComponent.data.response.length === 0
  //     ) {
  //       return (
  //         <View>
  //           <Text>No Data found</Text>
  //         </View>
  //       );
  //     }
  //   }
  // }

  console.log("nextKey : :: : ", nextKey);
  console.log("prevKey : :: : : ", prevKey);

  const prevHandler = () => {
    const body = props.appState.global.tsdApp.searchComponent.searchPayload;
    body["page"] = {
      pageSize: "10",
      lastRecordKey: prevKey,
    };
    console.log("PrevButton press ::::", body);
    fetchApi(
      props.appState.global.tsdApp.activeAction.endPoint,
      props.appState.global.tsdApp.activeAction.httpMethod,
      body
    );
  };

  const nextHandler = () => {
    const body = props.appState.global.tsdApp.searchComponent.searchPayload;
    body["page"] = {
      pageSize: "10",
      lastRecordKey: nextKey,
    };
    setPageArray(() => [...pageArray, nextKey]);
    console.log("NextHandler Press : :: : ", body);
    fetchApi(
      props.appState.global.tsdApp.activeAction.endPoint,
      props.appState.global.tsdApp.activeAction.httpMethod,
      body
    );
  };

  console.log("pageArray : : :: : ", pageArray);

  const paginationView = (isPaginationAvailable: boolean) => {
    if (isPaginationAvailable) {
      return (
        <View
          style={{
            flexDirection: "row",
            flex: 3,
            marginLeft: 10,
            // borderWidth: 2,
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: 3,
              // borderWidth: 1,
              padding: 5,
              backgroundColor: "#0e73ca",
            }}
            onPress={prevHandler}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Prev
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 3,
              // borderWidth: 1,
              padding: 5,
              backgroundColor: "#0e73ca",
            }}
            onPress={nextHandler}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else return <View />;
  };

  if (finalData.length === 0) {
    return (
      <View>
        <Text>No Data found</Text>
      </View>
    );
  }


  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text style={listRenderstyles.heading}>Search Here</Text>
        {paginationView(isPaginationAvailable)}
      </View>
      {/* <View>
        <Text>{JSON.stringify(finalData)}</Text>
      </View> */}
      <SearchListComponent
        data={
          // []
          finalData
          // props.appState.global != undefined
          //   ? props.appState.global.tsdApp.listComponent != undefined
          //     ? props.appState.global.tsdApp.listComponent.data.response
          //     : []
          //   : []
        }
        searchFields={props.listFormLayout.map((data: { field: any }) => {
          return data.field;
        })}
        visibleKeys={props.listFormLayout.map((data: { field: any }) => {
          return data.field;
        })}
        flexWidth={[]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={finalData.length} // Row-span
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
    </View>
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
    // textAlign: "center",
  },
  link: {
    color: "blue",
  },
});
