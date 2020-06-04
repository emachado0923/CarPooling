import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TitlesTop } from '../../Components/titles/titlesTop';
import { Input, Button } from '../../Components/common';
import { API, URL_API } from '../../API/comunicacionApi';
// import AsyncStorage from '@react-native-community/async-storage';
import { Registro } from '../../redux/actions/configRegister';
import { connect } from 'react-redux'
import { ButtonSelect } from '../../Components/common/ButtonSelect';
// import CustomizeProfile from './customizeProfile/index';


class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            nombre: '',
            apellido: '',
            correo: '',
            centro: '',
            dirección: '',
            profile: '',
            contraseña: '',
            vehiculo: {}
        }
    }
    async registrarUsuario() {
        
        await API.POST(`/api/usuario`, this.state)
            .then(() => {
                console.log('Muestra los datos de registro-->', this.state)
            })
            .catch(() => {
                console.log('Error')
            })

    }

    render() {
        const { profile } = this.state;
        return (
            <Grid>
                <Row>
                    <Col>

                        <ScrollView>
                            <TitlesTop
                                title='REGISTRAR'
                                widthSize='50%'
                                bgColor="#FF8C01"
                                txtColor='#fff'
                            />
                            <View style={styles.containerGen}>
                                <View style={styles.contImg}>
                                    <Image
                                        source={require("../../resources/img/logoInicio/LogoSENA-naranja_vector.png")}
                                        style={styles.stylesImg}
                                    />
                                </View>
                                <View style={styles.contForm}>
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Nombre'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu nombre'
                                        onChangeText={(value) => this.setState({ nombre: value })}
                                    />
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Apellido'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu apellido'
                                        onChangeText={(value) => this.setState({ apellido: value })}
                                    />
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Email'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu correo sena'
                                        onChangeText={(value) => this.setState({ correo: value })}
                                    />
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Centro'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu centro de formación'
                                        onChangeText={(value) => this.setState({ centro: value })}
                                    />
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Dirección'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu dirección'
                                        onChangeText={(value) => this.setState({ dirección: value })}
                                    />
                                    <Input
                                        labelColor='#FF8C01'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Contraseña'
                                        borderBottomColor='#FF8C01'
                                        placeholder='Ingresa tu contraseña'
                                        onChangeText={(value) => this.setState({ contraseña: value })}
                                    />
                                </View>
                                <View style={styles.contSelectionRol}>
                                    <TitlesTop
                                        title='SELECCIÓN DE ROL'
                                        widthSize='60%'
                                        bgColor="#00AA37"
                                        txtColor='#fff'
                                    />
                                    <Text style={{ padding: 20, fontSize: 20, textAlign: 'center' }}>
                                        ¿Serás un Conductor o un Pasajero?
                                    </Text>
                                    <View style={styles.btnsCont}>
                                        <ButtonSelect
                                            title="Conductor"
                                            sizeIcon={36}
                                            colorIcon='#fff'
                                            onPress={() => this.setState({ profile: 'CONDUCTOR' })}
                                            colorText='#fff'
                                            bgColor='#FF8C01'
                                            borderRadius={24}
                                        />
                                        <ButtonSelect
                                            title="Pasajero"
                                            sizeIcon={36}
                                            colorIcon='#fff'
                                            onPress={() => this.setState({ profile: 'PASAJERO' })}
                                            colorText='#fff'
                                            bgColor='#00AA37'
                                            borderRadius={24}
                                        />
                                    </View>

                                    {profile == 'CONDUCTOR' ?
                                        <View style={styles.formDataCar}>
                                            <TitlesTop
                                                title='LLENA LA INFORMACIÓN DE TU VEHÍCULO'
                                                widthSize='100%'
                                                txtColor='#FF8C01'
                                                alingTxt='center'
                                                fontSize={20}
                                                fontInputSize={20}
                                                paddingLeft={0}
                                                borderRadius={0}
                                            />
                                            <Input
                                                label='Marca'
                                                placeholder='Ingresa la marca de tu vehículo'
                                                labelColor='#00AA37'
                                                labelSize={20}
                                                fontInputSize={20}
                                                borderBottomColor='#00AA37'
                                                onChangeText={(value)=> {
                                                    let {vehiculo} = this.state;
                                                    vehiculo.marca = value
                                                    this.setState({vehiculo})
                                                }}
                                            />
                                            <Input
                                                label='Modelo'
                                                placeholder='Ingresa el modelo de tu vehículo'
                                                labelColor='#00AA37'
                                                labelSize={20}
                                                fontInputSize={20}
                                                borderBottomColor='#00AA37'
                                                onChangeText={(value)=> {
                                                    let {vehiculo} = this.state;
                                                    vehiculo.modelo = value
                                                    this.setState({vehiculo})
                                                }}
                                            />
                                            <Input
                                                label='Número de placa'
                                                placeholder='Ingresa tu número de placa'
                                                labelColor='#00AA37'
                                                labelSize={20}
                                                fontInputSize={20}
                                                borderBottomColor='#00AA37'
                                                onChangeText={(value)=> {
                                                    let {vehiculo} = this.state;
                                                    vehiculo.placa = value
                                                    this.setState({vehiculo})
                                                }}
                                            />
                                        </View>
                                        : profile == 'PASAJERO' ?
                                            <View style={styles.formDataCar}>
                                                <Text style={styles.textPasajero}>
                                                    SELECCIONASTE EL ROL DE PASAJERO, YA TE PUEDES REGISTRAR.
                                                </Text>
                                            </View>
                                            : null
                                    }

                                </View>

                                <View style={styles.contBtns}>
                                    <Button
                                        title='Registrarse'
                                        bgColor='#FF8C01'
                                        colorText='#fff'
                                        fontSize={20}
                                        onPress={() => this.registrarUsuario()}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    containerGen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 36,
    },
    stylesImg: {
        width: 200,
        height: 200,
    },
    contForm: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    contSelectionRol: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#16ade1'
    },
    formDataCar: {
        paddingHorizontal: 24
    },
    textPasajero: {
        fontSize: 18,
        color: '#00AA37',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnsCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    contBtns: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
    },
})

const mapStateToProps = state => {
    return {
        jwt: state.services.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registrar: est => dispatch(Registro(est)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

