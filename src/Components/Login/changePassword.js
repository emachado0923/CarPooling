import React, { Component } from 'react';
import { View, Alert, Button, Text, Image, TextInput, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LottieView from 'lottie-react-native';
import anim from '../../resources/animations/backgraounds/wavesGreen.json'
import { Loading, Input } from '../../Components/common';
import { API, URL_API } from '../../API/comunicacionApi';
import { connect } from 'react-redux';
import { jwt, saveKey, user } from '../../redux/actions/services'; 
import { statusPassword, passWord} from '../../redux/actions/configRegister';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
      error: '',
      loading: false,
      deviceWidth: 0,
    };

    this.savePassword = this.savePassword.bind(this);
  }

  componentDidMount() {
    this.animation.play();
    let deviceWidth = Dimensions.get('window').width;

    this.setState({
      deviceWidth
    })
  }

  errores(password1, password2){
    if(password1 == "" || password2 ==""){
      this.setState({
        error: 'Complete ambos campos.'
      })
      return false;
    }else if(password1.length < 8){
      this.setState({
        error: 'Mínimo debe ingresar ochos carácteres.'
      })
      return false;
    }else if(password1 != password2){
      this.setState({
        error: 'Las contraseñas no coinciden.'
      })
      return false;
    }
    return true;
  }
  

  savePassword() {
    const { password1, password2 } = this.state;
    this.setState({ error: '', loading: true });
    if(!this.errores(password1, password2)){
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({error:""})
      }, 5000);
      return;        
    }
    // NOTE Post to HTTPS only in production
    this.props.update_passWord(password1);
    this.props.update_statusPassW(true);
    this.setState({ loading: false });
    this.props.navigation.navigate("DataPersonal");
    console.log('Cambió la contraseña-->',password1)
  }

  render() {
    const { error, loading } = this.state;
    const { errorTextStyle } = styles;
    return (

      <Grid>
        <Row>
          <Col size={1}>
            <View style={{display:'flex', justifyContent:'space-around', alignItems: "center", minHeight: "75%" }}>
              {/* <View>
                <Image source={require('../../../resources/img/LogoSENA-naranja_vector.png')} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
              </View> */}
              <View >
                <Input
                  label={"Nueva contraseña"} 
                  secureTextEntry 
                  onChangeText={password1 => this.setState({ password1 })}
                  placeholder="contraseña"
                  />
                <Input
                  label={"Confirmar Contraseña"} 
                  secureTextEntry 
                  onChangeText={password2 => this.setState({ password2 })}
    							placeholder="contraseña"
                  />
                <Text style={errorTextStyle}>
                  {error}
                </Text>

                {!loading ?
                  <Button
                    title="Guardar"
                    onPress={this.savePassword}
                    color='#FF8C01'
                  />
                  :
                  <Loading size={'large'} />
                }
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

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    alignItems: 'center'
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};


const mapStateToProps = (state) => {
  return {
    user: state.services.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update_statusPassW: statusPass => dispatch(statusPassword(statusPass)),
    update_passWord: passW => dispatch(passWord(passW)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);