import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

//Responsive
import { Grid, Col, Row } from "react-native-easy-grid";
//Componentes
import Notification from "../../Components/Notification/Notification";
import Card from "../../Components/cards/card";
import CardInfo from '../../Components/cards/CardInfo';
import { TitlesTop } from '../../Components/titles/titlesTop';

import Logo from '../../resources/img/LogoSENA-naranja_vector.png'

export default class Notificaciones extends Component {
  constructor() {
    super();
    this.state = {
      infoNotification: false,
      invitation: false,
    }
  }


  render() {
    return (
      <Grid>
        <Col size={1}>
          <TitlesTop title='Noticias' bgColor='#FF8C01' widthSize='50%' txtColor='#fff' />
          <Row size={3}>
            <View style={Styles.bodyNotifications}>

              <ScrollView style={Styles.listBody}>
                <CardInfo
                  bgColor='#fff'
                  size={80}
                  title='Trafico pesado en la regional'
                  info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni velit iste, voluptatum veritatis sequi repudiandae, error sunt, consectetur laudantium impedit est cumque eveniet eligendi illum blanditiis autem. Quis, eius.'
                  containerBorder='#00AA37'
                  colorTitle='#00AA37'
                  onPress={() => this.setState({ infoNotification: true })}
                />
                <CardInfo
                  bgColor='#fff'
                  size={80}
                  title='Pico y placa ambiental'
                  info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni velit iste, voluptatum veritatis sequi repudiandae, error sunt, consectetur laudantium impedit est cumque eveniet eligendi illum blanditiis autem. Quis, eius.'
                  containerBorder='#FF8C01'
                  colorTitle='#FF8C01'
                  onPress={() => this.setState({ infoNotification: true })}
                />
                <CardInfo
                  bgColor='#fff'
                  size={80}
                  title='Pico y placa ambiental'
                  info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni velit iste, voluptatum veritatis sequi repudiandae, error sunt, consectetur laudantium impedit est cumque eveniet eligendi illum blanditiis autem. Quis, eius.'
                  containerBorder='#FF8C01'
                  colorTitle='#FF8C01'
                  onPress={() => this.setState({ infoNotification: true })}
                />
                <CardInfo
                  bgColor='#fff'
                  size={80}
                  title='Pico y placa ambiental'
                  info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni velit iste, voluptatum veritatis sequi repudiandae, error sunt, consectetur laudantium impedit est cumque eveniet eligendi illum blanditiis autem. Quis, eius.'
                  containerBorder='#FF8C01'
                  colorTitle='#FF8C01'
                  onPress={() => this.setState({ infoNotification: true })}
                />
                <CardInfo
                  bgColor='#fff'
                  size={80}
                  title='Pico y placa ambiental'
                  info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni velit iste, voluptatum veritatis sequi repudiandae, error sunt, consectetur laudantium impedit est cumque eveniet eligendi illum blanditiis autem. Quis, eius.'
                  containerBorder='#FF8C01'
                  colorTitle='#FF8C01'
                  onPress={() => this.setState({ infoNotification: true })}
                />

              </ScrollView>
            </View>
          </Row>

          {this.state.infoNotification ?
            <View style={Styles.solicitude}>
              <Notification
                img={Logo}
                infoView={() => this.setState({ infoNotification: false })} />
            </View> : null

          }

        </Col>
      </Grid>
    );
  }
}
const Styles = StyleSheet.create({
  imgNotifications: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    maxWidth: "100%"
  },
  bodyNotifications: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "100%"
  },
  listBody: {
    padding: 16,
    minWidth: "100%",
    maxHeight: "100%"
  },
  solicitude: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1000,
    display: 'flex'
  }
});
