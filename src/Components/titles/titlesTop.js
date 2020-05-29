import React, { Component } from 'react';
import { View, Text } from 'react-native';

export const TitlesTop = ({ title, bgColor, txtColor, fontSize, alingTxt, widthSize }) => {
    return (
        <View style={{
            backgroundColor: bgColor || 'transparent',
            maxWidth: widthSize || '80%',
            justifyContent: 'center',
            marginTop: 12,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            paddingVertical: 8,
            paddingLeft: 8,
        }}>
            <Text style={{
                fontSize: fontSize || 24,
                fontWeight: 'bold',
                color: txtColor || '#000',
                textAlign: alingTxt || 'left',
            }}>{title}</Text>
        </View>
    )
}


