import React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

export const AlertBox = ({ color, message, heading, messageAction }) => {
  const colors = {
    info: "bg-blue-100 border-blue-400 text-blue-700",
    danger: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-orange-100 border-orange-400 text-orange-700",
  };
  const selectedColor = colors[color] || colors["info"];
  const iconColors = {
    info: "text-blue-500",
    danger: "text-red-500",
    warning: "text-orange-500",
  };
  const selectedIconColor = iconColors[color] || iconColors["info"];

  return (
    <View
      style={tailwind(
        `px-4 py-3 my-3 rounded relative border ${selectedColor}`
      )}
      role="alert"
    >
      <Text style={tailwind("font-bold")}>{heading}</Text>
      <Text style={tailwind("block sm:inline")}>{message}</Text>
      <View style={tailwind("absolute top-0 bottom-0 right-0 px-4 py-3")}>
        <Text style={{ color: selectedIconColor }}>{messageAction}</Text>
      </View>
    </View>
  );
};
