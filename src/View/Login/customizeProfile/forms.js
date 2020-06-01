import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { user } from '../../../redux/actions/services';
import { pass, Registro } from '../../../redux/actions/configRegister';
import Card from '../../../Components/cards/card';
import { Loading, Button } from '../../../Components/common';
import { API, URL_API } from '../../../API/comunicacionApi';
// import Title from '../../../Components/titles/titles';

import { TitlesTop } from '../../../Components/titles/titlesTop';
class Forms extends Component {

    constructor(props) {
        super();
        this.state = {
            data1: [
                { nombreGrupo: 'Devin aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Algo breve mientras tanto :)" },
                { nombreGrupo: 'Dan aaa', categoriaGrupo: 'moto', cantPers: 4, descripcion: "Algo breve mientras tanto :)" },
                { nombreGrupo: 'Dominic aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Algo breve mientras tanto :)" }
            ],
            data2: [
                { nombreGrupo: 'Jillian aaa', categoriaGrupo: 'bici', cantPers: 4, descripcion: "Algo breve mientras tanto :)" },
                { nombreGrupo: 'Jimmy aaa', categoriaGrupo: 'moto', cantPers: 4, descripcion: "Algo breve mientras tanto :)" },
                { nombreGrupo: 'Julie aaa', categoriaGrupo: 'carro', cantPers: 4, descripcion: "Algo breve mientras tanto :)" },
            ],
            typoDatos: "",
            error: "",
            loading: false
        }
        // this.bindThisFunction = this.bindThisFunction.bind(this)

    }

    pass() {
        this.props.update_pass(true);
    }

    save() {
        this.setState({ loading: true })
        this.props.update_user(this.props.user);
        let pass = false;
        if (this.props.typeProfile == "CONDUCTOR") {
            if (this.props.statusPassW && this.props.statusVehi) pass = true;
        } else {
            if (this.props.statusPassW) pass = true;
        }

        if (pass) {
            // API.PUT(`${URL_API}/user/update/${this.props.user._id}`, { password: this.props.passW, profile: this.props.typeProfile })
            API.PUT(`/api/usuario/${this.props.user._id}`, { password: this.props.passW, profile: this.props.typeProfile })
                .then(({ data }) => {
                    console.log('Mostrar data--->', data);
                    if (data.n == 0) {
                        console.log('Mostrar data--->', data);
                        this.setState({
                            error: 'error en el servidor intentelo mas tarde'
                        })
                    } else {
                        console.log('Mostrar data--->', data);
                        this.props.user.profile = this.props.typeProfile;
                        this.props.update_user(this.props.user);
                        this.pass()
                    }
                    this.setState({ loading: false });
                })
                .catch(() => {
                    this.setState({
                        error: 'Error en la conexión',
                        loading: false
                    })
                })
            // this.props.update_user(this.props.user);
        } else {
            this.setState({ error: "Verifique los datos", loading: false })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 5000);
        }
    }

    render() {
        const { loading } = this.state;
        const { navigate } = this.props.navigation;
        console.log(this.props.user.nombre)
        return (
            <View style={styles.contentGeneral} >
                <TitlesTop title='FORMULARIO DE REGISTRO' txtColor='#FFF' bgColor='#FF8C01' fontSize={22} />
                {/* <Title colorBorder='#E88100' colorBg='#E88100' colorText="#fff" title="FORMULARIO DE REGISTRO" /> */}
                <ScrollView >
                    <View style={styles.contentCards}>
                        <View>
                            <Image source={require('../../../resources/img/logoInicio/LogoSENA-naranja_vector.png')} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
                        </View>
                        <Card
                            color="#f09209"
                            name="DATOS PERSONALES" category=""
                            cantPersons={6}
                            description='Descripción de lo que debe hacer'
                            borderRadius={10}
                            config={true}
                            estado={this.props.statusPassW ? "Completo" : "Incompleto"}
                            onPress={() => navigate("DataPersonal")}
                            iconName='user'
                            iconSize={36}
                        />
                        <Card
                            color="#f09209"
                            name="DATOS DEL CENTRO" category=""
                            cantPersons={6}
                            description='Descripción de lo que debe hacer'
                            borderRadius={10}
                            config={true}
                            estado="Completo"
                            onPress={() => navigate("DataCenter")}
                            iconName='building'
                            iconSize={36}
                        />
                        {
                            this.props.typeProfile == "CONDUCTOR" ?
                                <Card
                                    color="#f09209"
                                    name="DATOS DEL VEHICULO" category=""
                                    cantPersons={4} description="Algo breve mientras tanto :)"
                                    borderRadius={10}
                                    config={true}
                                    estado={this.props.statusVehi ? "Completo" : "Incompleto"}
                                    onPress={() => navigate("DataCar")}
                                    iconName='car'
                                    iconSize={36}
                                /> : null
                        }
                        <Text style={styles.errorTextStyle}>
                            {this.state.error}
                        </Text>

                        {!loading ?
                            <Button
                                title="Finalizar"
                                onPress={() => this.save()}
                                bgColor='#00AA37'
                                colorText='#fff'
                                widthSize='30%'
                                fontSize={20}
                            />
                            // <Button
                            //     title="Finalizar"
                            //     onPress={() => this.save()}
                            //     color='#FF8C01'
                            // />
                            :
                            <Loading size={'large'} />
                        }
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    contentGeneral: {
        flex: 1,
    },
    contentCards: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.services.user,
        typeProfile: state.people.typeProfile,
        statusPassW: state.configRegister.statusPassword,
        statusVehi: state.configRegister.statusVehiculo,
        passW: state.configRegister.passWord,
        registro: state.configRegister.Registro
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_user: person => dispatch(user(person)),
        update_pass: pas => dispatch(pass(pas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

