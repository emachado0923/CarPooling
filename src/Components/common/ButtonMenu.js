import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const ButtonMenu = ({
  onPress,
  title,
  bgColor,
  colorText,
  colorBorder
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{

          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: colorText || "black",
            fontSize: 18,
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
