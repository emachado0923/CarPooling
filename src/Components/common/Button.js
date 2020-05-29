import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Button = ({ onPress, title, bgColor, colorText, widthSize, fontSize }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          maxWidth: widthSize || "50%",
          backgroundColor: bgColor || "white",
          borderRadius: 12,
          paddingTop: 8,
          paddingBottom: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}

      >
        <Text
          style={{
            color: colorText || "black",
            fontSize: fontSize || 14,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
