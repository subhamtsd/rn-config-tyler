/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Text, View, Image } from "react-native";
import { componentGridStyle } from "../../styles/common";

export const ShowQRCodeComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
  qrcodeImage: any;
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
    qrcodeImage,
  } = props;

  const qrCodeImage =
    appState.global.tsdApp?.ShowQRCodeComponent?.qrcodeImage === undefined
      ? `C:\\QRCODE\\default`
      : appState.global.tsdApp?.ShowQRCodeComponent?.qrcodeImage;

  // console.log(`label is ${label}`);
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log("appstate in QRCODE : ", props.appState);
  const [qrcodeVisible, setqrcodeVisible] = useState(false);

  return (
    <View style={{ marginHorizontal: 60 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {qrcodeVisible ? `Here is your QR Code` : `QR code is Hidden`}
        </Text> */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 30,
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>QR code</Text>
        </View>
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require(`C:/QRCODE/${qrcodeImage || `default.png`}`)}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {appState.global.tsdApp?.ShowQRCodeComponent?.message}
            </Text>
          </View>
        </View>
      </View>
      {/* <Button
        testID={`${label}-btn-one`}
        title="ACT1"
        {...getEvents(`${label}-btn-one`, setLayoutConfig, setAppState)}
      ></Button> */}
      {/* <Text> AA {appState?.$appState?.loginValues}</Text> */}
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
