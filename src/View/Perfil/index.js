import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { deleteJWT } from "../../redux/actions/services";
import { Grid, Row } from "react-native-easy-grid";

// Componentes
import { ButtonMenu } from "../../Components/common/ButtonMenu";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: true
    };
  }


  actualizar_jwt() {
    this.props.delJWT();
  }

  render() {
    const { containerBody, text, myProfile, menuProfile, menuBg, profilePoints, profilePhoto, profileDescription, photoPerson, personName, personDescription } = styles;
    return (
      <Grid>
        <Row size={1} style={containerBody}>
          <Row size={3} style={myProfile}>

            <Row size={1} style={profilePoints}>
              <View>
                <Text>Puntos</Text>
              </View>

              <View>
                <Text>{this.props.user.profile}</Text>
              </View>
            </Row>

            <Row size={3} style={profilePhoto}>
              <View style={photoPerson}>
                <Text>Foto</Text>
              </View>
            </Row>

            <Row size={2} style={profileDescription}>
              <Text style={personName}>{this.props.user.nombre}</Text>
              <Text style={personDescription}>Hola! Soy Juan y aqui va toda mi descripcion que yo haya querido poner al principio de la app.</Text>
            </Row>

          </Row>

          <Text style={text}>Tipo deperfil: {this.props.user.profile}</Text>

          <Text style={text}>Nombre: {this.props.user.nombre}</Text>

          <Text style={text}>Correo: {this.props.user.correo}</Text>

          <Text style={text}>Ciudad: {this.props.user.dirección}</Text>

          <Row size={3} style={menuProfile}>
            <View style={menuBg}>
              <ButtonMenu
                colorText="black"
                bgColor="white"
                colorBorder="#274fb2"
                title="Editar Perfil"
              />
              <ButtonMenu
                colorText="black"
                bgColor="white"
                colorBorder="#274fb2"
                title="Ayuda"
              />
              <ButtonMenu
                colorText="black"
                bgColor="white"
                colorBorder="#274fb2"
                title="Reportar problema"
              />

              <ButtonMenu
                onPress={this.actualizar_jwt.bind(this)}
                colorText="black"
                bgColor="white"
                colorBorder="#274fb2"
                title="Salir"
              />
            </View>
          </Row>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  containerBody: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "column"
  },
  text: {
    fontSize: 25
  },
  myProfile: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column'
  },
  menuProfile: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: 'flex-end',
  },
  menuBg: {
    backgroundColor: "white",
    width: "85%",
    height: "90%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    shadowColor: "black",
    elevation: 6,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  profilePoints: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilePhoto: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoPerson: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black'
  },
  profileDescription: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '5%'
  }, personName: {
    textAlign: 'center',
    color: '#238276',
    fontSize: 24
  }, personDescription: {
    textAlign: 'center',
  }
};

const mapStateToProps = state => {
  return {
    jwt: state.services.jwt,
    user: state.services.user
    // person : state.people.person
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actualizar_jwt: est => dispatch(jwt(est)),
    delJWT: () => dispatch(deleteJWT())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
