import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TextInput} from "react-native";
import {connect} from "react-redux";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import {ScrollView} from "react-native-gesture-handler";
import {Col} from "react-native-easy-grid";
import {Button, Input} from "../../../Components/common";
import Axios from "axios";
import {API} from "../../../API/comunicacionApi";

class ModificarPerfil extends Component {
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
            marca: this.props.user.vehiculo.marca,
            color: this.props.user.vehiculo.color,
            placa: this.props.user.vehiculo.placa,

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
                    title={`Modificar ${this.props.user.profile}`}
                    widthSize='80%'
                    bgColor="#FF8C01"
                    txtColor='#fff'
                />
                <Col style={styles.contMoreInfo}>
                    <Input value={this.state.nombre} label='Nombre' editable={true}
                           onChangeText={(nombre) => this.setState({nombre})}/>

                    <Input value={this.state.apellido} label='Apellido' editable={true}
                           onChangeText={(apellido) => this.setState({apellido})}/>


                    <Input keyboardType={'phone-pad'} label='Celular' value={this.state.celular.toString()}
                           editable={true} onChangeText={(celular) => this.setState({celular})}/>


                    <Input value={this.state.correo} label='Correo electronico' editable={true}
                           onChangeText={(correo) => this.setState({correo})}/>

                    <Input value={this.state.dirección} label='Dirrección' editable={true}
                           onChangeText={(dirección) => this.setState({dirección})}/>

                    <Input value={this.state.centro} label={'Centro'} editable={true}
                           onChangeText={(centro) => this.setState({centro})}/>


                    {this.props.user.profile === 'CONDUCTOR' ? (
                        <View>
                            <Text>Modifique su vehiculo</Text>
                            <Input value={this.state.marca} editable={true}
                                   onChangeText={(marca) => this.setState({marca})}/>
                            <Input value={this.state.color} editable={true}
                                   onChangeText={(color) => this.setState({color})}/>
                            <Input value={this.state.placa} editable={true}
                                   onChangeText={(placa) => this.setState({placa})}/>
                        </View>
                    ) : null}
                </Col>
                <Col style={{alignItems: 'center', width: '100%'}}>
                    <Button title='Guardar' borderWidth={2}
                            borderColor='#00AA37' fontSize={20}
                            colorText='#00AA37' fontWeight='bold'
                            onPress={this._ModificarUsuario}
                    />
                    <Button title={'Volver'} onPress={()=> this.props.navigation.navigate('Perfil')}/>
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


export default connect(mapStateToProps)(ModificarPerfil)
