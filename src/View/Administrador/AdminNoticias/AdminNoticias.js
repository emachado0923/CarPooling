import React, {Component} from "react";
import {View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator} from "react-native";
import {TitlesTop} from "../../../Components/titles/titlesTop";
import {Button, Input} from "../../../Components/common";
import Icon from "react-native-vector-icons/FontAwesome5";
import {ModalForm} from "../../../Components/Modal/modalForm";
import {Formik} from 'formik';
import * as yup from "yup";
import {API} from "../../../API/comunicacionApi";
import {ModalAlert} from "../../../Components/Modal/modal";
import {connect} from "react-redux";
import * as Actions from "../../../redux/actions/Noticias/noticiasActions";
import CardInfo from "../../../Components/cards/CardInfo";
import {SwipeListView} from 'react-native-swipe-list-view';
import {ModalWarning} from "../../../Components/Modal/modalWarning";

const ValoresIniciales = {

    nombreNoticia: '',
    descripcion: '',
    categoria: '',
}


const Validaciones = yup.object().shape({

    nombreNoticia: yup.string().required('El nombre de la noticia es obligatorio'),
    descripcion: yup.string().required('La descripcion es obligatoria'),
    categoria: yup.string().required('Seleccione la categoria'),


})

class AdminNoticias extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            modalVisible2: false,
            modalVisible3: false,
            modalVisible4: false,
            isFetching: false,
            Objeto: {},
            message: '',
            color: '',
            icon: ''
        }
    }

    componentDidMount() {
        this.props.listarNoticias()
        console.log(this.props.user)
    }

    onRefresh() {
        this.setState({isFetching: true}, function () {
            this.props.listarNoticias()
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

    //Formularios
    Formulario = () => {
        return (
            <Formik initialValues={ValoresIniciales} validationSchema={Validaciones}
                    onSubmit={values => this.RegistrarNoticia(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <View>
                        <Input
                            label='Nombre de la noticia'
                            placeholder='Nombre de la noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('nombreNoticia')}
                            onChangeText={handleChange('nombreNoticia')}
                            values={values.nombreNoticia}
                        />
                        {touched.nombreNoticia && errors.nombreNoticia &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.nombreNoticia}
                        </Text>
                        }
                        <Input
                            label='Descripción de la noticia'
                            placeholder='Describe la noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('descripcion')}
                            onChangeText={handleChange('descripcion')}
                            values={values.descripcion}
                        />
                        {touched.descripcion && errors.descripcion &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.descripcion}
                        </Text>
                        }
                        <Input
                            label='Tipo de noticia'
                            placeholder='Tipo de noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('categoria')}
                            onChangeText={handleChange('categoria')}
                            values={values.categoria}
                        />
                        {touched.categoria && errors.categoria &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.categoria}
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
    FormularioEdicion = () => {

        const Noticia = this.state.Objeto
        return (
            <Formik initialValues={{

                _id: Noticia._id,
                nombreNoticia: Noticia.nombreNoticia,
                descripcion: Noticia.descripcion,
                categoria: Noticia.categoria,

            }} validationSchema={Validaciones}
                    onSubmit={values => this.ModificarNoticia(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <View>
                        <Input
                            label='Nombre de la noticia'
                            placeholder='Nombre de la noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('nombreNoticia')}
                            onChangeText={handleChange('nombreNoticia')}
                            values={values.nombreNoticia}
                            value={values.nombreNoticia}
                        />
                        {touched.nombreNoticia && errors.nombreNoticia &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.nombreNoticia}
                        </Text>
                        }
                        <Input
                            label='Descripción de la noticia'
                            placeholder='Describe la noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('descripcion')}
                            onChangeText={handleChange('descripcion')}
                            values={values.descripcion}
                            value={values.descripcion}
                        />
                        {touched.descripcion && errors.descripcion &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.descripcion}
                        </Text>
                        }
                        <Input
                            label='Tipo de noticia'
                            placeholder='Tipo de noticia'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={17}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('categoria')}
                            onChangeText={handleChange('categoria')}
                            values={values.categoria}
                            value={values.categoria}
                        />
                        {touched.categoria && errors.categoria &&
                        <Text style={{fontSize: 15, color: 'red'}}>
                            <Icon name={'exclamation-circle'} size={15}/> {errors.categoria}
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
    RegistrarNoticia = (values) => {
        const userID = this.props.user._id

        API.POST(`/noticia/crear/${userID}`, values)
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
    ModificarNoticia = (values) => {

        API.PUT(`/noticia/modificar/${values._id}`, values)
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
    EliminarNoticia = (Objeto) => {

        API.DEL(`/noticia/eliminar/${Objeto._id}`)
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
        const {noticias, cargando} = this.props

        return (
            <View style={{width: '100%', height: '88%', bottom: 35}}>
                <SwipeListView
                    data={noticias}
                    renderItem={this._renderItem}
                    renderHiddenItem={(data, rowMap) => this.botones(data, rowMap)}
                    keyExtractor={item => item._id}
                    ListFooterComponent={this._renderLoader()}
                    ListEmptyComponent={this._listEmptyComponent}
                    onRefresh={() => this.onRefresh()}
                    refreshing={cargando}
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
    _renderItem = ({item, index}) => {
        return (
            <CardInfo
                key={index}
                bgColor='#fff'
                size={60}
                title={item.nombreNoticia}
                info={item.descripcion}
                containerBorder='#00AA37'
                colorTitle='#00AA37'
                iconName={'info'}

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
        const {modalVisible, modalVisible2, modalVisible3, modalVisible4, Objeto} = this.state
        return (
            <View>
                <TitlesTop
                    title={`Noticias`}
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
                            modalvisible={modalVisible}
                            Title={'Nueva noticia'}
                            IconName={'newspaper'}
                            ErrorModal={'green'}
                            Form={this.Formulario()}
                            onPress={() => {
                                this.setModalVisible(!modalVisible)

                            }}
                        />
                        <ModalForm
                            Title={'Modificar noticia'}
                            modalvisible={modalVisible3}
                            IconName={'building'}
                            ErrorModal={'green'}
                            Form={this.FormularioEdicion()}
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
                            handleSubmit={() => this.EliminarNoticia(Objeto)}
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


const mapStateToProps = (state) => {
    return {
        noticias: state.noticias.noticias,
        cargando: state.noticias.cargando,
        user: state.services.user
    }
}

export default connect(mapStateToProps, Actions)(AdminNoticias);

