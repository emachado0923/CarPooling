import React, { Component } from "react";
import { Grid, Col, Row } from "react-native-easy-grid";
import { View, Text, StyleSheet,Alert } from "react-native";

import {Button} from '../common/Button';

export default class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>

          <Row style={{justifyContent:'center',alignItems:'center'}}>
            <View style={Styles.notification}>
                <Row size={1.7}>
                  <View>
                    <Text>Imagen</Text>
                  </View>
                </Row>

                <Row size={1}>
                  <Text>Titulo 1</Text>
                  <Text>Subtitulo</Text>
                </Row>

                <Row size={3}>
                  <Text>Parrafo</Text>
                </Row>

               <Button onPress={this.props.infoView} title={'Aceptar'} colorText='white' bgColor='#274fb2' colorBorder='#274fb2'></Button>
                
            </View>

            <View style={Styles.body}/>
          </Row>          

          
          
      </Grid>
    );
  }
}

const Styles = StyleSheet.create({
    body:{
        width: '100%',
        minWidth: '100%',
        height: '100%',
        minHeight: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
        position: 'absolute'
    },
    notification: {
        width: '85%',
        height: '65%',
        padding: '5%',
        borderRadius: 14,
        backgroundColor: 'white',
        zIndex: 1001,
        opacity: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
