import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  Animated
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from "lottie-react-native";
import anim from "../../../resources/animations/backgraounds/wavesGreen.json";
import { Loading, Input,Button } from "../../../Components/common";

import { API, URL_API } from "../../../API/comunicacionApi";
import { connect } from "react-redux";
import { jwt, saveKey, user } from "../../../redux/actions/services";
import { KeyboardAvoidingView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

var _touchX = new Animated.Value(10 / 2);
var _touchY = new Animated.Value(10 / 2);
var _touchy = 0;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      prueba: false,
      windowWidth: 0,
      windowHeight:0,
      ola: 0,
      keyboard: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  componentDidMount() {
    this.animation.play();
    let windowWidth = Dimensions.get("window").width;
    let windowHeight = Dimensions.get("window").height;

    this.setState({
      windowWidth,
      windowHeight
    });
    _touchX.setValue(0);

    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.setState({ keyboard: true })
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.setState({ keyboard: false })
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  loginUser() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });
    // NOTE Post to HTTPS only in production
    API.POST(`${URL_API}/auth/login`, { email, password })
      .then(({ data }) => {
        if (data.ok) {
          console.log("se loguio ", data);
          this.props.saveJWT("id_token", data.accessToken);
          this.props.actualizar_jwt(data.accessToken);
          this.props.update_user(data.user);
        } else {
          this.setState({ loading: false });
          this.setState({
            error: "Usuario o contraseña incorrecto"
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
        this.setState({
          error: "Error en la conexión"
        });
      });
  }

  desacerError(){
    setTimeout(() => {
      this.setState({
        error: ''
      });
    }, 3000);
  }

  onLoginFail() {
    Alert("Login Failed");
    this.setState({
      loading: false
    });
  }
handle(){
  let windowHeight = Dimensions.get("window").height;
  // console.log("Entra");
  console.log(_touchY._value);
  let deviceHeight = -(windowHeight/2) 
  // console.log(-(windowHeight/2));
  if (deviceHeight >= _touchY._value) {
    console.log("Mayor",);
    this.setState({ 
      ola: -windowHeight/4*3,
    });


    
  }else{
    this.setState({ 
      ola: 0,
    });
  }
  
}

  _onPanGestureEvent = Animated.event(
    
    [{nativeEvent: {y: _touchY}}],
    {listener: this.handle.bind(this)},
  )
  presss(){
    console.log("presiona");
    
  }

  render() {
    const { email, password, error, loading, keyboard, ola } = this.state;
    console.log("123123",ola);
    
    const { errorTextStyle, containerStyle } = styles;
    const imageHeight1 = { width: 100, height: 100, resizeMode: "cover" };
    const imageHeight2 = { width: 200, height: 200, resizeMode: "cover" };

    return (
      <Grid>
        <Row>
          <Col size={1}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                minHeight: "75%"
              }}
            >
              <View>
                <Image
                  source={require("../../../resources/img/logoInicio/LogoSENA-naranja_vector.png")}
                  style={keyboard ? imageHeight1 : imageHeight2}
                />
              </View>
              <View>
                <Input
                  label={"Correo Electrónico"}
                  onChangeText={email => this.setState({ email })}
                  placeholder="Ingrese su correo @misena.edu.co"
                  style={{ width: "85%", color: "green" }}
                />
                <Input
                  label={"Contraseña"}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  placeholder="Ingrese su contraseña"
                />
                <Text style={errorTextStyle}>{error}</Text>

                {!loading ? (
                  <View style={{
                    alignItems: "center"
                  }}>

                    <Button
                      title="Ingresar"
                      onPress={this.loginUser}
                      colorText='#fff'
                      bgColor="#E88100"
                    />
                  </View>
                ) : (
                  <Loading size={"large"} />
                )}
              </View>
            </View>

            <Row>
              <PanGestureHandler onGestureEvent={this._onPanGestureEvent} onPress={this.presss}
              >
                <Animated.View
                  style={{
                    flex:1,
                  }}
                >
                  
                  <Animated.View
                    style={[{
                      zIndex:1000,
                    },
                      {
                        transform: [
                          {
                            translateX: Animated.add(
                              _touchX,
                              new Animated.Value(0)
                            )
                          },
                          {
                            translateY: Animated.add(
                              ola || _touchY,
                              new Animated.Value(0)
                            )
                          }
                        ]
                      }
                    ]}
                  >

                    <LottieView
                      ref={animation => {
                        this.animation = animation
                      }}
                      style={{
                        width:'100%',
                      }}
                      loop={true}
                      source={anim}
                    />
                  </Animated.View>
                  
                </Animated.View>
              </PanGestureHandler>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  
}

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    alignItems: "center"
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red"
  }
};

const mapStateToProps = state => {
  return {
    jwt: state.services.jwt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actualizar_jwt: est => dispatch(jwt(est)),
    saveJWT: (key, value) => dispatch(saveKey(key, value)),
    update_user: person => dispatch(user(person))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
