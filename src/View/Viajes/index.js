import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Grid, Col, Row } from "react-native-easy-grid";

//Components
import Select from '../../Components/Forms/Select';
import Card from "../../Components/cards/card";
import { Button, Input } from "../../Components/common";

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
          <View style={styles.imgConduc}>
          </View>
          <View style={styles.contBtns}>
            <Button
            title='Text'
            borderColor='#00AA37'
            borderWidth={2}
            widthSize='70%'
            />
            <Button
            title='Text'
            borderColor='#FF8C01'
            borderWidth={2}
            widthSize='70%'
            />
          </View>
        </Row>
      </Grid>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C01',
    paddingHorizontal: 24,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
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
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal:12
  },
  contMap: {
    flex: 2,
    height: 100,
    backgroundColor: '#707070',
    justifyContent: 'center',
    alignItems:'center'
  },
  
  subContainer2: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    marginTop: -8
  },
  imgConduc:{
    width: 120,
    height:120,
    borderRadius:100,
    borderWidth:1,
    borderColor:'#00AA37'
  },
  contBtns:{
    width:'50%',
    flexDirection:'row', 
    justifyContent:'space-around',
    alignItems:'center'
  },

}) 
