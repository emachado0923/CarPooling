import React, { Component } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
// Responsive
import { Row } from "react-native-easy-grid";

const Select = ({ borderColor, title, colorText, fontSize }) => {
  return (
    <View style={{ marginVertical: 12, }}>
      <Text style={{
        color: colorText || "#000",
        fontWeight: 'bold',
        fontSize: fontSize || 20
      }}>{title}</Text>
      <Row style={{
        height: 'auto',
        borderBottomWidth: 2,
        borderColor: borderColor || '#000',
      }}>

        <Picker
          mode='dropdown'
          style={{ width: '100%'}}>
          <Picker.Item label='Algo' value='a' />
          <Picker.Item label='Prueba' value='a' />
        </Picker>
      </Row>
    </View>
  )
}

export default (Select)
