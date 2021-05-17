/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Image } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { events } from "../../configs/events/eventConfig";
import { LoginBox } from "./LoginBox";

export const LoginComponent = (props: {
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
  // console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));
  console.log(props.appState);

  return (
    <View
      style={{
        backgroundColor: "#5cabc5",
        height: "100%",
      }}
    >
      <Grid>
        {/* 1st ROW */}
        <Row
          size={1}
          style={{
            borderWidth: 0,
          }}
        >
          <Col size={5} style={{ borderWidth: 0 }}>
            <Row size={3} style={{ borderWidth: 0 }}>
              <Col size={1} style={{ borderWidth: 0 }}>
                <Image
                  style={{
                    height: "100%",
                    width: 250,
                    padding: 5,
                    margin: 10,
                  }}
                  source={require("./assets/TSD14.webp")}
                />
              </Col>
            </Row>
          </Col>
          <Col size={3} style={{ borderWidth: 0 }}></Col>
          <Col size={1} style={{ borderWidth: 0 }}></Col>
        </Row>
        {/* 2nd ROW */}
        <Row
          size={1}
          style={
            {
              // borderWidth: 2,
            }
          }
        ></Row>
        {/* 3rd ROW */}
        <Row
          size={4}
          style={{
            borderWidth: 0,
          }}
        >
          <Col size={5} style={{ borderWidth: 0 }}>
            <Row size={6} style={{ borderWidth: 0 }}>
              <Image
                style={{
                  width: 790,
                  marginLeft: 1,
                }}
                source={require("./assets/concept1.png")}
              />
              {/* </Col> */}
            </Row>
          </Col>
          <Col size={3} style={{ borderWidth: 0, marginLeft: 180 }}>
            <LoginBox
              appState={appState}
              label={label}
              styles={styles}
              children={children}
              setAppState={setAppState}
              layoutConfig={layoutConfig}
              setLayoutConfig={setLayoutConfig}
              getEvents={getEvents}
              events={events}
            />
          </Col>
          <Col size={1} style={{ borderWidth: 0 }}></Col>
        </Row>
        {/* 4th ROW */}
        <Row
          style={{
            borderWidth: 0,
          }}
        ></Row>
      </Grid>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
