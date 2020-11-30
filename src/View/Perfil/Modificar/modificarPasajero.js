import React, {Component} from "react";
import {View, StyleSheet, Image, PermissionsAndroid, Text} from "react-native";
import {connect} from "react-redux";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import {ScrollView} from "react-native-gesture-handler";
import {Col} from "react-native-easy-grid";
import {Button, Input} from "../../../Components/common";
import {API, URL_API} from "../../../API/comunicacionApi";
import {ModalAlert} from "../../../Components/Modal/modal";
import {Formik} from 'formik';
import * as yup from "yup";

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from "react-native-vector-icons/FontAwesome5";

const options = {
    title: 'Seleccionar foto de perfil',
    takePhotoButtonTitle: '📷 Tomar foto',
    chooseFromLibraryButtonTitle: '🖼️ Seleccionar de la galería',
    quality: 1
};

const Validaciones = yup.object().shape({

    nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    apellido: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    celular: yup.number().required('El número de celular es obligatorio'),
    dirección: yup.string().required('La dirección es obligatoria').min(7, 'La direccion debe tener más de 7 caracteres'),

})


class ModificarPasajero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: true,
            foto: 'http://192.168.1.55:3000/uploads/' + this.props.user.foto,


            modalVisible: false,
            message: '',
            color: '',
            icon: ''
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    _ModificarFoto = () => {

        const id = this.props.user._id
        const token = this.props.jwt


        RNFetchBlob.fetch('PUT', URL_API + `/foto/${id}`, {
                Authorization: `Bearer ${token}`,
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
            },
            [
                {name: 'foto', filename: 'image.png', type: 'image/png', data: this.state.data},

            ])
            .then(res => {
                let json = res.json()
                let status = res.info().status;
                if (status === 202) {
                    this.setState({
                        modalVisible: true,
                        message: json.message,
                        color: 'green',
                        icon: 'check'
                    })
                } else {
                    this.setState({
                        modalVisible: true,
                        message: json.message,
                        color: 'red',
                        icon: 'times'
                    })
                }

            })
            .catch(e => {
                console.log(e)
            })

    }
    _ModificarUsuario = (values) => {


        const id = this.props.user._id

        API.PUT(`/pasajero/${id}`, values)
            .then((res) => {
                this.setState({
                    modalVisible: true,
                    message: res.data.message,
                    color: 'green',
                    icon: 'check'
                })
            })
            .catch((e) => {
                this.setState({
                    modalVisible: true,
                    message: e.response.data.error,
                    color: 'red',
                    icon: 'times'
                })
            })


    }


    render() {
        let {foto, modalVisible} = this.state;
        return (
            <ScrollView>
                <TitlesTop
                    title={`EDITAR INFORMACIÓN PERSONAL`}
                    widthSize='80%'
                    bgColor="#FF8C01"
                    txtColor='#fff'
                />
                <Formik initialValues={{

                    nombre: this.props.user.nombre,
                    apellido: this.props.user.apellido,
                    celular: this.props.user.celular.toString(),
                    dirección: this.props.user.dirección,

                }} validationSchema={Validaciones}
                        onSubmit={values => this._ModificarUsuario(values)}>
                    {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                        <View>
                            <Col style={styles.contMoreInfo}>
                                <Input
                                    labelColor='#FF8C01'
                                    labelSize={20}
                                    fontInputSize={17}
                                    label='Nombre'
                                    borderBottomColor='#FF8C01'
                                    onBlur={handleBlur('nombre')}
                                    onChangeText={handleChange('nombre')}
                                    values={values.nombre}
                                    value={values.nombre}
                                />
                                {/* Errores*/}
                                {touched.nombre && errors.nombre &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={15}/> {errors.nombre}
                                </Text>
                                }
                                <Input
                                    labelColor='#FF8C01'
                                    labelSize={20}
                                    fontInputSize={17}
                                    label='Apellido'
                                    borderBottomColor='#FF8C01'
                                    onChangeText={handleChange('apellido')}
                                    onBlur={handleBlur('apellido')}
                                    values={values.apellido}
                                    value={values.apellido}
                                />
                                {/* Errores*/}
                                {touched.apellido && errors.apellido &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={15}/> {errors.apellido}
                                </Text>
                                }
                                <Input
                                    labelColor='#FF8C01'
                                    labelSize={20}
                                    fontInputSize={17}
                                    label='Número de celular'
                                    borderBottomColor='#FF8C01'
                                    onChangeText={handleChange('celular')}
                                    onBlur={handleBlur('celular')}
                                    values={values.celular}
                                    value={values.celular}
                                    keyboardType={'number-pad'}
                                />
                                {/* Errores*/}
                                {touched.celular && errors.celular &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={15}/> {errors.celular}
                                </Text>
                                }
                                <Input
                                    labelColor='#FF8C01'
                                    labelSize={20}
                                    fontInputSize={17}
                                    label='Dirección'
                                    borderBottomColor='#FF8C01'
                                    onBlur={handleBlur('dirección')}
                                    onChangeText={handleChange('dirección')}
                                    value={values.dirección}
                                    values={values.dirección}
                                />
                                {/* Errores*/}
                                {touched.dirección && errors.dirección &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={15}/> {errors.dirección}
                                </Text>
                                }

                            </Col>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginVertical: 12
                            }}>
                                <View style={{width: '40%'}}>
                                    <Button
                                        title='Guardar'
                                        borderWidth={2}
                                        bgColor='#00AA37'
                                        fontSize={20}
                                        colorText='#fff'
                                        fontWeight='bold'
                                        widthSize='100%'
                                        onPress={handleSubmit}
                                    />
                                </View>

                            </View>
                        </View>
                    )}
                </Formik>
                <TitlesTop
                    title={`EDITAR FOTO DE PERFIL`}
                    widthSize='80%'
                    bgColor="#FF8C01"
                    txtColor='#fff'
                />
                <View style={styles.contImg}>
                    <View style={styles.img}>
                        <Image source={{uri: foto}} style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
                    </View>
                    <View style={{width: '40%'}}>
                        <Button
                            title='Seleccionar'
                            borderColor='#00AA37'
                            borderWidth={2}
                            widthSize='100%'
                            fontSize={20}
                            bgColor='white'
                            colorText='#707070'
                            fontWeight='bold'
                            onPress={this.handleSelectImage.bind(this)}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 12
                }}>
                    <View style={{width: '40%'}}>
                        <Button
                            title='Guardar'
                            borderWidth={2}
                            bgColor='#00AA37'
                            fontSize={20}
                            colorText='#fff'
                            fontWeight='bold'
                            widthSize='100%'
                            onPress={this._ModificarFoto}


                        />
                    </View>
                    <View style={{width: '40%'}}>
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
                <ModalAlert
                    modalvisible={modalVisible}
                    title={this.state.message}
                    IconName={this.state.icon}
                    ErrorModal={this.state.color}
                    onPress={() => {
                        this.setModalVisible(!modalVisible)
                        this.props.navigation.navigate('Perfil')

                    }}
                />

            </ScrollView>

        )
    }

    async componentDidMount() {
        this.requestCameraRollPermission()
    }

    async requestCameraRollPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Permiso de archivos',
                    'message': 'La aplicación necesita acceso a tus imagenes'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    handleSelectImage() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('usuario canceló la selección de la imagen');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('Botón personalizado del usuario pulsado: ', response.customButton);
            } else {
                this.setState({
                    foto: response.uri,
                    data: response.data
                })
            }
        });

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


export default connect(mapStateToProps)(ModificarPasajero)
