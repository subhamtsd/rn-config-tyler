import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

export default function AgendaScroll({ route, navigation }: any) {
  const [items, setItems] = useState();
  const today = new Date();

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/8940358d-4ccd-4b66-9459-9cc347c0ab89")
      .then((res) => {
        // console.log(res)
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function renderItem(items) {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 45 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{items.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        renderItem={renderItem}
        selected={today}
        minDate={'2021-03-01'}
        maxDate={'2021-04-30'}
        pastScrollRange={0}
        futureScrollRange={1}
      />
    </View>
  );
}
