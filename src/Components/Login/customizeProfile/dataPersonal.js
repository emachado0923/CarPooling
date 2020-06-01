import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, } from "react-native";
import { Input, Button } from '../../common';
import { TitlesTop } from '../../../Components/titles/titlesTop';
import { connect } from 'react-redux';
import Card from '../../../Components/cards/card';

class DataPersonal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: "",
      loading: false
    }
  }

  save() {
    alert("Hola")
  }

  render() {
    const { error, loading } = this.state;
    const { errorTextStyle } = styles;
    return (
      <View style={styles.contentGeneral} >
        <TitlesTop title='FORMULARIO DE REGISTRO' txtColor='#FFF' bgColor='#FF8C01' fontSize={22} />
        <Card
          color="#f09209"
          name="DATOS PERSONALES" category=""
          cantPersons={1}
          description="Algo breve mientras tanto :)"
          borderRadius={10}
          config={true}
          estado={this.props.statusPassW ? "Completo" : "Incompleto"}
          iconName='user'
          iconSize={40}
        />
        <ScrollView>
          <View style={styles.contForm}>
            <Input
              label={"Nombre"}
              value={this.props.user.nombre}
              editable={false}
              labelColor='#00AA37'
              labelSize={18}
              labelWeight='bold'
            />
            <Input
              label={"Apellido"}
              value={this.props.user.apellido}
              editable={false}
              labelColor='#00AA37'
              labelSize={18}
              labelWeight='bold'

            />
            <Input
              label={"E-mail"}
              value={this.props.user.correo}
              editable={false}
              labelColor='#00AA37'
              labelSize={18}
              labelWeight='bold'
            />
            <Input
              label={"Centro"}
              value={this.props.user.centro}
              editable={false}
              labelColor='#00AA37'
              labelSize={18}
              labelWeight='bold'
            />
            <Input
              label={"Ciudad"}
              value={this.props.user.dirección}
              editable={false}
              labelColor='#00AA37'
              labelSize={18}
              labelWeight='bold'
            />
            <View style={styles.contentBtns}>
              <Button
                title="Cambiar contraseña"
                onPress={() => this.props.navigation.navigate("ChangePassword")}
                bgColor='#00AA37'
                colorText='#fff'
                fontSize={16}
                widthSize={'60%'}
              />
              <Text style={errorTextStyle}>
                {error}
              </Text>
              <Button
                title="Atras"
                onPress={() => this.props.navigation.goBack()}
                bgColor='#FF8C01'
                colorText='#fff'
                fontSize={16}

              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentGeneral: {
    flex: 1,
  },
  contForm: {
    paddingHorizontal: 16,

  },
  contentBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.services.user,
    statusPassW: state.configRegister.statusPassword
  }
}

export default connect(mapStateToProps, {})(DataPersonal);