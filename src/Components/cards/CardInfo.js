import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Col } from "react-native-easy-grid";

const CardInfo = ({ containerSize, bgColor, containerBorder, onPress, size, iconName, iconSize, iconColor, title, colorTitle, sizeTitle, info, colorInfo, sizeInfo }) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.1)">
            <View style={{
                width: containerSize || '100%',
                borderRadius: 12,
                borderColor: containerBorder || 'transparent',
                borderWidth: 1,
                padding: 8,
                backgroundColor: bgColor || '#E0E0E0',
                marginVertical: 4,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Col style={{
                    width: size || 120,
                    height: size || 120,
                    borderRadius: 100,
                    borderColor: colorTitle ||'#000',
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
                        fontWeight: 'bold'
                    }}>
                        {title}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: sizeInfo || 16,
                            color: colorInfo || '#707070',
                            borderBottomWidth: 1,
                            paddingVertical: 4,
                            borderBottomColor: colorTitle,
                            maxWidth: '90%'
                        }}>
                        {info}
                    </Text>
                </Col>
            </View>
        </TouchableHighlight>
    )
}

export default CardInfo;
