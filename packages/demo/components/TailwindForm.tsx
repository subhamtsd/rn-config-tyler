import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import tailwind from "tailwind-rn";

const TailwindForm = (props) => {
  const [hasFocus, setHasFocus] = useState(false);


  console.log(props);
  

  return (
    <View style={tailwind("bg-white my-5 ")}>
      <View style={tailwind("pt-12 items-center")}>
        <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
          <Text style={tailwind("text-blue-800 font-bold")}>
            Tailwind Contact Form Demo
          </Text>
        </View>
      </View>
      <View style={tailwind("px-4 py-5 bg-white ")}>
        <View style={tailwind("flex-row mt-1 ")}>
          <View style={tailwind("m-1 w-1/2")}>
            <TextInput
              onFocus={() => {
                setHasFocus(true);
              }}
              style={tailwind("border p-2  w-3/4")}
              placeholder="Your Name"
              clearButtonMode="always"
            />
          </View>

          <View style={tailwind(" m-1 w-1/2")}>
            <TextInput
              onFocus={() => {
                setHasFocus(true);
              }}
              style={tailwind("border p-2  w-3/4")}
              placeholder="Your Number"
            />
          </View>
        </View>
        <TextInput
          onFocus={() => {
            setHasFocus(true);
          }}
          placeholder="Enter email"
          style={tailwind("border p-2 w-full mt-3")}
        />
        <TextInput
          onFocus={() => {
            setHasFocus(true);
          }}
          placeholder="Tell us about desired property"
          multiline={true}
          numberOfLines={3}
          maxLength={50}
          style={tailwind("border p-2 mt-3 w-full")}
        />
        <Text style={tailwind("font-bold text-sm mt-3")}>GDPR Agreement *</Text>
        <Text style={tailwind("text-gray-600 text-sm")}>
          I consent to having this website store my submitted information so
          they can respond to my inquiry.
        </Text>
      </View>
      <View style={tailwind(" items-center")}>
        <Button
          title="submit"
          onPress={() => alert('Submit Button pressed')}
          style={tailwind(
            "w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
          )}
        ></Button>
      </View>
    </View>
  );
};

export default TailwindForm;
