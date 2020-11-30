import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
} from "react-native";
import {Button, Input} from "../../../Components/common";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import CardInfo from "../../../Components/cards/CardInfo";
import Icon from "react-native-vector-icons/FontAwesome5";
import {ModalForm} from "../../../Components/Modal/modalForm";
import {ModalAlert} from "../../../Components/Modal/modal";
import * as yup from 'yup'
import {Formik} from "formik";
import {API} from "../../../API/comunicacionApi";
import {connect} from "react-redux";
import * as Actions from "../../../redux/actions/Sedes/sedesActions";
import {SwipeListView} from "react-native-swipe-list-view";
import {ModalWarning} from "../../../Components/Modal/modalWarning";

const ValoresIniciales = {
    nombreSede: '',
    direccion: '',
}

const Validaciones = yup.object().shape({
    nombreSede: yup.string().required('El nombre la sede es obligatoria!'),
    direccion: yup.string().required('La dirección es obligatoria!'),
})

class AdminSedes extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            modalVisible2: false,
            modalVisible3: false,
            modalVisible4: false,
            isFetching: false,
            message: '',
            color: '',
            icon: '',
            Objeto: {}
        }
    }

    componentDidMount() {
        if (!this.props.sedes.length) {
            this.props.Listar_Sedes()
        }

    }

    onRefresh() {
        this.setState({isFetching: true}, function () {
            this.props.Listar_Sedes();
        });
    }

