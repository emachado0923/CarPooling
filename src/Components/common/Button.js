import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

export const Button = ({onPress, title, bgColor, colorText, marginText,left, right, bottom, marginTop, position, BorderRadius, widthSize, heightSize, fontSize, borderColor, borderWidth, margin, fontWeight}) => {
    return (
        <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: widthSize || "50%",
                    backgroundColor: bgColor || "white",
                    borderRadius: BorderRadius || 12,
                    borderWidth: borderWidth || 0,
                    borderColor: borderColor || 'transparent',
                    paddingTop: 8,
                    paddingBottom: 8,
                    margin: 0 || margin,
                    elevation: 5,
                    height: heightSize,
                    marginTop: marginTop || 0,
                    position: position,
                    zIndex: 11,
                    right: right || 0,
                    bottom: bottom || 0,
                    left:left
                }}

            >
                <View style={{justifyContent: "center"}}>
                    <Text
                        style={{
                            color: colorText || "black",
                            fontSize: fontSize || 14,
                            textAlign: 'center',
                            fontWeight: fontWeight || 'normal',
                            alignItems: 'center',
                            margin: marginText

                        }}
                    >
                        {title}
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};
