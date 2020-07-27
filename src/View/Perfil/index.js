import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deleteJWT } from "../../redux/actions/services";
import { Grid, Row, Col } from "react-native-easy-grid";

// Componentes
import { ButtonMenu } from "../../Components/common/ButtonMenu";
import { ScrollView } from "react-native-gesture-handler";
import { TitlesTop } from "../../Components/titles/titlesTop";
import CardInfo from "../../Components/cards/CardInfo";
import { Button } from '../../Components/common/Button';

// Image Picker
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { API } from "../../API/comunicacionApi";


class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: true,
            image: null,
        };
    }


    actualizar_jwt() {
        const token = this.props.delJWT();
        if (token) {
            this.props.navigation.navigate('Auth')
        }
    }

    modificarPerfil = () => {
        if (this.props.user.profile === 'CONDUCTOR') {
            this.props.navigation.navigate('ModificarConductor')
        }
        if (this.props.user.profile === 'PASAJERO') {
            this.props.navigation.navigate('ModificarPasajero')
        }


    }

    render() {
        const id = this.props.user._id;
        const image = this.props.user.foto;
        console.log('Imagen del perfil --->', image)
        return (
            <ScrollView style={styles.container}>
                <Row style={styles.contaSec1}>
                    <Col style={styles.contImg}>
                        <View style={styles.img}>

                            {/* <Image source={image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /> */}
                            {image &&

                                <Image source={image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            }

                            {/* {
                                this.props.user.foto === null || this.props.user.foto === "" && this.state.image === null ?
                                    <Button title='Seleccionar una foto' bgColor='transparent' widthSize='90%'
                                        colorText='#707070' fontSize={16} onPress={this._pickImage} />
                                    : (
                                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                            source={{ uri: `http://192.168.1.2:3000/${this.props.user.foto}` }} />
                                    )
                            } */}

                        </View>
                        <Text style={styles.txt}>{this.props.user.nombre} {this.props.user.apellido}</Text>
                    </Col>
                    <Col style={styles.contPrincipalInfo}>
                        <Text style={styles.txt}>{this.props.user.profile}</Text>

                        <Text style={styles.txt}>2029 puntos</Text>
                        <ButtonMenu
                            onPress={this.actualizar_jwt.bind(this)}
                            colorText='#00AA37'
                            title='Cerrar sesión'
                            iconName='sign-out-alt'
                            iconSize={20}
                            fontSize={20}
                        />
                    </Col>
                </Row>
                <TitlesTop
                    title='TODA TU INFORMACIÓN'
                    widthSize='80%'
                    bgColor="#FF8C01"
                    txtColor='#fff'
                />
                <Col style={styles.contMoreInfo}>
                    <CardInfo
                        size={60}
                        iconName='address-card'
                        iconSize={28}
                        iconColor='#5a5a5a'
                        title={this.props.user.tipo_doc}
                        colorTitle='#FF8C01'
                        info={this.props.user.numero_doc}
                    />
                    <CardInfo
                        size={60}
                        iconName='phone'
                        iconSize={28}
                        iconColor='#5a5a5a'
                        title='Número de celular'
                        colorTitle='#FF8C01'
                        info={this.props.user.celular}
                    />
                    <CardInfo
                        size={60}
                        iconName='envelope'
                        iconSize={28}
                        iconColor='#5a5a5a'
                        title='Correo'
                        colorTitle='#FF8C01'
                        info={this.props.user.correo}
                    />
                    <CardInfo
                        size={60}
                        iconName='home'
                        iconSize={28}
                        iconColor='#5a5a5a'
                        title='Dirección'
                        colorTitle='#FF8C01'
                        info={this.props.user.dirección}
                    />
                    <CardInfo
                        size={60}
                        iconName='building'
                        iconSize={28}
                        iconColor='#5a5a5a'
                        title='Centro de formación'
                        colorTitle='#FF8C01'
                        info={this.props.user.centro}
                    />
                </Col>
                {
                    this.props.user.profile === 'CONDUCTOR' ? (
                        <View>
                            <TitlesTop
                                title='INFORMACIÓN DE TU VEHICULO'
                                widthSize='80%'
                                bgColor="#00AA37"
                                txtColor='#fff'
                            />
                            <Col style={styles.contMoreInfo}>
                                <CardInfo
                                    size={60}
                                    iconName='car'
                                    iconSize={28}
                                    iconColor='#5a5a5a'
                                    title='Marca del Vehiculo'
                                    colorTitle='#00AA37'
                                    info={this.props.user.vehiculo.marca}
                                />
                                <CardInfo
                                    size={60}
                                    iconName='tint'
                                    iconSize={28}
                                    iconColor='#5a5a5a'
                                    title='Color del Vehiculo'
                                    colorTitle='#00AA37'
                                    info={this.props.user.vehiculo.color}
                                />
                                <CardInfo
                                    size={60}
                                    iconName='address-card'
                                    iconSize={28}
                                    iconColor='#5a5a5a'
                                    title='Placa del Vehiculo'
                                    colorTitle='#00AA37'
                                    info={this.props.user.vehiculo.placa}
                                />
                            </Col>
                        </View>
                    ) : null
                }
                <Col style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Button
                        title='Editar'
                        bgColor='#00AA37'
                        fontSize={20}
                        colorText='#FFF'
                        fontWeight='bold'
                        onPress={this.modificarPerfil}
                    />
                </Col>
            </ScrollView>
        );
    }

    // componentDidMount() {
    //     this.getPermissionAsync();
    // }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // };

    // _pickImage = async () => {
    //     try {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: false,
    //             aspect: [4, 3],
    //             quality: 1,
    //         });
    //         if (!result.cancelled) {
    //             this.setState({ image: result.uri });

    //             console.log(this.state.image)

    //         }

    //     } catch (E) {
    //         console.log('error', E);
    //     }
    // };
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
        // person : state.people.person
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actualizar_jwt: est => dispatch(jwt(est)),
        delJWT: () => dispatch(deleteJWT())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);


