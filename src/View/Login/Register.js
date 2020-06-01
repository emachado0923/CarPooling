import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TitlesTop } from '../../Components/titles/titlesTop';
import { Input, Button } from '../../Components/common';
import { API } from '../../API/comunicacionApi';
import AsyncStorage from '@react-native-community/async-storage';
import { Registro } from '../../redux/actions/configRegister';
import {connect} from 'react-redux'
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
            profile: 'ninguno'
        }
    }

    async registrarUsuario() {
        this.props.registrar(this.state)

        this.props.navigation.navigate("SelectRol")
        // console.log('Mostrar el registro',AsyncStorage.getItem('usuarioRegistro'))

    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <TitlesTop
                            title='REGISTRAR'
                            widthSize='50%'
                            bgColor="#FF8C01"
                            txtColor='#fff'
                        />
                        <ScrollView>
                            <View style={styles.containerGen}>
                                <View style={styles.contImg}>
                                    <Image
                                        source={require("../../resources/img/logoInicio/LogoSENA-naranja_vector.png")}
                                        style={styles.stylesImg}
                                    />
                                </View>
                                <View style={styles.contForm}>
                                    <Input
                                        labelColor='#00AA37'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Nombre'
                                        borderBottomColor='#00AA37'
                                        placeholder='Ingresa tu nombre'
                                        onChangeText={(value) => this.setState({ nombre: value })}
                                    />
                                    <Input
                                        labelColor='#00AA37'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Apellido'
                                        borderBottomColor='#00AA37'
                                        placeholder='Ingresa tu apellido'
                                        onChangeText={(value) => this.setState({ apellido: value })}
                                    />
                                    <Input
                                        labelColor='#00AA37'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Email'
                                        borderBottomColor='#00AA37'
                                        placeholder='Ingresa tu correo sena'
                                        onChangeText={(value) => this.setState({ correo: value })}
                                    />
                                    <Input
                                        labelColor='#00AA37'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Centro'
                                        borderBottomColor='#00AA37'
                                        placeholder='Ingresa tu centro de formación'
                                        onChangeText={(value) => this.setState({ centro: value })}
                                    />
                                    <Input
                                        labelColor='#00AA37'
                                        labelSize={20}
                                        fontInputSize={20}
                                        label='Dirección'
                                        borderBottomColor='#00AA37'
                                        placeholder='Ingresa tu dirección'
                                        onChangeText={(value) => this.setState({ dirección: value })}
                                    />
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
        // backgroundColor: '#16ade1'
    },
    contImg: {
        // backgroundColor:'white'
    },
    stylesImg: {
        width: 200,
        height: 200,
    },
    contForm: {
        flex: 1,
        width: '100%',
        // height:700,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 24,
        // backgroundColor: 'pink'
    },
    contBtns: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        // backgroundColor: 'blue'
    }
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

