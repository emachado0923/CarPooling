import React, {Component} from "react";
import {View, ImageBackground, FlatList, Text, StyleSheet, Image} from "react-native";
import {connect} from 'react-redux';
import * as Actions from "../../../redux/actions/Usuario/UsuarioActions";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import Card from "../../../Components/cards/card";
import {ModalForm} from "../../../Components/Modal/modalForm";
import {Button} from "../../../Components/common";
import Icon from "react-native-vector-icons/FontAwesome5";
import {SwipeListView} from "react-native-swipe-list-view";
import CardInfo from "../../../Components/cards/CardInfo";
import {ModalInfo} from "../../../Components/Modal/modalInfo";
import {Col} from "react-native-easy-grid";
import {API} from "../../../API/comunicacionApi";
import {ModalAlert} from "../../../Components/Modal/modal";


class AdminUsuarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            cargando: false,
            modalVisible: false,
            modalVisible2: false,
            Objeto: {},
            message: '',
            color: '',
            icon: '',
        }
    }

    componentDidMount() {
        if (!this.props.usuarios.length) {
            this.props.ListarUsuarios()
        }

    }

    onRefresh() {
        this.setState({isFetching: true}, function () {
            this.props.ListarUsuarios();

        });
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }
    setModalVisible2 = (visible) => {
        this.setState({modalVisible2: visible});
    }

    DeshabilitarUsuario = (usuario) => {

        API.DEL(`/usuario/${usuario._id}/false`)
            .then(res => {
                this.setState({
                    modalVisible2: true,
                    message: res.data.message,
                    color: 'green',
                    icon: 'check'
                })
                this.onRefresh()
            })
            .catch(e => {
                this.setState({
                    modalVisible2: true,
                    message: e.response.data.error,
                    color: 'red',
                    icon: 'times'
                })
            })

    }

    InfoUsuario = () => {
        const Usuario = this.state.Objeto
        return (
            <View>
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontStyle: "italic",
                        fontSize: 22,
                        textAlign: "center"
                    }}>{Usuario.nombre + ' ' + Usuario.apellido}
                    </Text>
                </View>
                <Image source={{uri: 'http://192.168.1.55:3000/uploads/' + Usuario.foto}}
                       style={{
                           width: 100,
                           height: 100,
                           borderRadius: 100,
                           borderWidth: 2,
                           borderColor: '#2196F3',
                           left: 50
                       }}/>
                <View style={{justifyContent: 'center', alignItems: "center"}}>
                    <Text>{Usuario.profile}</Text>
                    <Text>{Usuario.tipo_doc}</Text>
                    <Text>{Usuario.numero_doc}</Text>
                    <Text>{Usuario.correo}</Text>
                    <Text>{Usuario.celular}</Text>


                    <Button
                        title={<Icon name='trash' color={'#FF8C01'} size={25}/>}
                        bgColor='#FFF'
                        fontSize={20}
                        BorderRadius={200}
                        colorText='#00AA37'
                        fontWeight='bold'
                        widthSize={50}
                        borderColor={'#FF8C01'}
                        borderWidth={1}
                        marginTop={20}
                        onPress={() => this.DeshabilitarUsuario(Usuario)}
                    />
                </View>
            </View>
        )

    }

    _Lista = () => {
        const {usuarios, cargando} = this.props


        return (
            <SwipeListView
                data={usuarios}
                renderItem={this._renderItem}
                renderHiddenItem={(data, rowMap) => this.botones(data, rowMap)}
                keyExtractor={item => item._id}
                ListFooterComponent={this._renderLoader()}
                ListEmptyComponent={this._listEmptyComponent}
                refreshing={cargando}
                onRefresh={() => this.onRefresh()}
                leftOpenValue={75}
                rightOpenValue={-70}
                disableRightSwipe
            />
        )
    }
    botones = (data) => {

        return (
            <View style={Stylus.buttonsContainer}>
                <Button
                    title={<Icon name='info' color={'#FF8C01'} size={25}/>}
                    bgColor='#FFF'
                    fontSize={20}
                    BorderRadius={200}
                    colorText='#00AA37'
                    fontWeight='bold'
                    widthSize={50}
                    borderColor={'#FF8C01'}
                    borderWidth={1}
                    onPress={() => {
                        this.setState({
                            Objeto: data.item
                        })
                        this.setModalVisible(true)
                    }}
                />

            </View>
        )
    }
    _renderItem = ({item, index}) => {
        return (
            <Card key={index} color="#00AA37"
                  name={`${item.nombre} ${item.apellido}`}
                  description={item.profile}
                  iconName={'user'}
                  img={'http://192.168.1.55:3000/uploads/' + item.foto}
                  estado={item.estado}
            />)
    }
    _renderLoader = () => {
        const loader = this.props.cargando;
        const error = this.props.error;


        if (loader) {
            return (
                <View style={{paddingVertical: 20}}>

                    <View style={{paddingVertical: 10, backgroundColor: 'white', borderRadius: 20, marginTop: 100}}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                            Cargando...
                        </Text>
                    </View>
                </View>
            );
        }
        if (error) {
            return (
                <View style={{paddingVertical: 10, backgroundColor: 'white', borderRadius: 20, marginTop: 100}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                        <Icon name={'exclamation-circle'} color={'red'} size={15}/>
                        &nbsp; Error {this.props.error}
                    </Text>
                </View>
            );
        }
    };
    _listEmptyComponent = () => {
        return (
            <View>
                <View style={{paddingVertical: 10, backgroundColor: 'white', borderRadius: 20, marginTop: 100}}>
                    <Text style={{textAlign: 'center'}}>
                        <Icon name={'exclamation-circle'} size={20}/>
                        &nbsp; No hay registros
                    </Text>
                </View>
            </View>
        );
    };

    render() {
        const {modalVisible, modalVisible2} = this.state
        return (
            <View>
                <TitlesTop
                    title={`Usuarios`}
                    widthSize='80%'
                    bgColor="#00AA37"
                    txtColor='#fff'
                />
                <ImageBackground source={require('../../../resources/animations/images/img_0.png')}
                                 style={{width: '100%', height: '100%'}}>


                    <View style={Stylus.container}>

                        {this._Lista()}

                    </View>
                    <ModalInfo
                        Title={'Información'}
                        modalvisible={modalVisible}
                        IconName={'users'}
                        ErrorModal={'#2196F3'}
                        Form={this.InfoUsuario()}
                        onPress={() => {
                            this.setModalVisible(!modalVisible)
                        }}
                    />
                    <ModalAlert
                        modalvisible={modalVisible2}
                        title={this.state.message}
                        IconName={this.state.icon}
                        ErrorModal={this.state.color}
                        onPress={() => {

                            this.setModalVisible2(!modalVisible2)
                            this.setModalVisible(false)
                        }}
                    />

                </ImageBackground>
            </View>
        )
    }

}

const Stylus = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        left: 10,
        marginTop: 50
    },
    tittleSelect2: {
        color: "#00AA37",
        fontWeight: 'bold',
        fontSize: 20
    },
    rowStyle: {
        height: 'auto',
        borderWidth: 1,
        borderColor: '#00AA37',
        borderRadius: 15,
        marginTop: 10
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: "absolute",
        right: 10,
        margin: 10,
        marginTop: 30
    }
})

const mapStateToProps = (reducers) => {
    return reducers.usuarios
};


export default connect(mapStateToProps, Actions)(AdminUsuarios);
