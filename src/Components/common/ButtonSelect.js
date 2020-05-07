import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons,  } from '@expo/vector-icons';


export const ButtonSelect = ({ onPress, title, bgColor, colorText,sizeIcon, colorIcon }) => {
  let iconName;
  if (title === 'Conductor') {
    iconName = `ios-car`;
  } else if (title === 'Pasajero') {
    iconName = `ios-person`;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          maxWidth: 180,
          height: 180,
          backgroundColor: bgColor || white,
          borderRadius: 100,
          paddingTop: 8,
          paddingBottom: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Ionicons name={iconName} size={sizeIcon} color={colorIcon}/>
        <Text
          style={{
            color: colorText || "black",
            fontSize: 20,
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
