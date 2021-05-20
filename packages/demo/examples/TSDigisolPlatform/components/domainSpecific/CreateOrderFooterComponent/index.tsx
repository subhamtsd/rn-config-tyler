/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import Modal from "modal-react-native-web";
import { isPropertyAssignment } from "typescript";
import { events } from "../../../configs/events/eventConfig";
import { prepareSchema } from "../../../helper/helper";
import { componentGridStyle } from "../../../styles/common";
import { SERVER_ENDPOINT } from "../../../../../../../../../config/endpoint";
import { ListJsonFormComponent } from "./../../../../../components/ListJsonFormComponent/index";
import { routes } from "../../../configs/routes/routesConfig";
import { cloneDeep } from "lodash";

export const CreateOrderFooterComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  _childDependeny: any;
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
    events,
    _childDependeny,
  } = props;

  console.log(`label is ${label}`);

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const submitHandler = () => {
    const {
      bodyHeader,
      createOrderlineListComponent,
    } = appState?.global?.tsdApp?.formData;

    const orderLine = [];
    const address = [];
    createOrderlineListComponent.forEach((obj) => {
      const newObj = { ...obj.item };
      newObj["address"] = {
        ...appState?.global?.tsdApp?.formData?.[obj.key],
      };
      orderLine.push(newObj);
    });

    appState?.global?.tsdApp?.formData?.createAddressFormComponent?.forEach(
      (obj) => {
        const newObj = { ...obj.item };
        address.push(newObj);
      }
    );

    const body = {
      ...bodyHeader,
      addressInfos: {
        address: address,
      },
      orderLines: {
        orderLine: orderLine,
      },
    };
    console.log("final submit body  ", body);
    const res1 = fetch(
      `${SERVER_ENDPOINT}${appState.global.tsdApp.activeAction.endPoint}/`,
      {
        method: appState.global.tsdApp.activeAction.httpMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((_data) => {
        console.log("submit success ", _data);

        const newAppState = cloneDeep(appState);
        delete newAppState.global.tsdApp.formData;
        delete newAppState.global.tsdApp.createComponent;
        if (_data.status === "FAILURE") {
          setErrorModalVisible(true);
        } else {
          newAppState.global.tsdApp.viewComponent =
            { [appState.global.tsdApp.activeTab.name]: _data };
          console.log('newAppState ::: ', newAppState);
          setAppState(newAppState, false);
          if (_data.status !== "FAILURE") {
            setLayoutConfig(
              routes.orderDetail,
              "copy"
            );
          }
        }
      })
      .catch((err) => {
        const newAppState = cloneDeep(appState);
        delete newAppState.global.tsdApp.formData;
        setAppState(newAppState, false);
      });
  };

  return (
    <View>
      {
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
          onRequestClose={() => {
            setErrorModalVisible(!errorModalVisible);
          }}
        >
          <View style={createOrderFooterStyle.centeredView}>
            <View style={createOrderFooterStyle.modalSubmitCloseView}>
              <Text style={createOrderFooterStyle.cancelText}>
                Error occured while creating an order !
              </Text>

              <Pressable
                style={[
                  createOrderFooterStyle.buttonCloseSubmit,
                  createOrderFooterStyle.buttonClose,
                ]}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={createOrderFooterStyle.modalCancelText}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      }
      <View style={{ display: "flex", flexDirection: "row", alignContent: 'center', justifyContent: 'center' }}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: -30
          }}
        >
          {/* ******************** Add Rows Button ******************** */}
          <TouchableOpacity
            style={createOrderFooterStyle.buttonSubmit}
            // disabled={status}
            onPress={submitHandler}
          >
            <Text style={createOrderFooterStyle.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: -30
          }}
        >
          {/* ******************** COPY ROWS BUTTON ********************************* */}
          <TouchableOpacity
            style={createOrderFooterStyle.buttonCancel}
            // disabled={status}
            onPress={() => {
              console.log("Cancel Clicked");
              // copy the last row
            }}
          >
            <Text style={createOrderFooterStyle.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createOrderFooterStyle = StyleSheet.create({
  buttonSubmit: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#0e73ca",
    height: 35,
    width: "140px",
    marginTop: 20,
    marginLeft: 150,
    marginBottom: 20,
    marginRight: 10,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    // borderColor: '#000',
    // borderWidth: 0.5,
    borderRadius: 2,
  },
  buttonCancel: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    height: 35,
    width: "140px",
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 30,
    borderColor: "#000",
    borderWidth: 0.5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonCloseSubmit: {
    alignItems: "center",
    height: 35,
    width: "30%",
    marginTop: 20,
    marginBottom: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 50,
  },
  modalSubmitCloseView: {
    // margin: 20,
    padding: '2%',
    backgroundColor: "#f3f9fb",
    borderRadius: 5,
    marginHorizontal: 70,
    marginVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  submitText: {
    color: "#fff",
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
  },
  cancelText: {
    color: "#545454",
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
  },
  modalCancelText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
