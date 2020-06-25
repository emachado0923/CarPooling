import React, { Component } from "react";
import { View,StyleSheet} from "react-native";

import { Grid, Col, Row } from "react-native-easy-grid";

//Components
import Select from '../../Components/Forms/Select';

export default class Viajes extends Component {
  render() {
    return (
      <Grid>
        <Row style={styles.container}>
          <View style={styles.subContainer}>
            <Select></Select>
          </View>
        </Row>
      </Grid>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: '#FF8C01',
    paddingHorizontal: 24,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 2,},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 2,},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
}) 
