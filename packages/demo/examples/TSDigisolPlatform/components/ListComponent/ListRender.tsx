/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchListComponent from "./SearchListComponent";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { FontAwesome } from "@expo/vector-icons";

// TODO : Mention props types
export const ListRender = (props: {
  appState: any;
  listFormLayout: any[];
  events: any;
  getEvents: any;
  children: any;
  label: any;
  layoutConfig: any;
  setAppState: any;
  setLayoutConfig: any;
  styles: any;
  UItitle: any;
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
  const [prevKey, setPrevKey] = useState([]);
  const [nextKey, setNextKey] = useState(0);
  const [noOfRows, setnoOfRows] = useState(10);
  const [responseData, setResponseData] = useState({});
  const [pageArray, setPageArray] = useState(["0"]);
  const [responseStatus, setResponseStatus] = useState(200);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);

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
    setLoading(true);
    const res = await fetch(`${SERVER_ENDPOINT}${endPoint}`, {
      method: httpMethod,
      // method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status != 200) {
      setResponseStatus(500);
      return;
    }

    // console.log("res status", res.status);
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
      setTotalPage(Math.ceil(resJSON.page?.recordCount / noOfRows));
      setNextKey(resJSON.page?.lastRecordKey);
    }
    setLoading(false);
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
  console.log("recordCount", totalPage);

  const prevHandler = async () => {
    const body = props.appState.global.tsdApp.searchComponent.searchPayload;
    const prev = prevKey.length < 2 ? 0 : prevKey[prevKey.length - 2];
    body["page"] = {
      pageSize: "10",
      lastRecordKey: prev,
    };
    console.log("PrevButton press ::::", body);
    await fetchApi(
      props.appState.global.tsdApp.activeAction.endPoint,
      props.appState.global.tsdApp.activeAction.httpMethod,
      body
    );
    console.log("prev key yeas", prevKey[prevKey.length - 1]);
    setPrevKey((old) => {
      const newArr = [...old];
      newArr.pop();
      return newArr;
    });
    setpageNumber((oldPage) => {
      return oldPage - 1;
    });
  };

  const nextHandler = async () => {
    const body = props.appState.global.tsdApp.searchComponent.searchPayload;
    body["page"] = {
      pageSize: "10",
      lastRecordKey: nextKey,
    };
    console.log("NextHandler Press : :: : ", body);
    await fetchApi(
      props.appState.global.tsdApp.activeAction.endPoint,
      props.appState.global.tsdApp.activeAction.httpMethod,
      body
    );
    setPrevKey((old) => [...old, nextKey]);
    setpageNumber((oldPage) => {
      return oldPage + 1;
    });
  };

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
              borderColor: "#999999",
            }}
            disabled={loading || pageNumber === 1}
            onPress={prevHandler}
          >
            <FontAwesome
              name="caret-left"
              size={50}
              color={pageNumber === 1 ? "grey" : "#2196f3"}
            />
          </TouchableOpacity>
          <Text
            style={{
              // borderWidth: 1,
              paddingTop: 15,
              fontSize: 20,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {pageNumber}
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 3,
              // borderWidth: 1,
              padding: 5,
              borderColor: "#999999",
              // backgroundColor: "#0e73ca",
            }}
            disabled={loading || pageNumber === totalPage}
            onPress={nextHandler}
          >
            <FontAwesome
              name="caret-right"
              size={50}
              color={pageNumber === totalPage ? "grey" : "#2196f3"}
            />
          </TouchableOpacity>
        </View>
      );
    } else return <View />;
  };

  console.log("FINAL DATA  ::: ", finalData);

  if (!loading && responseStatus == 200 && finalData.length == 0) {
    return (
      <View>
        <Text>No Data found</Text>
      </View>
    );
  }

  if (responseStatus != 200) {
    return (
      <View>
        <Text>No Data found</Text>
      </View>
    );
  }

  console.log("props.listFormLayout :::: ", props.listFormLayout);

  return loading && finalData.length == 0 ? null : (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row-reverse",
          marginBottom: 10,
        }}
      >
        {/* <Text style={listRenderstyles.heading}>Search Here</Text> */}
        {paginationView(isPaginationAvailable)}
        <View
          style={{
            // borderWidth: 1,
            width: 900,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#0d47a1",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.appState.global.tsdApp.activeTab.name} List
          </Text>
        </View>
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
        showTitleKey={props.listFormLayout.map((data: { title: any }) => {
          return data.title;
        })}
        flexWidth={[]} // Column-span (length of array should be equal to that of visibleKeys)
        numberOfLines={finalData.length} // Row-span
        searchBarWrapperStyle={null}
        searchBarStyle={null}
        titleStyle={null}
        dataStyle={{ color: "darkblue" }}
        inputPlaceholder="Search this List ..."
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
