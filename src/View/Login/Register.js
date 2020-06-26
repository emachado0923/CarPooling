import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';
import {Col, Row, Grid} from "react-native-easy-grid";
import {TitlesTop} from '../../Components/titles/titlesTop';
import {Input, Button} from '../../Components/common';
import {API, URL_API} from '../../API/comunicacionApi';
import Icon from "react-native-vector-icons/FontAwesome";
// import AsyncStorage from '@react-native-community/async-storage';
import {Registro} from '../../redux/actions/configRegister';
import {connect} from 'react-redux'
import {ButtonSelect} from '../../Components/common/ButtonSelect';
// import CustomizeProfile from './customizeProfile/index';
// Formik and yup
import {Formik} from 'formik'
import * as yup from 'yup'


class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            vehiculo: {}
        }
    }

    async registrarUsuario(values) {

        await API.POST(`/api/usuario`, values)
            .then(() => {
                alert('Registro completado')
            })
            .catch(() => {
                console.log('Error')
            })

    }

    render() {
        const {profile} = this.state;
        return (

            <Formik initialValues={{
                nombre: '',
                apellido: '',
                correo: '',
                centro: '',
                dirección: '',
                contraseña: '',
                profile: '',
                marca: '',
                modelo: '',
                placa: ''
            }} onSubmit={values => this.registrarUsuario(values)}
                    validationSchema={
                        yup.object().shape({

                            nombre: yup.string().required('El nombre es obligatorio!').min(7, 'El nombre debe tener más de 7 caracteres!').max(40, 'Por favor ingrese no más de 40 caracteres'),
                            apellido: yup.string().required('El apellido es obligatorio!').min(7, 'El apellido debe tener más de 7 caracteres!').max(40, 'Por favor ingrese no más de 40 caracteres'),
                            correo: yup.string().required('El correo es obligatorio!').email('Direccion de correo invalida!').matches(/(misena.edu.co$|sena.edu.co$)/, 'Solo se permiten correos sena'),
                            centro: yup.string().required('El centro es obligatorio!'),
                            dirección: yup.string().required('La dirección es obligatoria!').min(7, 'La direccion debe tener más de 7 caracteres!'),
                            contraseña: yup.string().required('La Contraseña es obligatoria').min(7, 'La contraseña debe tener más de 7 caracteres!'),
                            profile: yup.string().required('Selecciona un rol!'),

                            marca: yup.string().when('profile', {
                                is: 'CONDUCTOR', then: yup.string().required('La marca es obligatoria!')
                            }),
                            modelo: yup.string().when('profile', {
                                is: 'CONDUCTOR', then: yup.string().required('El modelo es obligatorio!'),
                            }),

                            placa: yup.string().when('profile', {
                                is: 'CONDUCTOR', then: yup.string().required('La placa es obligatoria!'),
                            }),


                        })}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
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
                                                onBlur={handleBlur('nombre')}
                                                onChangeText={handleChange('nombre')}
                                                values={values.nombre}
                                            />
                                            {/* Errores*/}
                                            {touched.nombre && errors.nombre &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.nombre}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={20}
                                                label='Apellido'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu apellido'
                                                onChangeText={handleChange('apellido')}
                                                onBlur={handleBlur('apellido')}
                                                values={values.apellido}
                                            />
                                            {/* Errores*/}
                                            {touched.apellido && errors.apellido &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.apellido}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={20}
                                                label='Email'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu correo sena'
                                                onBlur={() => setFieldTouched('correo')}
                                                onChangeText={handleChange('correo')}
                                                values={values.correo}
                                            />
                                            {/* Errores*/}
                                            {touched.correo && errors.correo &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.correo}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={20}
                                                label='Centro'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu centro de formación'
                                                onBlur={handleBlur('centro')}
                                                onChangeText={handleChange('centro')}
                                                values={values.centro}
                                            />
                                            {/* Errores*/}
                                            {touched.centro && errors.centro &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.centro}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={20}
                                                label='Dirección'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu dirección'
                                                onBlur={handleBlur('email')}
                                                onChangeText={handleChange('dirección')}
                                                values={values.dirección}
                                            />
                                            {/* Errores*/}
                                            {touched.dirección && errors.dirección &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.dirección}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={20}
                                                label='Contraseña'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu contraseña'
                                                onBlur={handleBlur('contraseña')}
                                                onChangeText={handleChange('contraseña')}
                                                values={values.contraseña}
                                                // secureTextEntry={true}
                                            />
                                            {/* Errores*/}
                                            {touched.contraseña && errors.contraseña &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={20}/> {errors.contraseña}
                                            </Text>
                                            }
                                        </View>
                                        <View style={styles.contSelectionRol}>
                                            <TitlesTop
                                                title='SELECCIÓN DE ROL'
                                                widthSize='60%'
                                                bgColor="#00AA37"
                                                txtColor='#fff'
                                            />
                                            <Text style={{padding: 20, fontSize: 20, textAlign: 'center'}}>
                                                ¿Serás un Conductor o un Pasajero?
                                            </Text>

                                            <View style={styles.btnsCont}>
                                                <ButtonSelect
                                                    title="Conductor"
                                                    sizeIcon={36}
                                                    colorIcon='#fff'
                                                    onPress={() => {
                                                        this.setState({profile: 'CONDUCTOR'})
                                                        values.profile = 'CONDUCTOR'
                                                    }}
                                                    colorText='#fff'
                                                    bgColor='#FF8C01'
                                                    borderRadius={24}
                                                />
                                                <ButtonSelect
                                                    title="Pasajero"
                                                    sizeIcon={36}
                                                    colorIcon='#fff'
                                                    onPress={() => {
                                                        this.setState({profile: 'PASAJERO'})
                                                        values.profile = 'PASAJERO'
                                                    }}
                                                    colorText='#fff'
                                                    bgColor='#00AA37'
                                                    borderRadius={24}
                                                />
                                            </View>
                                            <View style={{alignItems: 'center'}}>
                                                {touched.profile && errors.profile &&
                                                <Text style={{fontSize: 15, color: 'red'}}>
                                                    <Icon name={'exclamation-circle'} size={20}/> {errors.profile}
                                                </Text>
                                                }
                                            </View>
                                            {profile == 'CONDUCTOR' && values.profile == 'CONDUCTOR' ?
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

                                                        /*onChangeText={(value) => {
                                                            let {vehiculo} = this.state;
                                                            vehiculo.marca = value
                                                            this.setState({vehiculo})
                                                        }}*/
                                                        onBlur={handleBlur('marca')}
                                                        onChangeText={handleChange('marca')}
                                                        values={values.marca}

                                                    />
                                                    {touched.marca && errors.marca &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={20}/> {errors.marca}
                                                    </Text>
                                                    }
                                                    <Input
                                                        label='Modelo'
                                                        placeholder='Ingresa el modelo de tu vehículo'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={20}
                                                        borderBottomColor='#00AA37'
                                                        /*onChangeText={(value) => {
                                                            let {vehiculo} = this.state;
                                                            vehiculo.modelo = value
                                                            this.setState({vehiculo})
                                                        }}*/
                                                        onBlur={handleBlur('modelo')}
                                                        onChangeText={handleChange('modelo')}
                                                        values={values.modelo}
                                                    />
                                                    {touched.modelo && errors.modelo &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={20}/> {errors.modelo}
                                                    </Text>
                                                    }
                                                    <Input
                                                        label='Número de placa'
                                                        placeholder='Ingresa tu número de placa'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={20}
                                                        borderBottomColor='#00AA37'

                                                        /*onChangeText={(value) => {
                                                            let {vehiculo} = this.state;
                                                            vehiculo.placa = value
                                                            this.setState({vehiculo})
                                                        }}*/
                                                        onBlur={handleBlur('placa')}
                                                        onChangeText={handleChange('placa')}
                                                        values={values.placa}
                                                    />
                                                    {touched.placa && errors.placa &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={20}/> {errors.placa}
                                                    </Text>
                                                    }

                                                </View>
                                                : profile == 'PASAJERO' && values.profile == 'PASAJERO' ?
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
                                                onPress={handleSubmit}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </Col>
                        </Row>
                    </Grid>
                )}
            </Formik>
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

