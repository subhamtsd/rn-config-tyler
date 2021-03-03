import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Picker } from "@react-native-community/picker";

const Empty = () => <Text>Sorry type not match</Text>;
const Entry = () => {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);

  // // let moduleConfig = { appConfig, routes, getEvents };
  // function load(selectedValue) {
  //   let moduleConfig = require("../examples/with-jsonforms/layout");
  //   // let moduleConfig;
  //   // import("../examples/with-jsonforms/layout").then((moduleData) => {
  //   //   moduleConfig = moduleData;
  //   //   console.log(selectedValue);
  //   if (moduleConfig) {
  //     const { App } = require("../helpers/lib/src/");
  //     console.log(moduleConfig);
  //     return (
  //       <App
  //         config={moduleConfig.appConfig}
  //         routes={moduleConfig.routes}
  //         debug={false}
  //         getEvents={moduleConfig.getEvents}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  //   // });
  // }

  return (
    <View style={styles.container}>
      <Text>Examples</Text>
      <Picker
        style={{ height: 20, width: 300 }}
        selectedValue={selectedValue}
        onValueChange={(selectedValue) => {
          setSelectedValue(selectedValue);
        }}
      >
        <Picker.Item label="select" value="invalid entry" />
        <Picker.Item label="Form" value="../examples/with-jsonforms/layout" />
        <Picker.Item label="Charts" value="../examples/with-charts/layout" />
      </Picker>
      <Button
        title="Submit"
        onPress={() => {
          load();
        }}
      ></Button>
      <View id="demo">{load()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});

function load(selectedValue) {
  let moduleConfig = require("../examples/with-jsonforms/layout");
  if (moduleConfig) {
    const { App } = require("../helpers/lib/src/");
    console.log(moduleConfig);
    return (
      <App
        config={moduleConfig.appConfig}
        routes={moduleConfig.routes}
        debug={false}
        getEvents={moduleConfig.getEvents}
      />
    );
  } else {
    return null;
  }
}

// const { render } = require("react-dom");
// render(load(), document.getElementById("demo"));
export default Entry;
