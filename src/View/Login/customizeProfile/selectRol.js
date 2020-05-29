import React, { Component } from 'react';
import { View, Alert, Text, Image, TextInput, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from 'lottie-react-native';
import anim from '../../../resources/animations/backgraounds/wavesGreen.json'
import { connect } from 'react-redux';
import { jwt, saveKey, user } from '../../../redux/actions/services';
import { typeProfile, nextConfig } from '../../../redux/actions/people';
import { ButtonSelect } from '../../../Components/common/ButtonSelect';
import { TitlesTop } from '../../../Components/titles/titlesTop';

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
              <TitlesTop
                title='SELECCIONA UN ROL'
                txtColor='#00AA37'
              />
              <View style={styles.contSec1}>
                <View style={styles.contImg}>
                  <Image source={require('../../../resources/img/logoInicio/LogoSENA-naranja_vector.png')} style={styles.imageTop} />
                </View>
                <View style={styles.contText}>
                  <Text style={styles.text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae, consequuntur. Est non fugit atque ea tenetur.
                  </Text>
                </View>
              </View>
              <View style={styles.btnsCont}>
                <ButtonSelect
                  title="Conductor"
                  sizeIcon={48}
                  colorIcon='#fff'
                  onPress={() => this.next("CONDUCTOR")}
                  colorText='#fff'
                  bgColor='#FF8C01'
                  radiusRight={300}
                  txtAlign='left'
                />
                <ButtonSelect
                  title="Pasajero"
                  sizeIcon={48}
                  colorIcon='#fff'
                  onPress={() => this.next("PASAJERO")}
                  colorText='#fff'
                  bgColor='#00AA37'
                  radiusLeft={300}
                  txtAlign='right'
                />
              </View>
            </View>
            <Row>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: '100%',
                  bottom: -10,
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
    minHeight: '100%',
    // backgroundColor: 'pink',
  },
  contSec1: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 36,
    // backgroundColor: 'blue'
  },
  imageTop: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  contText: {
    paddingVertical: 36,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    paddingHorizontal: 12,

  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color:'#4A4C4E'
  },
  btnsCont: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
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