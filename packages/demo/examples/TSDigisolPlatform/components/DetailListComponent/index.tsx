/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ShowEntity } from "../../../../components/DetailComponent/ShowEntity";

export const DetailListComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  UItitle: any;
}) => {
  const {
    appState,
    label,
    children,
    layoutConfig,
    setAppState,
    setLayoutConfig,
    getEvents,
    UItitle,
  } = props;

  console.log("Layout config in Detail COmponent ::: ", props);
  

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));

  const [action, setAction] = useState({
    actionKey: "",
    actionName: "View",
    endPoint: "",
    httpMethod: "GET",
    showButton: true,
    tabKey: "",
  });

  const [] = useState({
    type: "object",
    properties: {},
  });

  const [data, setdata] = useState({});
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("appState in Detail component : : :: ", appState);
    appState.global
      ? setdata(
          appState.global.tsdApp.viewComponent[
            appState.global.tsdApp.activeTab.name
          ]
        )
      : setdata({});
  }, []);

  // if (loading)
  //   return (
  //     <View style={detailViewStyles.container}>
  //       <ActivityIndicator />
  //     </View>
  //   );

  return (
    <View>
      <View>
        <ShowEntity props={props} viewData={data} />
      </View>
      {/* </ScrollView> */}
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const detailViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  item: {
    padding: 10,
    margin: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    opacity: 1,
    // borderRadius: 2,
    // height: 330,
    // alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    color: "#0d47a1",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#0d47a1",
    textAlign: "left",
  },
  subInfo: {
    fontSize: 12,
    color: "#1565c0",
    textAlign: "center",
    fontWeight: "bold",
  },
});

/**
 * 
    setLoading(true);
    const fetchAction = async () => {
      const res1 = await fetch(
        `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
        // `https://run.mocky.io/v3/31e2c2ab-c3de-464a-9f75-17324669aa95`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "TsdAdmin",
            roleKey: 1,
            moduleName: "Catalog",
            actionName: "View",
            tabName: "Sku",
          }),
        }
      );
      const res1JSON = await res1.json();
      // console.log(
      //   "action : : ",
      //   res1JSON.businessFunctions[0].modules[0].tabs[0].actions[0]
      // );
      setAction(res1JSON.businessFunctions[0].modules[0].tabs[0].actions[0]);
    };
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:8080/transaction-web/v1/sku/112264303`,
        // `http://localhost:8080/transaction-web/${action.endPoint}1122137901`,
        // `https://run.mocky.io/v3/31e2c2ab-c3de-464a-9f75-17324669aa95`,
        {
          method: `${action.httpMethod}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            languageKey: 1,
          },
        }
      );
      const resJSON = await res.json();
      setdata(resJSON);
      setLoading(false);
    };
    fetchAction();
    // fetchFormLayout();
    fetchData();
 */
