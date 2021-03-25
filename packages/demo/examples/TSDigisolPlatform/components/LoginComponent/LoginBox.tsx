/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { routes } from "../../configs/routes/routesConfig";

export const LoginBox = (props: {
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
  console.log(props.appState);

  const [role, setrole] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  // const [loginStatus, setloginstatus] = useState();

  return (
    <View style={{ backgroundColor: "#efeeec", height: "100%" }}>
      <View style={{ alignItems: "center", backgroundColor: "#ebb155" }}>
        <Text
          style={{
            fontSize: 30,
            justifyContent: "center",
            fontStyle: "italic",
            margin: 10,
            color: "white",
          }}
        >
          Welcome to TS Digisol
        </Text>
      </View>
      <View style={{ backgroundColor: "#efeeec" }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              justifyContent: "center",
              margin: 10,
            }}
          >
            TSD User
          </Text>
        </View>
        <View>
          {/* ROLE */}
          <TextInput
            placeholder={`Enter Role`}
            style={{
              height: 35,
              margin: 10,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={setrole}
            value={role}
          />
          {/* Username */}
          <TextInput
            placeholder={`Enter Username`}
            style={{
              height: 35,
              margin: 10,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={setusername}
            value={username}
          />
          {/* Password */}
          <TextInput
            placeholder={`Enter Password`}
            secureTextEntry={true}
            style={{
              height: 35,
              margin: 10,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={setpassword}
            value={password}
          />
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text>Forget Password</Text>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity
              //   disabled={isButtonDisabled}
              style={{
                alignItems: "center",
                backgroundColor: "#5cabc5",
                width: 90,
                padding: 10,
                marginLeft: 145,
                marginBottom: 10,
              }}
              onPress={() => {
                console.log(
                  "Role ::: ",
                  role,
                  "\nuserName ::: ",
                  username,
                  "\n Password ::: ",
                  password
                );
                const loginUser = async () => {
                  const res = await fetch(
                    `http://localhost:8080/transaction-web/v1/auth/login`,
                    {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userName: username,
                        password: password,
                        role: role,
                        deviceId: "",
                      }),
                    }
                  );
                  const resJSON = await res.json();
                  const resStatus = await res.status;
                  console.log("resStatus :::: ---> ", resStatus);
                  if ((await res.status) === 200) {
                    console.log("Log in successful");
                    setLayoutConfig(routes["defaultAppConfig"]);
                  } else {
                    console.log("Log in failed");
                  }
                };
                loginUser();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};
