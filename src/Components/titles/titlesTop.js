import React, { Component } from 'react';
import { View, Text } from 'react-native';

export const TitlesTop = ({ title, bgColor, txtColor, fontSize, alingTxt, widthSize,paddingLeft, borderRadius }) => {
    return (
        <View style={{
            backgroundColor: bgColor || 'transparent',
            maxWidth: widthSize || '80%',
            justifyContent: 'center',
            marginTop: 12,
            borderTopRightRadius: borderRadius || 4,
            borderBottomRightRadius: borderRadius || 4,
            paddingVertical: 8,
            paddingLeft: paddingLeft || 8,
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


