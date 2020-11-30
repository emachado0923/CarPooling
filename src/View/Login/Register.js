import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Picker,
} from 'react-native';
import {Col, Row, Grid} from "react-native-easy-grid";
import {TitlesTop} from '../../Components/titles/titlesTop';
import {Input, Button} from '../../Components/common';
import {ButtonSelect} from '../../Components/common/ButtonSelect';
import {ModalAlert} from '../../Components/Modal/modal';
import {API, URL_API} from '../../API/comunicacionApi';
import Icon from "react-native-vector-icons/FontAwesome5";
import {Registro} from '../../redux/actions/configRegister';
import {connect} from 'react-redux';

// Formik and yup
import {Formik} from 'formik';
import * as yup from 'yup';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'


const options = {
    title: 'Seleccionar foto de perfil',
    takePhotoButtonTitle: '📷 Tomar foto',
    chooseFromLibraryButtonTitle: '🖼️ Seleccionar de la galería',
    quality: 1
};

const Validaciones = yup.object().shape({

    nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    apellido: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    tipo_doc: yup.string().required('El tipo de documento es obligatorio'),
    numero_doc: yup.string().required('El número de documento es requerido'),
    celular: yup.string().required('El número de celular es obligatorio'),
    correo: yup.string().required('El correo es obligatorio').email('Direccion de correo invalida').matches(/(misena.edu.co$|sena.edu.co$)/, 'Solo se permiten correos sena'),
    centro: yup.string().required('Seleccione el centro de formación'),
    ciudad: yup.string().required('Seleccione la ciudad'),
    jornadas: yup.string().required('Seleccione la jornada'),
    cargos: yup.string().required('Seleccione un cargo'),
    dirección: yup.string().required('La dirección es obligatoria').min(7, 'La direccion debe tener más de 7 caracteres'),
    contraseña: yup.string().required('La Contraseña es obligatoria').min(7, 'La contraseña debe tener más de 7 caracteres'),
    profile: yup.string().required('Selecciona un rol'),

    marca: yup.string().when('profile', {
        is: 'CONDUCTOR', then: yup.string().required('La marca es obligatoria'),
    }),
    color: yup.string().when('profile', {
        is: 'CONDUCTOR', then: yup.string().required('El color es obligatorio'),
    }),

    placa: yup.string().when('profile', {
        is: 'CONDUCTOR', then: yup.string().required('La placa es obligatoria'),
    }),

    tipoVehiculo: yup.string().when('profile', {
        is: 'CONDUCTOR', then: yup.string().required('Seleccione el tipo de vehiculo'),
    }),

    descripcion: yup.string().when('profile', {
        is: 'CONDUCTOR', then: yup.string().required('La descripción es obligatoria'),
    }),
    // foto: yup.string().required('Debes poner tu foto'),


})

