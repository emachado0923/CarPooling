import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, FlatList, Text} from 'react-native';
import Card from '../../../Components/cards/card';
import {TitlesTop} from '../../../Components/titles/titlesTop';
import {API} from "../../../API/comunicacionApi";
import {ModalGrupo} from "../../../Components/Modal/modalGrupo";
import {SwipeListView} from "react-native-swipe-list-view";
import io from "socket.io-client";


export default class GruposTodos extends Component {
    constructor() {
        super();
        this.state = {
            array: [],
            modalVisible: false,
            cargando: false,
            grupo: [],
            foto: '',
            tipoGrupo: '',
            personas: ''
        }
    }


    componentDidMount() {

        API.GET(`/grupo/listar/todos`)
            .then(res => {
                this.setState({
                    array: res.data
                })
            })
            .catch(e => {
                console.log(e)
            })

        this.socket = io("http://192.168.1.55:3000");
        this.socket.on("notificaciones", data => {

            alert(data.mensaje)
        });

    }

    enviarSolicitud(data) {

        this.socket.emit('notificaciones', {
            mensaje: `${data.usuario[0].nombre} quiere unirse al grupo`
        });

    }


    onRefresh() {
        this.setState({isFetching: true}, function () {


            API.GET(`/grupo/listar/todos`)
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

    grupos = ({item, index}) => {

        return (
            <Card key={index} color="#f09209"
                  name={item.nombreGrupo} category={item.tipoGrupo[0].nombreGrupo}
                  cantPersons={item.cupos} description={item.descripcion}
                  cupos={item.personasGrupo.length}
                  img={'http://192.168.1.55:3000/uploads/' + item.usuario[0].foto}
                  estado={'Completo'}
                  iconName={'user'}
                  onPress={() => {
                      this.setModalVisible(true)
                      this.setState({
                          grupo: item,
                          foto: item.usuario[0].foto,
                          tipoGrupo: item.tipoGrupo[0].nombreGrupo,
                          personas: item.personasGrupo.length
                      })
                  }}
            />

        )
    }

    solicitud = () => {
        const {grupo, modalVisible, foto, tipoGrupo, personas} = this.state


        return (
            <ModalGrupo
                title={grupo.nombreGrupo}
                modalvisible={modalVisible}
                cantidad={personas}
                cupos={grupo.cupos}
                tipoGrupo={tipoGrupo}
                descripcion={grupo.descripcion}
                uri={'http://192.168.1.55:3000/uploads/' + foto}
                onPress={() => this.setModalVisible(!modalVisible)}
                onPress2={() => this.enviarSolicitud(grupo)}
            />
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

    render() {
        const {array, cargando} = this.state

        return (
            <View style={styles.content}>
                <TitlesTop txtColor='#fff' title='GRUPOS SUGERIDOS' widthSize='70%' bgColor='#00AA37'/>
                <View style={{marginTop: 12}}>

                    <FlatList
                        data={array}
                        renderItem={this.grupos}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={this._listEmptyComponent}
                        refreshing={cargando}
                        onRefresh={() => this.onRefresh()}
                    />

                    {this.solicitud()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contentGroups: {
        marginTop: 12,
    }
});
