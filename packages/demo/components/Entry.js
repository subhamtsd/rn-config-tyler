import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Picker } from "@react-native-community/picker";

const Empty = () => <Text>Sorry type not match</Text>;
const Entry = ({ modules }) => {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);

  const pickerOptionsSection = Object.keys(modules).map((id) => {
    return <Picker.Item label={modules[id]} value={modules[id]} />;
  });

  return (
    <View style={styles.container}>
      <Text>Examples</Text>
      <Picker
        style={{ height: 20, width: 300 }}
        selectedValue={selectedValue}
        onValueChange={(selectedValue) => {
          setSelectedValue(selectedValue);
          render(
            load(selectedValue),
            document.querySelector('[data-testid="demo"]')
          );
        }}
      >
        <Picker.Item label="select" value="invalid entry" />
        {pickerOptionsSection}
      </Picker>
      <View testID="demo" style={{ width: "100%" }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  btn: {
    padding: 10,
  },
});

function load(selectedValue) {
  const moduleConfig = require(`../examples/${selectedValue}/layout`);
  if (moduleConfig) {
    const { App } = require("../helpers/lib/src/");
    console.log(moduleConfig);
    return (
      <App
        key={selectedValue}
        config={moduleConfig.appConfig}
        routes={moduleConfig.routes}
        debug={false}
        getEvents={moduleConfig.getEvents}
      />
    );
  } else {
    return <Empty />;
  }
}

const { render } = require("react-dom");

export default Entry;
