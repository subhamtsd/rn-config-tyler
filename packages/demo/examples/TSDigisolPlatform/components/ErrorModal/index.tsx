/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { SERVER_ENDPOINT } from "../../../../../../../../config/endpoint";
import { componentGridStyle } from "../../styles/common";
import Modal from "modal-react-native-web";

export const ErrorModal = (props: {
    message: any;
    modalDisplay: any;
    functionProp: any
}) => {
    const {
        message,
        modalDisplay,
        functionProp
    } = props;

    // const handleChange = (event) => {
    //     return setShowJSON(event);
    // };
    // const onError = () => {
    //     console.log("error found");
    // };
    // const sendJSON = () => {
    //     fetchData();
    // };
    // const handleReset = () => {
    //     setShowJSON({ key: "value" });
    // };

    // console.log("objectName : : : : ", objectName);
    const [modalVisible, setModalVisible] = useState(modalDisplay);

    return (
        <View>
            {/*<Button
        testID={`${label}-btn-one`}
        title="HELLO DEMO"
        {...getEvents(
          `${label}-btn-one`,
          setLayoutConfig,
          setAppState,
          appState
        )}
        // onPress={() => {
        //   // setLayoutConfig(routes["edit"], "copy");
        //   console.log("Hello World from Default Component");
        // }}
      ></Button> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            // onRequestClose={() => {
            //     setErrorModalVisible(false);
            // }}
            >
                <View style={errorModalStyles.centeredView}>
                    <View style={errorModalStyles.modalView}>
                        <Text style={errorModalStyles.errorMessage}>{message}</Text>

                        <Pressable
                            style={errorModalStyles.buttonClose}
                            onPress={() => {
                                setModalVisible(false);
                                functionProp(false);
                            }
                            }
                        >
                            <Text style={errorModalStyles.modalCancelText}>close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const errorModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        padding: 50,
    },
    modalView: {
        // margin: 20,
        width: '30%',
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
    buttonClose: {
        alignItems: "center",
        backgroundColor: '#2196F3',
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
    errorMessage: {
        color: "#545454",
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