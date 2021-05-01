import { Picker } from "@react-native-community/picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Empty = () => <Text>Sorry type not match</Text>;
const Entry = ({ modules }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [demoDesc, setDemoDesc] = useState("");
  console.log(selectedValue);

  const pickerOptionsSection = Object.keys(modules).map((id) => {
    return <Picker.Item label={modules[id].id} value={modules[id].id} />;
  });

  return (
    <View style={styles.container}>
      <Text>Examples</Text>
      <Text>{demoDesc}</Text>
      <Picker
        style={{ height: 20, width: 300 }}
        selectedValue={selectedValue}
        onValueChange={(selectedValue) => {

          setDemoDesc(modules[selectedValue]?.desc || " A simple demo");
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
        // children={<Text>{modules[selectedValue]}</Text>}
      />
    );
  } else {
    return <Empty />;
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { render } = require("react-dom");

export default Entry;
