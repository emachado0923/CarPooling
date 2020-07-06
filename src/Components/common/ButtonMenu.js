import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const ButtonMenu = ({ onPress, title, colorText, fontSize, iconColor, iconName, iconSize }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
      }}
    >
      <Text
        style={{
          color: colorText || '#000',
          fontSize: fontSize || 18,
          paddingRight: 8,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Text>
      <FontAwesome name={iconName} size={iconSize} color={iconColor || colorText} />
    </TouchableOpacity>
  );
};
