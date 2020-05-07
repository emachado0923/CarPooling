import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class Titles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: {
                borderColor: this.props.colorBorder,
                backgroundColor: this.props.colorBg,
                borderWidth: 1,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                padding: 10,
                minWidth: '40%',
                maxWidth: '55%',
                fontSize: 15,
                color: this.props.colorText,
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: 10
            }
        }
    }

    render() {
        return (
            <View>
                <Text style={this.state.color}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}