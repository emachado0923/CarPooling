import React, { Component } from 'react';
import { View, Alert, Text, Image, TextInput, Dimensions, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from 'lottie-react-native';
import anim from '../../../../resources/animations/backgraounds/wavesGreen.json'
import { connect } from 'react-redux';
import { jwt, saveKey, user } from '../../../../redux/actions/services';
import { typeProfile, nextConfig } from '../../../../redux/actions/people';
import { ButtonSelect } from '../../../../Components/common/ButtonSelect';

class SelectRol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
      error: '',
      loading: false,
      deviceWidth: 0,
    };

  }

  componentDidMount() {
    this.animation.play();
    let deviceWidth = Dimensions.get('window').width;

    this.setState({
      deviceWidth
    })
  }

  errores(password1, password2) {
    if (password1 == "" || password2 == "") {
      this.setState({
        error: 'Complete ambos campos.'
      })
      return false;
    } else if (password1.length < 8) {
      this.setState({
        error: 'Mínimo debe ingresar ochos carácteres.'
      })
      return false;
    } else if (password1 != password2) {
      this.setState({
        error: 'Las contraseñas no coinciden.'
      })
      return false;
    }
    return true;
  }


  async next(type) {
    await this.props.typeProfile(type)
    this.props.navigation.navigate("Forms")
  }



  render() {
    return (

      <Grid>
        <Row>
          <Col size={1}>
            <View style={styles.contaitnerGen}>
              <Text style={styles.title}>SELECCIONA UN ROL</Text>
              <View style={styles.contSec1}>
                <View style={styles.contImg}>
                  <Image source={require('../../../../resources/img/logoInicio/LogoSENA-naranja_vector.png')} style={styles.imageTop} />
                </View>
                <View style={styles.contText}>
                  <Text style={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae, consequuntur. Dolorem dignissimos itaque dolores
                    facere nemo excepturi facilis ad quos maxime inventore cum nisi,
                    odit, numquam molestiae.Corporis, quidem molestiae.
                  </Text>
                </View>
              </View>
              <View style={styles.btnsCont}>
                <Row style={styles.button}>
                  <ButtonSelect
                    title="Conductor"
                    sizeIcon= {40}
                    colorIcon='white'
                    onPress={() => this.next("CONDUCTOR")}
                    colorText='white'
                    bgColor='#E88100'
                  />
                </Row>
                <Row style={styles.button}>
                  <ButtonSelect
                    title="Pasajero"
                    sizeIcon= {40}
                    colorIcon='white'
                    onPress={() => this.next("PASAJERO")}
                    colorText='white'
                    bgColor='#008000'
                  />
                </Row>
              </View>
            </View>

            <Row>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: '100%',
                  bottom: '-10%',
                }}
                loop={true}
                source={anim}
              />
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
const styles = StyleSheet.create({
  contaitnerGen: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: "center",
    minHeight: "75%",
    // backgroundColor: 'blue'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008000',
    textAlign: 'left',
    paddingLeft: 8
  },
  contSec1: {
    // backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 128,
    paddingHorizontal: 24
    // padding: 24,
  },
  imageTop: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 12,
  },
  contText: {
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify'
  },
  btnsCont: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center'
  },
});


const mapStateToProps = (state) => {
  return {
    user: state.services.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    typeProfile: type => dispatch(typeProfile(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRol, styles);