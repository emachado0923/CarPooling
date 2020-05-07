import React, { Component } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Grid, Col, Row } from "react-native-easy-grid";

//Components
import Select from '../../../Components/Forms/Select';

export default class Viajes extends Component {
  render() {
    const { travelsMap } = styles;
    return (
      <Grid>
        <Row size={1} style={travelsMap}>
            <Select></Select>
        </Row>
      </Grid>
    );
  }
}
const styles = {
  travelsMap: {
    width: "100%",
  }
};