const ValoresIniciales = {
    nombre: '',
    apellido: '',
    tipo_doc: '',
    numero_doc: '',
    celular: '',
    correo: '',
    centro: '',
    dirección: '',
    contraseña: '',
    profile: '',
    ciudad: '',
    jornadas: '',
    cargos: '',
    vehiculo: {
        marca: '',
        color: '',
        placa: '',
        tipoVehiculo: '',
        descripcion: ''
    }
}

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vehiculo: {},
            foto: null,
            data: {},
            ciudades: [],
            jornadas: [],
            cargos: [],
            centros: [],
            modalVisible: false,
            message: '',
            color: '',
            icon: ''
        }
    }


    async registrarUsuario(values) {

        let Usuario = []

        Usuario.push(values)


        RNFetchBlob.fetch('POST', URL_API + `/usuario`, {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
            },
            [
                {name: 'foto', filename: 'image.png', type: 'image/png', data: this.state.data},
                {name: 'usuarios', data: JSON.stringify(Usuario)},

            ])
            .then(res => {
                    let json = res.json()
                    let status = res.info().status;
                    if (status === 201) {
                        this.setState({
                            modalVisible: true,
                            message: json.message,
                            color: 'green',
                            icon: 'check'
                        })
                    } else {
                        this.setState({
                            modalVisible: true,
                            message: json.message,
                            color: 'red',
                            icon: 'times'
                        })
                    }
                }
            ).catch(e => {
            console.log(e)
        })


    }


    async componentDidMount() {
        this.requestCameraRollPermission()
        this._TraerDatos()
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

    _TraerDatos = async () => {

        try {

            const Ciudades = await API.GET(`/ciudad/listar`)
            const Centro = await API.GET(`/centro/listar`)
            const Jornadas = await API.GET(`/jornada/listar`)
            const Cargos = await API.GET(`/cargo/listar`)

            this.setState({
                ciudades: Ciudades.data.ciudad,
                centros: Centro.data.Centro,
                jornadas: Jornadas.data.Jornadas,
                cargos: Cargos.data.Cargo
            })


        } catch (e) {
            console.log(e)
        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {
        let {foto, modalVisible} = this.state;
        return (

            <Formik initialValues={ValoresIniciales} validationSchema={Validaciones}
                    onSubmit={values => this.registrarUsuario(values)}>
                {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                    <Grid>
                        <Row>
                            <Col>
                                <ScrollView>
                                    <TitlesTop
                                        title='REGISTRAR'
                                        widthSize='50%'
                                        bgColor="#FF8C01"
                                        txtColor='#fff'
                                    />
                                    <View style={styles.containerGen}>
                                        <View style={styles.contImg}>
                                            <Image
                                                source={require("../../resources/img/LogoSENA-naranja_vector.png")}
                                                style={styles.stylesImg}
                                            />
                                        </View>
                                        <View style={styles.contForm}>
                                            <TitlesTop
                                                title='Datos personales'
                                                widthSize='80%'
                                                bgColor="#FF8C01"
                                                txtColor='#fff'
                                            />
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Nombre'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu nombre'
                                                onBlur={handleBlur('nombre')}
                                                onChangeText={handleChange('nombre')}
                                                values={values.nombre}
                                            />
                                            {/* Errores*/}
                                            {touched.nombre && errors.nombre &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.nombre}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Apellido'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu apellido'
                                                onChangeText={handleChange('apellido')}
                                                onBlur={handleBlur('apellido')}
                                                values={values.apellido}
                                            />
                                            {/* Errores*/}
                                            {touched.apellido && errors.apellido &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.apellido}
                                            </Text>
                                            }


                                            <View style={{marginVertical: 12,}}>

                                                <Text style={styles.tittleSelect2}>Tipo de documento</Text>
                                                <Row style={styles.rowStyle2}>

                                                    <Picker onBlur={() => setFieldTouched('tipo_doc')}
                                                            onValueChange={handleChange('tipo_doc')}
                                                            selectedValue={values.tipo_doc}
                                                            style={{width: '100%'}} mode={'dropdown'}>

                                                        <Picker.Item color={'#808080'} label={'Seleccione:'}
                                                                     value={0}/>
                                                        <Picker.Item color={'#808080'} label={'Cedula'}
                                                                     value={'Cedula'}/>
                                                        <Picker.Item color={'#808080'} label={'Cedula extranjera'}
                                                                     value={'Cedula extranjera'}/>


                                                    </Picker>
                                                </Row>
                                            </View>
                                            {/* Errores*/}
                                            {touched.tipo_doc && errors.tipo_doc &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.tipo_doc}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Número de documento'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu número de documento'
                                                onChangeText={handleChange('numero_doc')}
                                                onBlur={handleBlur('numero_doc')}
                                                values={values.numero_doc}
                                                keyboardType={'number-pad'}
                                            />
                                            {/* Errores*/}
                                            {touched.numero_doc && errors.numero_doc &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.numero_doc}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Número de celular'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu número de celular'
                                                onChangeText={handleChange('celular')}
                                                onBlur={handleBlur('celular')}
                                                values={values.celular}
                                                keyboardType={'number-pad'}
                                            />
                                            {/* Errores*/}
                                            {touched.celular && errors.celular &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.celular}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Correo institucional'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu correo sena'
                                                onBlur={() => setFieldTouched('correo')}
                                                onChangeText={handleChange('correo')}
                                                values={values.correo}
                                            />
                                            {/* Errores*/}
                                            {touched.correo && errors.correo &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.correo}
                                            </Text>
                                            }

                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Dirección'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu dirección'
                                                onBlur={handleBlur('dirección')}
                                                onChangeText={handleChange('dirección')}
                                                values={values.dirección}
                                            />
                                            {/* Errores*/}
                                            {touched.dirección && errors.dirección &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.dirección}
                                            </Text>
                                            }
                                            <Input
                                                labelColor='#FF8C01'
                                                labelSize={20}
                                                fontInputSize={17}
                                                label='Contraseña'
                                                borderBottomColor='#FF8C01'
                                                placeholder='Ingresa tu contraseña'
                                                onBlur={handleBlur('contraseña')}
                                                onChangeText={handleChange('contraseña')}
                                                values={values.contraseña}
                                                secureTextEntry={true}
                                            />
                                            {/* Errores*/}
                                            {touched.contraseña && errors.contraseña &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.contraseña}
                                            </Text>
                                            }
                                            <TitlesTop
                                                title='Datos centro'
                                                widthSize='80%'
                                                bgColor="#FF8C01"
                                                txtColor='#fff'
                                            />
                                            <View style={{marginVertical: 12,}}>

                                                <Text style={styles.tittleSelect2}>Centro de formación</Text>
                                                <Row style={styles.rowStyle2}>

                                                    <Picker onBlur={() => setFieldTouched('centro')}
                                                            onValueChange={handleChange('centro')}
                                                            selectedValue={values.centro}
                                                            mode={'dropdown'}
                                                            style={{width: '100%'}}>

                                                        <Picker.Item color={'#808080'} label={'Seleccione:'}
                                                                     value={0}/>
                                                        {this.state.centros.map((item, index) => (
                                                            <Picker.Item color={'#808080'} label={item.nombreCentro}
                                                                         value={item._id} key={index}/>
                                                        ))}
                                                    </Picker>
                                                </Row>
                                            </View>
                                            {/* Errores*/}
                                            {touched.centro && errors.centro &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.centro}
                                            </Text>
                                            }
                                            <View style={{marginVertical: 12,}}>

                                                <Text style={styles.tittleSelect2}>Jornada</Text>
                                                <Row style={styles.rowStyle2}>

                                                    <Picker onBlur={() => setFieldTouched('jornadas')}
                                                            onValueChange={handleChange('jornadas')}
                                                            selectedValue={values.jornadas}
                                                            mode={'dropdown'}

                                                            style={{width: '100%'}}>

                                                        <Picker.Item color={'#808080'} label={'Seleccione:'}
                                                                     value={0}/>
                                                        {this.state.jornadas.map((item, index) => (
                                                            <Picker.Item color={'#808080'} label={item.nombreJornada}
                                                                         value={item._id} key={index}/>
                                                        ))}
                                                    </Picker>
                                                </Row>
                                            </View>
                                            {/* Errores*/}
                                            {touched.jornadas && errors.jornadas &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.jornadas}
                                            </Text>
                                            }
                                            <View style={{marginVertical: 12,}}>

                                                <Text style={styles.tittleSelect2}>Cargo</Text>
                                                <Row style={styles.rowStyle2}>

                                                    <Picker onBlur={() => setFieldTouched('cargos')}
                                                            onValueChange={handleChange('cargos')}
                                                            selectedValue={values.cargos}
                                                            mode={'dropdown'}

                                                            style={{width: '100%'}}>

                                                        <Picker.Item color={'#808080'} label={'Seleccione:'}
                                                                     value={0}/>
                                                        {this.state.cargos.map((item, index) => (
                                                            <Picker.Item color={'#808080'} label={item.nombreCargo}
                                                                         value={item._id} key={index}/>
                                                        ))}
                                                    </Picker>
                                                </Row>
                                            </View>
                                            {/* Errores*/}
                                            {touched.cargos && errors.cargos &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.cargos}
                                            </Text>
                                            }

                                            <View style={{marginVertical: 12,}}>
                                                <Text style={styles.tittleSelect2}>Ciudad</Text>
                                                <Row style={styles.rowStyle2}>
                                                    <Picker selectedValue={values.ciudad}
                                                            onValueChange={handleChange('ciudad')}
                                                            onBlur={() => setFieldTouched('ciudad')}
                                                            style={{width: '100%'}} mode={'dropdown'}>

                                                        <Picker.Item color={'#808080'} label={'Seleccione:'}
                                                                     value={0}/>
                                                        {this.state.ciudades.map((item, index) => (
                                                            <Picker.Item color={'#808080'} label={item.nombreCiudad}
                                                                         value={item._id} key={index}/>
                                                        ))}
                                                    </Picker>
                                                </Row>
                                            </View>
                                            {/* Errores*/}
                                            {touched.ciudad && errors.ciudad &&
                                            <Text style={{fontSize: 15, color: 'red'}}>
                                                <Icon name={'exclamation-circle'} size={15}/> {errors.ciudad}
                                            </Text>
                                            }

                                        </View>

                                        <View style={styles.contSelectionRol}>
                                            <TitlesTop
                                                title='SELECCIÓN DE ROL'
                                                widthSize='60%'
                                                bgColor="#00AA37"
                                                txtColor='#fff'
                                            />
                                            <Text style={{padding: 20, fontSize: 20, textAlign: 'center'}}>
                                                ¿Serás un Conductor o un Pasajero?
                                            </Text>

                                            <View style={styles.btnsCont}>
                                                <ButtonSelect
                                                    title="Conductor"
                                                    sizeIcon={36}
                                                    colorIcon='#fff'
                                                    onPress={() => {
                                                        this.setState({profile: 'CONDUCTOR'})
                                                        values.profile = 'CONDUCTOR'
                                                    }}
                                                    colorText='#fff'
                                                    bgColor='#FF8C01'
                                                    borderRadius={24}
                                                />
                                                <ButtonSelect
                                                    title="Pasajero"
                                                    sizeIcon={36}
                                                    colorIcon='#fff'
                                                    onPress={() => {
                                                        this.setState({profile: 'PASAJERO'})
                                                        values.profile = 'PASAJERO'
                                                    }}
                                                    colorText='#fff'
                                                    bgColor='#00AA37'
                                                    borderRadius={24}
                                                />
                                            </View>
                                            <View style={{alignItems: 'center'}}>
                                                {touched.profile && errors.profile &&
                                                <Text style={{fontSize: 15, color: 'red'}}>
                                                    <Icon name={'exclamation-circle'} size={20}/> {errors.profile}
                                                </Text>
                                                }
                                            </View>
                                            {values.profile == 'CONDUCTOR' ?
                                                <View style={styles.formDataCar}>

                                                    <TitlesTop
                                                        title='LLENA LA INFORMACIÓN DE TU VEHÍCULO'
                                                        widthSize='100%'
                                                        txtColor='#FF8C01'
                                                        alingTxt='center'
                                                        fontSize={20}
                                                        fontInputSize={20}
                                                        paddingLeft={0}
                                                        borderRadius={0}
                                                    />
                                                    <View style={{marginVertical: 12,}}>

                                                        <Text style={[styles.tittleSelect, {color: '#00aa37'}]}>Tipo de
                                                            Vehiculo</Text>
                                                        <Row style={styles.rowStyle}>

                                                            <Picker selectedValue={values.tipoVehiculo}
                                                                    onValueChange={handleChange('tipoVehiculo')}
                                                                    onBlur={() => setFieldTouched('tipoVehiculo')}
                                                                    style={{width: '100%'}} mode={'dropdown'}>

                                                                <Picker.Item color={'#808080'} label={'Seleccionar:'}
                                                                             value={0}/>
                                                                <Picker.Item color={'#808080'} label={'Moto'}
                                                                             value={'Moto'}/>
                                                                <Picker.Item color={'#808080'} label={'Carro'}
                                                                             value={'Carro'}/>

                                                            </Picker>
                                                        </Row>
                                                    </View>
                                                    {touched.vehiculo && errors.tipoVehiculo &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'}
                                                              size={15}/> {errors.tipoVehiculo}
                                                    </Text>
                                                    }

                                                    <Input
                                                        label='Marca'
                                                        placeholder='Ingresa la marca de tu vehículo'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={17}
                                                        borderBottomColor='#00AA37'
                                                        onBlur={handleBlur('marca')}
                                                        onChangeText={handleChange('marca')}
                                                        values={values.vehiculo.marca}

                                                    />
                                                    {touched.vehiculo && errors.marca &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={15}/> {errors.marca}
                                                    </Text>
                                                    }
                                                    <Input
                                                        label='Color'
                                                        placeholder='Ingresa el color de tu vehículo'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={17}
                                                        borderBottomColor='#00AA37'
                                                        onBlur={handleBlur('color')}
                                                        onChangeText={handleChange('color')}
                                                        values={values.vehiculo.color}
                                                    />
                                                    {touched.vehiculo && errors.color &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={15}/> {errors.color}
                                                    </Text>
                                                    }
                                                    <Input
                                                        label='Número de placa'
                                                        placeholder='Ingresa tu número de placa'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={17}
                                                        borderBottomColor='#00AA37'
                                                        onBlur={handleBlur('placa')}
                                                        onChangeText={handleChange('placa')}
                                                        values={values.vehiculo.placa}
                                                    />
                                                    {touched.vehiculo && errors.placa &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'} size={15}/> {errors.placa}
                                                    </Text>
                                                    }
                                                    <Input
                                                        label='Descripción del vehiculo'
                                                        placeholder='Describe tu vehiculo'
                                                        labelColor='#00AA37'
                                                        labelSize={20}
                                                        fontInputSize={17}
                                                        borderBottomColor='#00AA37'
                                                        onBlur={handleBlur('descripcion')}
                                                        onChangeText={handleChange('descripcion')}
                                                        values={values.vehiculo.descripcion}
                                                    />
                                                    {touched.vehiculo && errors.descripcion &&
                                                    <Text style={{fontSize: 15, color: 'red'}}>
                                                        <Icon name={'exclamation-circle'}
                                                              size={15}/> {errors.descripcion}
                                                    </Text>
                                                    }


                                                </View>
                                                : values.profile == 'PASAJERO' ?
                                                    <View style={styles.formDataCar}>
                                                        <Text style={styles.textPasajero}>
                                                            SELECCIONASTE EL ROL DE PASAJERO, YA TE PUEDES REGISTRAR.
                                                        </Text>
                                                    </View>
                                                    : null
                                            }

                                        </View>

                                        <View style={styles.contFoto}>
                                            <TitlesTop
                                                title='SELECCIONA TU FOTO DE PERFIL'
                                                widthSize='90%'
                                                bgColor="#FF8C01"
                                                txtColor='#fff'
                                            />
                                            <View style={styles.img}>

                                                {
                                                    this.state.foto === null ?
                                                        <Icon name='user' color='#707070' size={60}/>
                                                        :
                                                        (
                                                            <Image source={{uri: foto}} style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                resizeMode: 'cover'
                                                            }}/>
                                                        )
                                                }
                                            </View>
                                            <View style={styles.contBtnFoto}>
                                                <Button title='Seleccionar una foto'
                                                        bgColor='#FF8C01'
                                                        widthSize='50%'
                                                        colorText='#fff'
                                                        fontWeight='bold'
                                                        fontSize={18}
                                                        onPress={this.handleSelectImage.bind(this)}
                                                />
                                            </View>
                                            <View style={{alignItems: 'center'}}>
                                                {this.state.foto == null ?
                                                    <Text style={{fontSize: 15, color: 'red', margin: 5}}>
                                                        <Icon name={'exclamation-circle'} size={20}/> {errors.foto}
                                                    </Text>
                                                    : null
                                                }
                                            </View>
                                        </View>
                                        <View style={styles.contBtns}>
                                            <Button
                                                title='Registrarse'
                                                bgColor='#00AA37'
                                                colorText='#fff'
                                                fontSize={20}
                                                // onPress={() => this.buttonPrueba()}
                                                onPress={handleSubmit}

                                            />
                                            {/*Modal*/}
                                            <ModalAlert
                                                modalvisible={modalVisible}
                                                title={this.state.message}
                                                IconName={this.state.icon}
                                                ErrorModal={this.state.color}
                                                onPress={() => {
                                                    this.setModalVisible(!modalVisible)
                                                    this.props.navigation.navigate('Auth')
                                                }}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </Col>
                        </Row>

                    </Grid>
                )}
            </Formik>
        )
    }

}


const styles = StyleSheet.create({
    containerGen: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 36,
    },
    stylesImg: {
        width: 200,
        height: 200,
    },
    contForm: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    contSelectionRol: {
        flex: 1,
        width: '100%',
    },
    formDataCar: {
        paddingHorizontal: 24
    },
    textPasajero: {
        fontSize: 18,
        color: '#00AA37',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnsCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    contBtns: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
    },
    contFoto: {
        flex: 1,
        width: '100%',
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
        alignSelf: 'center',
        marginVertical: 20
    },
    contBtnFoto: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowStyle: {
        height: 'auto',
        borderWidth: 1,
        borderColor: '#00AA37',
        borderRadius: 15,
        alignItems: 'center',

    },
    rowStyle2: {
        height: 'auto',
        borderWidth: 1,
        borderColor: '#FF8C01',
        borderRadius: 15,
        alignItems: 'center',
    },
    tittleSelect: {
        color: "#00AA37",
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5
    },
    tittleSelect2: {
        color: "#FF8C01",
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

const mapStateToProps = state => {
    return {
        jwt: state.services.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registrar: est => dispatch(Registro(est)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

