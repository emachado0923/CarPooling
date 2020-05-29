import React, { Component } from "react";
import { View, ScrollView, Picker, Text } from "react-native";

// Responsive
import { Grid, Row, Col } from "react-native-easy-grid";

export default class Select extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { container } = styles;

    return (
      <View style={container}>
        <Text>Origen del viaje</Text>
        <Picker
          style={{
            borderBottomWidth: 1, 
            borderBottomColor: '#FF8C01',
            minWidth: "85%",
            maxWidth: "85%",
            padding: 5,
            borderRadius: 5
          }}
        >
          <Picker.Item label="Casa" value="Calle 42" />
          <Picker.Item label="Casa 2" value="Calle 43" />

        </Picker>
      </View>
    );
  }
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
};
