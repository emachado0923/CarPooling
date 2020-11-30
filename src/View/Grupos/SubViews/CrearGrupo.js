import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {Col, Row} from "react-native-easy-grid";
import {TitlesTop} from '../../../Components/titles/titlesTop';
import {ScrollView} from 'react-native-gesture-handler';
import {Input, Button} from '../../../Components/common';
import Select from '../../../Components/Forms/Select'
// Formik and yup
import {Formik} from 'formik';
import * as yup from 'yup';
import {API} from "../../../API/comunicacionApi";
import Icon from "react-native-vector-icons/FontAwesome5";
import {connect} from "react-redux";
import {ModalAlert} from "../../../Components/Modal/modal";


const Valores = {
    nombreGrupo: '',
    sectorInicio: '',
    Destino: '',
    descripcion: '',
    cupos: '',
    tipoGrupo: '',
}
const Validaciones = yup.object().shape({

    nombreGrupo: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    sectorInicio: yup.string().required('El Sector de inicio es obligatorio').min(3, 'El Sector debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    Destino: yup.string().required('El Destino es obligatorio').min(3, 'El Destino debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
    cupos: yup.number().required('Los cupos es obligatorio').min(1, 'El cupo debe tener más de 3 caracteres').max(5, 'Por favor ingrese no más de 1 caracteres'),
    descripcion: yup.string().required('La descripción es obligatorio').min(3, 'La descripción debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),

})


class CrearGrupo extends Component {

    constructor() {
        super();
        this.state = {
            tipoArray: [],
            modalVisible: false,
            message: '',
            color: '',
            icon: ''

        }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    _registrarGrupo = (values) => {
        const id = this.props.user._id

        console.log(values)
        API.POST(`/grupo/crear/${id}`, values).then(res => {

            this.setState({
                modalVisible: true,
                message: res.data.message,
                color: 'green',
                icon: 'check'
            })

        }).catch(e => {
            this.setState({
                modalVisible: true,
                message: e.response.data.error,
                color: 'red',
                icon: 'times'
            })
        })

    }

    componentDidMount() {
        API.GET('/tipogrupo/listar').then(res => {
            this.setState({
                tipoArray: res.data.TipoGrupos
            })
        }).catch((e) => {
            alert(e)
        })
    }


    render() {
        const {tipoArray, modalVisible} = this.state
        return (
            <View style={styles.container}>
                <TitlesTop title='CREA UN NUEVO GRUPO' bgColor='#FF8C01' txtColor='#fff'/>
                <Formik initialValues={Valores} onSubmit={values => this._registrarGrupo(values)}
                        validationSchema={Validaciones}>
                    {({values, handleBlur, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                        <ScrollView>
                            <Col style={styles.contInfo}>
                                <Text style={styles.info}>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim nisi vel eveniet
                                    dicta
                                    voluptas pariatur quia odit doloribus eos eum consectetur distinctio eligendi quas
                                    esse
                                    delectus laboriosam explicabo, quo dolore!
                                </Text>
                            </Col>

                            <Col style={styles.contInputs}>
                                <Input
                                    label='Nombre'
                                    labelSize={22}
                                    labelColor='#00AA37'
                                    borderBottomColor='#00AA37'
                                    fontInputSize={20}
                                    placeholder='Ingresa el nombre del grupo'
                                    onBlur={handleBlur('nombreGrupo')}
                                    onChangeText={handleChange('nombreGrupo')}
                                    values={values.nombreGrupo}
                                />
                                {touched.nombreGrupo && errors.nombreGrupo &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.nombreGrupo}
                                </Text>
                                }
                                <Input
                                    label='Sector de inicio'
                                    labelSize={22}
                                    labelColor='#00AA37'
                                    borderBottomColor='#00AA37'
                                    fontInputSize={20}
                                    placeholder='Ingresa el sector de inicio de viajes'
                                    onBlur={handleBlur('sectorInicio')}
                                    onChangeText={handleChange('sectorInicio')}
                                    values={values.sectorInicio}
                                />
                                {touched.sectorInicio && errors.sectorInicio &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.sectorInicio}
                                </Text>
                                }
                                <Input
                                    label='Destino'
                                    labelSize={22}
                                    labelColor='#00AA37'
                                    borderBottomColor='#00AA37'
                                    fontInputSize={20}
                                    placeholder='Ingresa el destino al que va el viaje'
                                    onBlur={handleBlur('Destino')}
                                    onChangeText={handleChange('Destino')}
                                    values={values.Destino}
                                />
                                {touched.Destino && errors.Destino &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.Destino}
                                </Text>
                                }
                                <Input
                                    label='Descripcion'
                                    labelSize={22}
                                    labelColor='#00AA37'
                                    borderBottomColor='#00AA37'
                                    fontInputSize={20}
                                    placeholder='Ingresa la descripción del viaje'
                                    onBlur={handleBlur('descripcion')}
                                    onChangeText={handleChange('descripcion')}
                                    values={values.descripcion}
                                />
                                {touched.descripcion && errors.descripcion &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.descripcion}
                                </Text>
                                }


                                <View style={{marginVertical: 12,}}>

                                    <Text style={styles.tittleSelect}>Tipo de Grupo</Text>
                                    <Row style={styles.rowStyle}>

                                        <Picker selectedValue={values.tipoGrupo}
                                                onValueChange={handleChange('tipoGrupo')}
                                                onBlur={() => setFieldTouched('tipoGrupo')}
                                                style={{width: '100%'}}>

                                            {tipoArray.map((item, key) => (
                                                    <Picker.Item label={item.nombreGrupo} value={item._id} key={key}/>
                                                )
                                            )}
                                        </Picker>
                                    </Row>
                                </View>


                                <Input
                                    label='Cupos'
                                    labelSize={22}
                                    labelColor='#00AA37'
                                    borderBottomColor='#00AA37'
                                    fontInputSize={20}
                                    placeholder='Ingresa el numero de cupos'
                                    keyboardType={'number-pad'}
                                    onBlur={handleBlur('cupos')}
                                    onChangeText={handleChange('cupos')}
                                    values={values.cupos}
                                />
                                {touched.cupos && errors.cupos &&
                                <Text style={{fontSize: 15, color: 'red'}}>
                                    <Icon name={'exclamation-circle'} size={20}/> {errors.cupos}
                                </Text>
                                }
                            </Col>
                            <Col style={styles.contBtn}>
                                <Button
                                    widthSize='50%'
                                    title='Crear grupo'
                                    bgColor='#00AA37'
                                    colorText='#fff'
                                    fontSize={20}
                                    fontWeight='bold'
                                    onPress={handleSubmit}

                                />
                            </Col>
                        </ScrollView>
                    )}
                </Formik>
                {/*Modal*/}
                <ModalAlert
                    modalvisible={modalVisible}
                    title={this.state.message}
                    IconName={this.state.icon}
                    ErrorModal={this.state.color}
                    onPress={() => {
                        this.setModalVisible(!modalVisible)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contInfo: {
        marginVertical: 16,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    contInputs: {
        paddingHorizontal: 20,
    },
    contBtn: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16,
    },
    rowStyle: {
        height: 'auto',
        borderBottomWidth: 2,
        borderColor: '#00AA37',
    },
    tittleSelect: {
        color: "#00AA37",
        fontWeight: 'bold',
        fontSize: 20
    }
})
const mapStateToProps = state => {
    return {
        user: state.services.user
    };
};

export default connect(mapStateToProps)(CrearGrupo);
