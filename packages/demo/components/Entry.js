import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Picker } from "@react-native-community/picker";

const Empty = () => <Text>Sorry type not match</Text>;
const Entry = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const Case = (setSelectedValue) => {
    switch (setSelectedValue) {
      case "form":
        const {
          appConfig,
          routes,
          getEvents,
        } = require("../examples/with-jsonforms/layout");
        const { App } = require("../helpers/lib/src");
        return (
          <App
            config={appConfig}
            routes={routes}
            debug={false}
            getEvents={getEvents}
            // getInitEvents={getInitEvents}
          />
        );
      default:
        return <Empty />;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Examples</Text>
      <Picker
        style={{ height: 20, width: 300 }}
        selectedValue={selectedValue}
        onValueChange={(selectedValue) => setSelectedValue(selectedValue)}
      >
        <Picker.Item label="Form" value="form" />
        <Picker.Item label="Charts" value="chart" />
      </Picker>
      <Button
        title="Submit"
        onPress={() => alert(setSelectedValue(selectedValue))}
      ></Button>
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

export default Entry;
