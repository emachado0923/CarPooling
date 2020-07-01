import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Col } from "react-native-easy-grid";
import { color } from "react-native-reanimated";

const CardInfo = ({ containerSize, bgColor, size, iconName, iconSize, iconColor, title, colorTitle, sizeTitle, info, colorInfo, sizeInfo }) => {
    return (
        <View style={{
            width: containerSize || '100%',
            borderRadius: 12,
            padding: 8,
            backgroundColor: bgColor || '#E0E0E0',
            marginVertical: 4,
            flexDirection: 'row', 
            alignItems:'center'

        }}>

            <Col style={{
                width: size || 120,
                height: size || 120,
                borderRadius: 100,
                borderColor: '#000',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon name={iconName} size={iconSize || 16} color={iconColor} />
            </Col>
            <Col style={{
                padding: 8,
            }}>
                <Text style={{
                    color: colorTitle || '#000',
                    fontSize: sizeTitle || 20,
                    fontWeight:'bold'
                }}>
                    {title}
                </Text>
                <Text style={{
                    fontSize: sizeInfo || 16,
                    color: colorInfo || '#707070',
                    borderBottomWidth:1,
                    paddingVertical:4,
                    borderBottomColor: colorTitle
                }}>
                    {info}
                </Text>
            </Col>
        </View>
    )
}

export default CardInfo;
