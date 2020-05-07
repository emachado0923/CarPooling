import React from 'react';
import { View, TextInput, Text } from 'react-native';

export const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines,editable,borderBottomColor }) => {
  const { labelStyle, containerStyle } = styles;
  // inputStyle.borderBottomColor = borderBottomColor
  let inputStyle = {
    height: 25,
    width: '100%',
    borderBottomWidth: 1, 
    borderBottomColor: borderBottomColor || '#E88100',
    textAlign: 'left',
    margin: 0,
    padding: 0
  }
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={inputStyle}
        editable={editable}
      />
    </View>
  );
};

const styles = {
  labelStyle: {
    color: 'black',
    textAlign: 'left',
    margin: 0,
    padding: 2
  },
  inputStyle: {
    height: 25,
    width: '100%',
    borderBottomWidth: 1, 
    borderBottomColor: '#E88100',
    textAlign: 'left',
    margin: 0,
    padding: 0
  },
  containerStyle:{
    minWidth: '75%'
  }
};