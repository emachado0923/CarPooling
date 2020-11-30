import React, {Component} from "react";
import {View, Text, Picker, StyleSheet} from "react-native";
// Responsive
import {Row} from "react-native-easy-grid";

const Select = ({borderColor, title, colorText, fontSize, value, label, array}) => {
    return (
        <View style={{marginVertical: 2,padding:5}}>
            <Text style={{
                color: colorText || "#000",
                fontWeight: 'bold',
                fontSize: fontSize || 12
            }}>{title}</Text>
            <Row style={{
                height: 45,
                borderWidth: 2,
                borderColor: borderColor || '#000',
                borderRadius:10,
            }}>

                <Picker mode='dropdown' style={{width: '100%'}}>

                    {array.map(item => {
                        <Picker.item label={label} value={item + '.' + value}/>
                    })}

                </Picker>
            </Row>
        </View>
    )
}

export default (Select)
