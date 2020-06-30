import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Grid, Col, Row } from "react-native-easy-grid";

//Components
import Select from '../../Components/Forms/Select';
import Card from "../../Components/cards/card";
import { Button, Input } from "../../Components/common";
import { ScrollView } from "react-native-gesture-handler";

export default class Viajes extends Component {
  render() {
    return (
      <Grid>
        <Row style={styles.container}>
          <View style={styles.subContainer}>
            <Select title='Origen'></Select>
            <Input
              label='Destino'
              placeholder='Dirección de tu destino'
            />
          </View>
        </Row>
        <Row style={styles.contMap}>
          <Text>Mapa</Text>
        </Row>
        <Row style={styles.subContainer2}>
            <Col style={styles.contImg}>
              <View style={styles.imgConduc} />
            </Col>
            <Col style={styles.contInfo}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quam, quisquam adipisci consequatur.
            </Text>
              <View style={styles.contBtns}>
                <Button
                  title='Text'
                  borderColor='#00AA37'
                  borderWidth={2}
                  widthSize='60%'
                />
                <Button
                  title='Text'
                  borderColor='#FF8C01'
                  borderWidth={2}
                  widthSize='60%'
                />
              </View>
            </Col>
        </Row>
      </Grid>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FF8C01',
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subContainer: {
    backgroundColor: '#F0F0F0',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
    marginBottom: 12,
  },
  contMap: {
    flex: 3,
    height: 100,
    backgroundColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer2: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    padding: 12,
    marginTop: -8
  },
  contImg: {
    width: '40%',
    alignItems: 'center',
  },
  imgConduc: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00AA37'
  },
  contInfo: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },

})