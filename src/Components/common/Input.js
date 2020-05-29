import React from 'react';
import { View, TextInput, Text } from 'react-native';

export const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, numberOfLines, editable, borderBottomColor, fontInputSize, labelColor, labelSize }) => {
  const {  containerStyle } = styles;
  // inputStyle.borderBottomColor = borderBottomColor
  let inputStyle = {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: borderBottomColor || '#FF8C01',
    textAlign: 'left',
    fontSize: fontInputSize || 16  ,
    margin: 0,
    padding: 0
  }
  let labelStyle = {
    color: labelColor || '#000',
    textAlign: 'left',
    margin: 0,
    padding: 2,
    fontSize: labelSize || 16
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
        numberOfLines={numberOfLines}
        style={inputStyle}
        editable={editable}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    minWidth: '80%',
    marginVertical: 12
  }
};