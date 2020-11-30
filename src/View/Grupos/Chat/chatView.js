import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, Modal, TouchableHighlight, Image} from "react-native";
import io from "socket.io-client";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import {API, URL_API} from "../../../API/comunicacionApi";
import moment from "moment";


class ChatGrupo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            usuario: '',
            mensaje: '',
            chatMessages: [],
            chatMessages2: [],
            Online: [],
            array: [],
            Grupo: []
        };

    }

    componentDidMount() {

        const {grupo: {_id}} = this.props
        this.socket.emit("chat:mensajes", _id)

        this.socket.on("chat:mensajes enviados", ChatForID => {
            this.setState({
                chatMessages2: ChatForID
            });
        });
    }


    componentWillMount() {
        const {
            user: {
                nombre,
                apellido,
                correo,
                foto,
                _id
            },

        } = this.props


        API.GET(`/grupo/listar/${_id}`)
            .then(res => {
                this.setState({
                    array: res.data
                })
            })
            .catch(e => {
                console.log(e)
            })


        this.socket = io("http://192.168.1.55:3000");
        this.socket.on("chat:nuevo mensaje", msg => {
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
        });


        const MiembroGrupo = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            foto: foto,
            userID: _id
        }

        this.socket.emit('NuevoConectado', MiembroGrupo, data => {
            if (!data) {
                this.socket.on('enLinea', usuarios => {
                    this.setState({
                        Online: usuarios
                    });
                })
            } else {
                this.socket.on('enLinea', usuarios => {
                    this.setState({
                        Online: usuarios
                    });
                })
            }
        })


        this.socket.on("chat:mensajes enviados", ChatForID => {

            this.setState({
                chatMessages2: ChatForID
            });
        });


    }


    submitChatMessage() {

        const {
            user: {nombre, foto},
            grupo: {_id}
        } = this.props

        let FechaCreacion = new Date()

        if (this.state.mensaje === '') {
            return false
        }

        this.socket.emit('chat:enviar mensaje', {
            grupo: _id,
            usuario: this.props.user._id,
            nombreUsuario: nombre,
            userFoto: foto,
            mensaje: this.state.mensaje,
            fecha: FechaCreacion

        });
        this.setState({mensaje: ''});

    }

    renderizarMensaje(Data) {
        Data.map((item, index) => (
                <View key={index}>
                    <Text style={{fontWeight: 'bold'}}>{item.mensaje}</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.usuario[0].nombre}</Text>
                    <Text style={{fontSize: 10}}>{moment(item.created).locale('es').format('YYYY-MM-DD')}</Text>
                </View>
            )
        )
    }

    render() {
        const {
            chatMessages,
            chatMessages2,
            Online
        } = this.state


        return (

            <View style={{flex: 1}}>
                {Online.map((item, index) => (

                    <View key={index} style={{
                        flexDirection: 'row',

                        backgroundColor: '#FF8C01',
                        padding: 0, width: 160
                    }}>

                        <Image source={{uri: `http://192.168.1.55:3000/uploads/${item.foto}`}}
                               style={{width: 50, height: 50, borderRadius: 50}}/>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            {item.nombre}&nbsp;
                            <Icon name='circle' color={'green'} solid size={10}/>
                        </Text>

                    </View>

                ))}


                <ScrollView style={{borderColor: '#000', borderWidth: 1, height: 100, width: '100%'}}>

                    {//Mensajes antiguos
                        chatMessages2.map((item, index) => (
                                <View key={index} style={
                                    {
                                        backgroundColor: '#d1d9cd',
                                        margin: 5, borderWidth: 1, borderRadius: 15,
                                        justifyContent: "space-between"
                                    }
                                }>
                                    <Image source={{uri: `http://192.168.1.55:3000/uploads/${item.usuario[0].foto}`}}
                                           style={{width: 40, height: 40, borderRadius: 50}}/>
                                    <Text style={{fontWeight: 'bold'}}>{item.mensaje}</Text>
                                    <Text style={{color: '#6e5757'}}>{item.usuario[0].nombre}</Text>
                                    <Text style={{fontSize: 10}}>
                                        {moment(item.created).locale('es').format('YYYY-MM-DD')}
                                    </Text>
                                </View>
                            )
                        )
                    }
                    {//Mensajes nuevos
                        chatMessages.map((value, index) => (
                                <View key={index} style={
                                    {
                                        backgroundColor: '#d1d9cd',
                                        margin: 5, borderWidth: 1, borderRadius: 15,
                                        justifyContent: "space-between"
                                    }
                                }>
                                    <Image source={{uri: `http://192.168.1.55:3000/uploads/${value.userFoto}`}}
                                           style={{width: 40, height: 40, borderRadius: 50}}/>
                                    <Text style={{fontWeight: 'bold'}}>{value.mensaje}</Text>
                                    <Text style={{color: '#6e5757'}}>{value.nombreUsuario}</Text>
                                    <Text style={{fontSize: 10}}>
                                        {moment(value.fecha).locale('es').format('YYYY-MM-DD')}
                                    </Text>
                                </View>
                            )
                        )}

                </ScrollView>

                <View style={{
                    backgroundColor: '#FF8C01',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5
                }}>
                    <TextInput
                        style={{
                            height: 40,
                            width: 300,
                            margin: 5,
                            borderWidth: 1,
                            borderRadius: 10,
                            backgroundColor: '#fff'
                        }}
                        autoCorrect={false}
                        value={this.state.mensaje}

                        onChangeText={mensaje => {
                            this.setState({mensaje});
                        }}
                    />
                    <TouchableHighlight style={{
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        right: 5,
                        margin: 5
                    }} onPress={() => this.submitChatMessage()}
                    >
                        <Icon name={'paper-plane'} size={15}/>
                    </TouchableHighlight>
                </View>
            </View>
        )

    }
}


const mapStateToProps = state => {
    return {
        user: state.services.user
    };
};

export default connect(mapStateToProps)(ChatGrupo);