//Modales
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }
    setModalVisible2 = (visible) => {
        this.setState({modalVisible2: visible});
    }
    setModalVisible3 = (visible) => {
        this.setState({modalVisible3: visible});
    }
    setModalVisible4 = (visible) => {
        this.setState({modalVisible4: visible});
    }


    //Peticiones
    registrarSede = (values) => {

        API.POST(`/sede/crear`, values)
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
    modificarSede = (values) => {
        API.PUT(`/sede/modificar/${values.id}`, values)
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
    eliminarSede = (Objeto) => {

        API.DEL(`/sede/eliminar/${Objeto._id}`)
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
                    message: e.response.data,
                    color: 'red',
                    icon: 'times'
                })
            })
    }


    //Formularios
    formulario = () => {

        return (
            <Formik initialValues={ValoresIniciales}
                    validationSchema={Validaciones}
                    onSubmit={values => this.registrarSede(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <View>
                        <Input
                            label='Nombre de la sede'
                            placeholder='Ingrese en nombre'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('nombreSede')}
                            onChangeText={handleChange('nombreSede')}
                            values={values.nombreSede}
                        />
                        {touched.nombreSede && errors.nombreSede &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.nombreSede}
                        </Text>
                        }

                        <Input
                            label='Dirección de la sede'
                            placeholder='Ingrese la dirección'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('direccion')}
                            onChangeText={handleChange('direccion')}
                            values={values.direccion}
                        />
                        {touched.direccion && errors.direccion &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.direccion}
                        </Text>
                        }
                        <View style={{paddingHorizontal: 60, left: 15, marginTop: 5}}>
                            <Button
                                title={'Guardar'}
                                bgColor='#00AA37'
                                fontSize={15}
                                colorText='#FFF'
                                fontWeight='bold'
                                widthSize={100}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                )}

            </Formik>
        )

    }
    formularioEdicion = () => {

        const Sede = this.state.Objeto
        console.log(Sede)
        return (
            <View>
                <Formik initialValues={{
                    id: Sede._id,
                    nombreSede: Sede.nombreSede,
                    direccion: Sede.direccion,

                }}
                        validationSchema={Validaciones}
                        onSubmit={values => this.modificarSede(values)}>
                    {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                        <View>
                            <Input
                                label='Nombre de la sede'
                                placeholder='Ingrese en nombre'
                                labelColor='#00AA37'
                                labelSize={20}
                                fontInputSize={17}
                                borderBottomColor='#00AA37'
                                onBlur={handleBlur('nombreSede')}
                                onChangeText={handleChange('nombreSede')}
                                values={values.nombreSede}
                                value={values.nombreSede}
                            />
                            {touched.nombreSede && errors.nombreSede &&
                            <Text style={{fontSize: 15, color: 'red'}}>
                                <Icon name={'exclamation-circle'} size={15}/> {errors.nombreSede}
                            </Text>
                            }

                            <Input
                                label='Dirección de la sede'
                                placeholder='Ingrese la dirección'
                                labelColor='#00AA37'
                                labelSize={20}
                                fontInputSize={17}
                                borderBottomColor='#00AA37'
                                onBlur={handleBlur('direccion')}
                                onChangeText={handleChange('direccion')}
                                values={values.direccion}
                                value={values.direccion}
                            />
                            {touched.direccion && errors.direccion &&
                            <Text style={{fontSize: 15, color: 'red'}}>
                                <Icon name={'exclamation-circle'} size={15}/> {errors.direccion}
                            </Text>
                            }
                            <View style={{paddingHorizontal: 60, left: 15, marginTop: 5}}>
                                <Button
                                    title={'Guardar'}
                                    bgColor='#00AA37'
                                    fontSize={15}
                                    colorText='#FFF'
                                    fontWeight='bold'
                                    widthSize={100}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        )
    }

    //Listado
    _Lista = () => {
        const {sedes, cargando} = this.props
        console.log(cargando)

        return (
            <View style={{width: '100%', height: '88%', bottom: 35}}>
                <SwipeListView
                    data={sedes}
                    renderItem={this._renderItem}
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
                    title={<Icon name='edit' color={'#FF8C01'} size={20}/>}
                    bgColor='#FFF'
                    fontSize={20}
                    BorderRadius={200}
                    colorText='#00AA37'
                    fontWeight='bold'
                    widthSize={40}
                    borderColor={'#FF8C01'}
                    borderWidth={1}
                    onPress={() => {
                        this.setState({
                            Objeto: data.item
                        })
                        this.setModalVisible3(true)
                    }}
                />
                <Text>&nbsp;</Text>
                <Button
                    title={<Icon name='trash' color={'#FF8C01'} size={20}/>}
                    bgColor='#FFF'
                    fontSize={20}
                    BorderRadius={200}
                    colorText='#00AA37'
                    fontWeight='bold'
                    widthSize={40}
                    borderColor={'#FF8C01'}
                    borderWidth={1}
                    onPress={() => {
                        this.setState({
                            Objeto: data.item
                        })
                        this.setModalVisible4(true)
                    }}
                />
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
    _renderItem = ({item, index}) => {
        return (

            <CardInfo
                key={index}
                bgColor='#fff'
                size={60}
                title={item.nombreSede}
                info={item.direccion}
                containerBorder='#00AA37'
                colorTitle='#00AA37'
                iconName={'building'}
            />

        )
    }

    render() {
        const {modalVisible, modalVisible2, modalVisible3, modalVisible4, Objeto} = this.state
        return (
            <View>
                <TitlesTop
                    title={'Sedes'}
                    widthSize='80%'
                    bgColor="#00AA37"
                    txtColor='#fff'
                />

                <ImageBackground source={require('../../../resources/animations/images/img_0.png')}
                                 style={{width: '100%', height: '100%'}}>

                    <View style={Stylus.container}>
                        {this._Lista()}

                        {/*Modal*/}
                        <ModalForm
                            Title={'Nueva sede'}
                            modalvisible={modalVisible}
                            IconName={'building'}
                            ErrorModal={'green'}
                            Form={this.formulario()}
                            onPress={() => {
                                this.setModalVisible(!modalVisible)
                            }}
                        />
                        <ModalForm
                            Title={'Modificar sede'}
                            modalvisible={modalVisible3}
                            IconName={'building'}
                            ErrorModal={'green'}
                            Form={this.formularioEdicion()}
                            onPress={() => {
                                this.setModalVisible3(!modalVisible3)
                            }}
                        />
                        {/*Modal Alertas*/}
                        <ModalAlert
                            modalvisible={modalVisible2}
                            title={this.state.message}
                            IconName={this.state.icon}
                            ErrorModal={this.state.color}
                            onPress={() => {

                                this.setModalVisible2(!modalVisible2)
                                this.setModalVisible3(false)
                                this.setModalVisible4(false)
                                this.setModalVisible(false)

                            }}
                        />

                        <ModalWarning
                            modalvisible={modalVisible4}
                            title={'Desea eliminar este elemento?'}
                            IconName={'info'}
                            ErrorModal={'#FF8C01'}
                            onPress={() => {
                                this.setModalVisible4(!modalVisible4)
                            }}
                            handleSubmit={() =>
                                this.eliminarSede(Objeto)
                            }
                        />
                    </View>
                </ImageBackground>
                <Button
                    title={<Icon name='plus' size={25}/>}
                    bgColor='#FFF'
                    fontSize={20}
                    BorderRadius={200}
                    colorText='#00AA37'
                    fontWeight='bold'
                    widthSize={65}
                    heightSize={65}
                    position={'absolute'}
                    marginText={10}
                    bottom={150}
                    right={10}
                    onPress={() => this.setModalVisible(true)}
                />
            </View>
        )
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
    buttonsContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: "absolute",
        right: 1,
        margin: 10,
        marginTop: 30
    }
})

const mapStateToProps = (reducers) => {
    return reducers.sedes
};


export default connect(mapStateToProps, Actions)(AdminSedes);
