import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Button = ({ onPress, title, bgColor, colorText, widthSize, fontSize, borderColor,borderWidth }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: widthSize || "50%",
          backgroundColor: bgColor || "white",
          borderRadius: 12,
          borderWidth: borderWidth || 0,
          borderColor: borderColor || 'transparent',
          paddingTop: 8,
          paddingBottom: 8,
          margin:0
        }}

      >
        <Text
          style={{
            color: colorText || "black",
            fontSize: fontSize || 14,
            textAlign:'center'
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
