import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Picker,
} from "react-native";
import {connect} from "react-redux";
import * as Actions from "../../../redux/actions/Centros/centrosActions";
import CardInfo from "../../../Components/cards/CardInfo";
import Icon from "react-native-vector-icons/FontAwesome5";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import {Button, Input} from "../../../Components/common";
import {ModalForm} from "../../../Components/Modal/modalForm";
import {ModalAlert} from "../../../Components/Modal/modal";
import {Formik} from "formik";
import * as yup from 'yup'
import {Row} from "react-native-easy-grid";
import {API} from "../../../API/comunicacionApi";
import {SwipeListView} from 'react-native-swipe-list-view';

const ValoresIniciales = {

    nombreCentro: '',
    direccion: '',
    sede: ''

}

const Validaciones = yup.object().shape({

    nombreCentro: yup.string().required('El nombre es obligatorio.'),
    direccion: yup.string().required('La dirección es obligatoria.'),
    sede: yup.string().required('Seleccione la sede.'),

})

class AdminCentros extends Component {


    constructor() {
        super();
        this.state = {
            modalVisible: false,
            modalVisible2: false,
            modalVisible3: false,
            isFetching: false,
            message: '',
            color: '',
            icon: '',
            sedes: [],
            Objeto: {}

        }
    }

    async componentDidMount() {
        if (!this.props.centros.length) {
            this.props.listar_Centros()
        }

        try {
            const sede = await API.GET('/sede/listar')
            this.setState({
                sedes: sede.data.Sede
            })
        } catch (e) {
            console.log(e)
        }
    }

    onRefresh() {
        this.setState({isFetching: true}, function () {
            this.props.listar_Centros();

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

    //Formularios
    formulario = () => {
        const {sedes} = this.state

        return (
            <Formik initialValues={ValoresIniciales}
                    validationSchema={Validaciones}
                    onSubmit={values => this.registrarCentro(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <View>
                        <Input
                            label='Nombre de Centro'
                            placeholder='Ingrese en nombre'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('nombreCentro')}
                            onChangeText={handleChange('nombreCentro')}
                            values={values.nombreCentro}
                        />

                        {touched.nombreCentro && errors.nombreCentro &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.nombreCentro}
                        </Text>
                        }
                        <Input
                            label='Dirección'
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

                        <View style={{marginVertical: 12,}}>

                            <Text style={Stylus.tittleSelect2}>
                                Sede
                            </Text>
                            <Row style={Stylus.rowStyle}>

                                <Picker selectedValue={values.sede}
                                        onValueChange={handleChange('sede')}
                                        onBlur={() => setFieldTouched('sede')}
                                        style={{width: '100%'}} mode={'dropdown'}>


                                    <Picker.Item color={'#808080'} label={'Seleccionar:'}
                                                 value={0}/>
                                    {sedes.map(item => (
                                        <Picker.Item color={'#808080'} label={item.nombreSede}
                                                     value={item._id}/>
                                    ))}

                                </Picker>
                            </Row>
                        </View>
                        {touched.sede && errors.sede &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.sede}
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
        const {sedes} = this.state
        const Centro = this.state.Objeto
        return (
            <Formik initialValues={{
                id: Centro._id,
                nombreCentro: Centro.nombreCentro,
                direccion: Centro.direccion,
                sede: Centro.sede
            }}
                    validationSchema={Validaciones}
                    onSubmit={values => this.modificarCentro(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <View>
                        <Input
                            label='Nombre de Centro'
                            placeholder='Ingrese en nombre'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('nombreCentro')}
                            onChangeText={handleChange('nombreCentro')}
                            values={values.nombreCentro}
                            value={values.nombreCentro}
                        />

                        {touched.nombreCentro && errors.nombreCentro &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.nombreCentro}
                        </Text>
                        }
                        <Input
                            label='Dirección'
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

                        <View style={{marginVertical: 12,}}>

                            <Text style={Stylus.tittleSelect2}>
                                Sede
                            </Text>
                            <Row style={Stylus.rowStyle}>

                                <Picker selectedValue={values.sede}
                                        onValueChange={handleChange('sede')}
                                        onBlur={() => setFieldTouched('sede')}
                                        style={{width: '100%'}} mode={'dropdown'}>


                                    <Picker.Item color={'#808080'} label={'Seleccionar:'}
                                                 value={0}/>
                                    {sedes.map(item => (
                                        <Picker.Item color={'#808080'} label={item.nombreSede}
                                                     value={item._id}/>
                                    ))}
                                </Picker>
                            </Row>
                        </View>
                        {touched.sede && errors.sede &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.sede}
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

//Peticiones
    registrarCentro = (values) => {

        API.POST(`/centro/crear`, values)
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
    modificarCentro = (values) => {

        API.PUT(`/centro/modificar/${values.id}`, values)
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

//Listado
    _Lista = () => {
        const {centros, cargando} = this.props
        return (
            <View style={{width: '100%', height: '88%', bottom: 35}}>

                <SwipeListView
                    data={centros}
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
    _renderItem = ({item, index}) => {


        return (
            <CardInfo
                key={index}
                bgColor='#fff'
                size={60}
                title={item.nombreCentro}
                info={item.sede[0].nombreSede}
                containerBorder='#00AA37'
                colorTitle='#00AA37'
                iconName={'university'}
            />

        )
    }
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
        const {modalVisible, modalVisible2, modalVisible3} = this.state
        return (
            <View>
                <TitlesTop
                    title={'Centro'}
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
                            Title={'Nuevo centro'}
                            modalvisible={modalVisible}
                            IconName={'building'}
                            ErrorModal={'green'}
                            Form={this.formulario()}
                            onPress={() => {
                                this.setModalVisible(!modalVisible)
                            }}
                        />
                        <ModalForm
                            Title={'Modificar centro'}
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
                                this.setModalVisible(false)
                                this.setModalVisible3(false)
                            }}
                        />
                    </View>
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
                </ImageBackground>
            </View>)
    }
}


const mapStateToProps = (reducers) => {
    return reducers.centros

};

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
        right: 1,
        margin: 10,
        marginTop: 30
    }
})

export default connect(mapStateToProps, Actions)(AdminCentros)
