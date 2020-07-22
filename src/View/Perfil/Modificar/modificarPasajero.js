import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import { TitlesTop } from "../../../Components/titles/titlesTop";
import { ScrollView } from "react-native-gesture-handler";
import { Col } from "react-native-easy-grid";
import { Button, Input } from "../../../Components/common";
import Axios from "axios";
import { API } from "../../../API/comunicacionApi";

class ModificarPasajero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: true,
            image: null,

            nombre: this.props.user.nombre,
            apellido: this.props.user.apellido,
            celular: this.props.user.celular,
            correo: this.props.user.correo,
            dirección: this.props.user.dirección,
            centro: this.props.user.centro,
            pass: this.props.user.contraseña,

        }
    }

    _ModificarUsuario = () => {
        const id = this.props.user._id
        API.PUT(`/api/usuario/${id}`, this.state).then((res) => {
            alert('Modificado correctamente')
        }).catch((e) => {
            console.log('error' + e)
        })
    }

    render() {

        return (
            <ScrollView>
                <TitlesTop
                    title={`EDITAR INFORMACIÓN DEL ${this.props.user.profile}`}
                    widthSize='80%'
                    bgColor="#FF8C01"
                    txtColor='#fff'
                />
                <Col style={styles.contMoreInfo}>
                    <Input
                        value={this.state.nombre}
                        label='Nombre'
                        editable={true}
                        labelSize={20}
                        labelColor='#FF8C01'
                        onChangeText={(nombre) => this.setState({ nombre })}
                    />
                    <Input
                        value={this.state.apellido}
                        label='Apellido'
                        labelSize={20}
                        labelColor='#FF8C01'
                        editable={true}
                        onChangeText={(apellido) => this.setState({ apellido })}
                    />
                    <Input
                        keyboardType={'phone-pad'}
                        label='Celular'
                        labelSize={20}
                        labelColor='#FF8C01'
                        value={this.state.celular.toString()}
                        editable={true} onChangeText={(celular) => this.setState({ celular })}
                    />
                    <Input
                        value={this.state.correo}
                        label='Correo electronico'
                        labelSize={20}
                        labelColor='#FF8C01'
                        editable={true}
                        onChangeText={(correo) => this.setState({ correo })}
                    />
                    <Input
                        value={this.state.dirección}
                        label='Dirrección'
                        labelSize={20}
                        labelColor='#FF8C01'
                        editable={true}
                        onChangeText={(dirección) => this.setState({ dirección })}
                    />
                    <Input
                        value={this.state.centro}
                        label='Centro'
                        labelSize={20}
                        labelColor='#FF8C01'
                        editable={true}
                        onChangeText={(centro) => this.setState({ centro })}
                    />
                    <Input
                        label='Contraseña'
                        editable={true}
                        labelSize={20}
                        labelColor='#FF8C01'
                        onChangeText={(pass) => this.setState({ pass })}
                    />
                </Col>
                <Col style={{ alignItems: 'center', marginVertical: 12 }}>
                    <Button title='Guardar' borderWidth={2}
                        bgColor='#00AA37' fontSize={20}
                        colorText='#fff' fontWeight='bold'
                        onPress={this._ModificarUsuario}
                    />
                    <Button
                        title='Volver'
                        bgColor='#FF8C01'
                        colorText='#FFF'
                        fontSize={20}
                        fontWeight='bold'
                        onPress={() => this.props.navigation.navigate('Perfil')} />
                </Col>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {},
    contaSec1: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    contImg: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        textAlign: 'center'
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: '#00AA37',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    contPrincipalInfo: {
        justifyContent: 'center',
        padding: 20,
    },
    txt: {
        fontSize: 20
    },
    contMoreInfo: {
        flex: 2,
        paddingHorizontal: 20,
        paddingTop: 20
    },
})

const mapStateToProps = state => {
    return {
        jwt: state.services.jwt,
        user: state.services.user

    };
};


export default connect(mapStateToProps)(ModificarPasajero)
