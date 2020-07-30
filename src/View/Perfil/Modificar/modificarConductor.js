import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { connect } from "react-redux";
import { TitlesTop } from "../../../Components/titles/titlesTop";
import { ScrollView } from "react-native-gesture-handler";
import { Col } from "react-native-easy-grid";
import { Button, Input } from "../../../Components/common";
import Axios from "axios";
import { API } from "../../../API/comunicacionApi";

class ModificarConductor extends Component {
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
            marca: this.props.user.vehiculo.marca,
            color: this.props.user.vehiculo.color,
            placa: this.props.user.vehiculo.placa,

        }
    }

    _ModificarUsuario = async () => {
        const id = this.props.user._id
        API.PUT(`/conductor/${id}`, this.state).then((res) => {
            Alert.alert(
                "ESTADO DE EDICIÓN",
                "El usuario se editó con éxito",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate('Perfil'), }
                ],
                { cancelable: false }
            );
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
                </Col>
                <TitlesTop
                    title='EDITAR INFORMACIÓN DEL VEHÍCULO'
                    bgColor='#00AA37'
                    txtColor='#fff'
                />
                <Col style={styles.contMoreInfo}>
                    <Input
                        value={this.state.marca}
                        label='Marca'
                        labelSize={20}
                        labelColor='#00AA37'
                        editable={true}
                        onChangeText={(marca) => this.setState({ marca })}
                    />
                    <Input
                        value={this.state.color}
                        label='Color'
                        labelSize={20}
                        labelColor='#00AA37'
                        editable={true}
                        onChangeText={(color) => this.setState({ color })}
                    />
                    <Input
                        value={this.state.placa}
                        label='Placa'
                        labelSize={20}
                        labelColor='#00AA37'
                        editable={true}
                        onChangeText={(placa) => this.setState({ placa })}
                    />
                </Col>


                <View style={styles.contImg}>
                    <View style={styles.img}>
                        <Image source={{ uri: 'http://192.168.1.1:3000/uploads/' + this.props.user.foto }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                    </View>
                    <View style={{ width: '40%' }}>
                        <Button
                            title='Cambiar foto'
                            borderColor='#00AA37'
                            borderWidth={2}
                            widthSize='100%'
                            fontSize={20}
                            bgColor='transparent'
                            colorText='#707070'
                            fontWeight='bold'
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 12 }}>
                    <View style={{ width: '40%' }}>
                        <Button
                            title='Guardar'
                            borderWidth={2}
                            bgColor='#00AA37'
                            fontSize={20}
                            colorText='#fff'
                            fontWeight='bold'
                            widthSize='100%'
                            onPress={this._ModificarUsuario}
                        />
                    </View>
                    <View style={{ width: '40%' }}>
                        <Button
                            title='Cancelar'
                            bgColor='#FF8C01'
                            colorText='#FFF'
                            fontSize={20}
                            fontWeight='bold'
                            widthSize='100%'
                            onPress={() => this.props.navigation.navigate('Perfil')}
                        />
                    </View>
                </View>

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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12
    },
    img: {
        width: 150,
        height: 150,
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


export default connect(mapStateToProps)(ModificarConductor)
