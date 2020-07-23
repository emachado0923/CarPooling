import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TitlesTop } from '../../Components/titles/titlesTop';
import { Input, Button } from '../../Components/common';
import { API, URL_API } from '../../API/comunicacionApi';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Registro } from '../../redux/actions/configRegister';
import { connect } from 'react-redux'
import { ButtonSelect } from '../../Components/common/ButtonSelect';
// Formik and yup
import { Formik } from 'formik';
import * as yup from 'yup';



class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehiculo: {},
    }
  }

  async registrarUsuario(values) {
    console.log('registró')
    await API.POST(`/api/usuario`, values)
      .then(() => {
        alert('Registro completado')
      })
      .catch(() => {
        console.log('Error')
      })

  }

  render() {
    return (

      <Formik initialValues={{
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
        vehiculo: {
          marca: '',
          color: '',
          placa: ''
        },

      }} onSubmit={values => this.registrarUsuario(values)}
        validationSchema={
          yup.object().shape({

            nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
            apellido: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener más de 3 caracteres').max(40, 'Por favor ingrese no más de 40 caracteres'),
            tipo_doc: yup.string().required('El tipo de documento es obligatorio'),
            numero_doc: yup.string().required('El número de documento es requerido'),
            celular: yup.string().required('El número de celular es obligatorio'),
            correo: yup.string().required('El correo es obligatorio').email('Direccion de correo invalida').matches(/(misena.edu.co$|sena.edu.co$)/, 'Solo se permiten correos sena'),
            centro: yup.string().required('El centro es obligatorio'),
            dirección: yup.string().required('La dirección es obligatoria').min(7, 'La direccion debe tener más de 7 caracteres'),
            contraseña: yup.string().required('La Contraseña es obligatoria').min(7, 'La contraseña debe tener más de 7 caracteres'),
            profile: yup.string().required('Selecciona un rol'),

            marca: yup.string().when('profile', {
              is: 'CONDUCTOR', then: yup.string().required('La marca es obligatoria')
            }),
            color: yup.string().when('profile', {
              is: 'CONDUCTOR', then: yup.string().required('El color es obligatorio'),
            }),

            placa: yup.string().when('profile', {
              is: 'CONDUCTOR', then: yup.string().required('La placa es obligatoria'),
            }),


          })}>
        {({ values, handleBlur, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
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
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Nombre'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu nombre'
                        onBlur={handleBlur('nombre')}
                        onChangeText={handleChange('nombre')}
                        values={values.nombre}
                      />
                      {/* Errores*/}
                      {touched.nombre && errors.nombre &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.nombre}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Apellido'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu apellido'
                        onChangeText={handleChange('apellido')}
                        onBlur={handleBlur('apellido')}
                        values={values.apellido}
                      />
                      {/* Errores*/}
                      {touched.apellido && errors.apellido &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.apellido}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Tipo de documento'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu tipo de documento'
                        onChangeText={handleChange('tipo_doc')}
                        onBlur={handleBlur('tipo_doc')}
                        values={values.tipo_doc}
                      />
                      {/* Errores*/}
                      {touched.tipo_doc && errors.tipo_doc &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.tipo_doc}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Número de documento'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu número de documento'
                        onChangeText={handleChange('numero_doc')}
                        onBlur={handleBlur('numero_doc')}
                        values={values.numero_doc}
                      />
                      {/* Errores*/}
                      {touched.numero_doc && errors.numero_doc &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.numero_doc}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Número de celular'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu número de celular'
                        onChangeText={handleChange('celular')}
                        onBlur={handleBlur('celular')}
                        values={values.celular}
                      />
                      {/* Errores*/}
                      {touched.celular && errors.celular &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.celular}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Email'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu correo sena'
                        onBlur={() => setFieldTouched('correo')}
                        onChangeText={handleChange('correo')}
                        values={values.correo}
                      />
                      {/* Errores*/}
                      {touched.correo && errors.correo &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.correo}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Centro'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu centro de formación'
                        onBlur={handleBlur('centro')}
                        onChangeText={handleChange('centro')}
                        values={values.centro}
                      />
                      {/* Errores*/}
                      {touched.centro && errors.centro &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.centro}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Dirección'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu dirección'
                        onBlur={handleBlur('dirección')}
                        onChangeText={handleChange('dirección')}
                        values={values.dirección}
                      />
                      {/* Errores*/}
                      {touched.dirección && errors.dirección &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.dirección}
                        </Text>
                      }
                      <Input
                        labelColor='#FF8C01'
                        labelSize={20}
                        fontInputSize={20}
                        label='Contraseña'
                        borderBottomColor='#FF8C01'
                        placeholder='Ingresa tu contraseña'
                        onBlur={handleBlur('contraseña')}
                        onChangeText={handleChange('contraseña')}
                        values={values.contraseña}
                      />
                      {/* Errores*/}
                      {touched.contraseña && errors.contraseña &&
                        <Text style={{ fontSize: 15, color: 'red' }}>
                          <Icon name={'exclamation-circle'} size={20} /> {errors.contraseña}
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
                      <Text style={{ padding: 20, fontSize: 20, textAlign: 'center' }}>
                        ¿Serás un Conductor o un Pasajero?
                      </Text>

                      <View style={styles.btnsCont}>
                        <ButtonSelect
                          title="Conductor"
                          sizeIcon={36}
                          colorIcon='#fff'
                          onPress={() => {
                            this.setState({ profile: 'CONDUCTOR' })
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
                            this.setState({ profile: 'PASAJERO' })
                            values.profile = 'PASAJERO'
                          }}
                          colorText='#fff'
                          bgColor='#00AA37'
                          borderRadius={24}
                        />
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        {touched.profile && errors.profile &&
                          <Text style={{ fontSize: 15, color: 'red' }}>
                            <Icon name={'exclamation-circle'} size={20} /> {errors.profile}
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
                          <Input
                            label='Marca'
                            placeholder='Ingresa la marca de tu vehículo'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={20}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('marca')}
                            onChangeText={handleChange('marca')}
                            values={values.vehiculo.marca}

                          />
                          {touched.vehiculo.marca && errors.marca &&
                            <Text style={{ fontSize: 15, color: 'red' }}>
                              <Icon name={'exclamation-circle'} size={20} /> {errors.marca}
                            </Text>
                          }
                          <Input
                            label='Color'
                            placeholder='Ingresa el color de tu vehículo'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={20}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('color')}
                            onChangeText={handleChange('color')}
                            values={values.vehiculo.color}
                          />
                          {touched.vehiculo.color && errors.color &&
                            <Text style={{ fontSize: 15, color: 'red' }}>
                              <Icon name={'exclamation-circle'} size={20} /> {errors.color}
                            </Text>
                          }
                          <Input
                            label='Número de placa'
                            placeholder='Ingresa tu número de placa'
                            labelColor='#00AA37'
                            labelSize={20}
                            fontInputSize={20}
                            borderBottomColor='#00AA37'
                            onBlur={handleBlur('placa')}
                            onChangeText={handleChange('placa')}
                            values={values.vehiculo.placa}
                          />
                          {touched.vehiculo.placa && errors.placa &&
                            <Text style={{ fontSize: 15, color: 'red' }}>
                              <Icon name={'exclamation-circle'} size={20} /> {errors.placa}
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

                    
                    <View style={styles.contBtns}>
                      <Button
                        title='Registrarse'
                        bgColor='#00AA37'
                        colorText='#fff'
                        fontSize={20}
                        onPress={handleSubmit}
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

