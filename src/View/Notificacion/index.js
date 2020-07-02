import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

//Responsive
import { Grid, Col, Row } from "react-native-easy-grid";

//Componentes
import Notification from "../../Components/Notification/Notification";
import Card from "../../Components/cards/card";
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
                <Card
                  color="#f09209"
                  flexDirection="row"
                  name="Juan"
                  category="Maestros"
                  description="Querk jasdflkj jkfdsjal jfdskljf skldfjf jsdfklj fjsdkl jljasdfkl JKASDJFKL JFKLJ jfdkalsjfkld jfksdajklfjd jfksdlajf jkljklasfjkldj jsdfklaj jfdskla fjasdkl"
                  onPress={() => this.setState({ infoNotification: true })}
                />
                <Card
                  color="#f09209"
                  name="Juan"
                  category="Maestros"
                  cantPersons="1"
                  onPress={() => this.setState({ infoNotification: true })}
                  description="Holas"
                />
                <Card
                  color="#f09209"
                  name="Juan"
                  category="Maestros"
                  cantPersons="1"
                  description="Holas"
                />
                <Card
                  color="#f09209"
                  name="Juan"
                  category="Maestros"
                  cantPersons="1"
                  description="Holas"
                />
                <Card
                  color="#f09209"
                  name="Juan"
                  category="Maestros"
                  cantPersons="1"
                  description="Holas"
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
    paddingTop: "3%",
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
