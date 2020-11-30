import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text, ImageBackground} from 'react-native';
import Card from '../../../Components/cards/card';
import {TitlesTop} from '../../../Components/titles/titlesTop';
import {API, URL_API} from "../../../API/comunicacionApi";
import {connect} from "react-redux";
import {Button} from "../../../Components/common";
import Icon from "react-native-vector-icons/FontAwesome5";
import {SwipeListView} from "react-native-swipe-list-view";
import ModalChat from '../../../Components/Modal/modalChat'

class MisGrupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            modalVisible: false,
            ChatModal: false,
            Objeto: []
        }
    }

    usuario = {
        nombre: 'user ante',
        contraseña: 'pass',
    }

    componentDidMount() {

        const id = this.props.user._id

        API.GET(`/grupo/listar/${id}`)
            .then(res => {
                this.setState({
                    array: res.data
                })
            })
            .catch(e => {
                console.log(e.data)
            })
    }

    onRefresh() {
        this.setState({isFetching: true}, function () {

            const id = this.props.user._id

            API.GET(`/grupo/listar/${id}`)
                .then(res => {
                    this.setState({
                        array: res.data
                    })
                })
                .catch(e => {
                    console.log(e)
                })

        });
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }
    setChatModal = (visible) => {
        this.setState({ChatModal: visible});
    }

    misGrupos = ({item, index}) => {

        return (
            <Card key={index} color="#59b548"
                  name={item.nombreGrupo} category={item.tipoGrupo[0].nombreGrupo}
                  cantPersons={item.cupos} description={item.descripcion}
                  cupos={item.personasGrupo.length}
                  img={'http://192.168.1.55:3000/uploads/' + item.usuario[0].foto}
            />
        )
    }

    _Lista = () => {
        const {array} = this.state
        const cargando = false
        return (
            <View style={{width: '100%', height: '88%', bottom: 35}}>

                <SwipeListView
                    data={array}
                    renderItem={this.misGrupos}
                    renderHiddenItem={(data, rowMap) => this.botones(data, rowMap)}
                    keyExtractor={item => item._id}
                    ListFooterComponent={this._renderLoader()}
                    ListEmptyComponent={this._listEmptyComponent}
                    refreshing={cargando}
                    onRefresh={() => this.onRefresh()}
                    leftOpenValue={75}
                    rightOpenValue={-100}
                    disableRightSwipe
                />
            </View>
        )
    }

    botones = (data) => {

        return (
            <View style={Stylus.buttonsContainer}>
                <Button
                    title={<Icon name='comments' color={'#FF8C01'} size={25}/>}
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
                <Text>&nbsp;</Text>
                <Button
                    title={<Icon name='info-circle' color={'#FF8C01'} size={25}/>}
                    bgColor='#FFF'
                    fontSize={20}
                    BorderRadius={200}
                    colorText='#00AA37'
                    fontWeight='bold'
                    widthSize={50}
                    borderColor={'#FF8C01'}
                    borderWidth={1}
                    onPress={() => {
                        this.setChatModal(true)
                    }}
                />

            </View>
        )
    }
    _listEmptyComponent = () => {
        return (
            <View>
                <View style={{justifyContent: 'center', flex: 1, margin: 10,}}>
                    <Text style={{textAlign: 'center'}}>
                        No tienes grupos registrados
                    </Text>
                </View>
            </View>
        )
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
        const {Objeto, modalVisible} = this.state
        return (
            <View>
                <TitlesTop title='MIS GRUPOS' txtColor='#fff' borderRadius={12} bgColor='#FF8C01' widthSize='50%'/>
                <View style={Stylus.container}>
                    {this._Lista()}
                    <ModalChat
                        IsVisible={modalVisible} Data={Objeto}
                        onPress={() => this.setModalVisible(!modalVisible)}/>
                </View>
            </View>
        );
    }
}


const Stylus = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%',
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
        right: 5,
        margin: 10,
        marginTop: 30
    }
})

const mapStateToProps = state => {
    return {
        user: state.services.user
    };
};

export default connect(mapStateToProps)(MisGrupos);
