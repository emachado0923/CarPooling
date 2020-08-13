import React, { Component } from "react";
import { View, StyleSheet, Image, PermissionsAndroid, Alert } from "react-native";
import { connect } from "react-redux";
import { TitlesTop } from "../../../Components/titles/titlesTop";
import { ScrollView } from "react-native-gesture-handler";
import { Col } from "react-native-easy-grid";
import { Button, Input } from "../../../Components/common";
import { API, URL_API } from "../../../API/comunicacionApi";

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
    title: 'Seleccionar foto de perfil',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Seleccionar de la galaría',
    quality: 1
};

class ModificarPasajero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: true,
            foto: null,
            nombre: this.props.user.nombre,
            apellido: this.props.user.apellido,
            celular: this.props.user.celular,
            correo: this.props.user.correo,
            dirección: this.props.user.dirección,
            centro: this.props.user.centro,
        }
    }

    _ModificarUsuario = async () => {
        const id = this.props.user._id
        const response = await RNFetchBlob.fetch('PUT', URL_API + `/foto/${id}`, {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
            // body : JSON.stringify(values),
        },
            [
                { name: 'foto', filename: 'image.png', type: 'image/png', data: this.state.data },

            ]);
        const data = await response.json();
        if (data.ok) {
            this.state.foto = data.name;
            API.PUT(`/pasajero/${id}`, this.state).then((res) => {
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
    }

    render() {
        let { foto } = this.state;
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
                <View style={styles.contImg}>
                    <View style={styles.img}>
                        <Image source={{ uri: foto }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
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
                            onPress={this.handleSelectImage.bind(this)}
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
