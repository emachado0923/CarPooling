import React, { Component } from "react";
import {View,Text,ScrollView} from "react-native";

//responsive
import { Grid, Col, Row } from "react-native-easy-grid";

//Componentes
import Titles from "../../Components/titles/titles";
import Card from "../../Components/cards/card";

export default class Inicio extends Component {
  constructor() {
    super();
    this.state = {
      datos: []
    };
  }
  componentDidMount() {}

  render() {
    const {
      home,
      history,
      statusDay,
      columnInfo,
      co2Info,
      statusCo2,
      statusPerson,
      cardsHistory,
      txtInfoHome
    } = styles;
    return (
      <Grid>
        <Row size={4}>
          <View style={home}>
            <Row size={1} style={statusDay}>
              <View style={columnInfo}>
                <Text style={txtInfoHome}>Fecha</Text>
                <Text style={txtInfoHome}>23/09/2019</Text>
              </View>
              <View style={columnInfo}>
                <Text style={txtInfoHome}>Clima</Text>
                <Text style={txtInfoHome}>🌤 30°C</Text>
              </View>
            </Row>

            <Row size={4} style={statusCo2}>
              <View style={co2Info} />
            </Row>

            <Row size={1} style={statusPerson}>
              <View style={columnInfo}>
                <Text style={txtInfoHome}>Has disminuido:</Text>
                <Text style={txtInfoHome}>45L de CO2</Text>
              </View>
              <View style={columnInfo}>
                <Text style={txtInfoHome}>Mis puntos:</Text>
                <Text style={txtInfoHome}>6996</Text>
              </View>
            </Row>
          </View>
        </Row>

        {/* Comienzo de seccion 'Historial' */}
        <Row size={5} style={history}>
          <View style={{ minWidth: "100%", }}>
            <Titles
              colorBorder="#59b548"
              colorBg="white"
              colorText="#069169"
              title="HISTORIAL"
            />
          </View>

          <ScrollView style={cardsHistory}>
            <Card
              color="#59b548"
              flexDirection="row"
              name="Viaje SENA"
              category="Estudiantes"
              description="Viaje de ida en carro, realizado por el conductor Juan Esteban, acompañado por Mateo B., Carlos H."
            />
            <Card
              color="#59b548"
              flexDirection="row"
              name="Viaje SENA"
              category="Estudiantes"
              description="Viaje de ida en carro, realizado por el conductor Juan Esteban, acompañado por Mateo B., Carlos H."
            />
            <Card
              color="#59b548"
              flexDirection="row"
              name="Viaje SENA"
              category="Estudiantes"
              description="Viaje de ida en carro, realizado por el conductor Juan Esteban, acompañado por Mateo B., Carlos H."
            />
            <Card
              color="#59b548"
              flexDirection="row"
              name="Viaje SENA"
              category="Estudiantes"
              description="Viaje de ida en carro, realizado por el conductor Juan Esteban, acompañado por Mateo B., Carlos H."
            />
          </ScrollView>
        </Row>
      </Grid>
    );
  }
}
const styles = {
  txtInfoHome: {
    color: '#238276',
    fontWeight: 'bold'
    },
  home: {
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    postion: "relative",
    justifyContent: "center",
    paddingHorizontal: '4%'
  },
  history: {
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    postion: "relative",
    flexDirection: "column",
    paddingTop: '5%'
  },
  statusDay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    minWidth: "100%"
  },
  columnInfo: {
    display: "flex",
    textAlign: "center",
    alignItems: "center"
  },
  statusCo2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  co2Info: {
    borderColor: "#238276",
    borderWidth: 1,
    borderRadius: 100,
    width: "50%",
    height: "90%"
  },
  statusPerson: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardsHistory: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "column"
  }
};
