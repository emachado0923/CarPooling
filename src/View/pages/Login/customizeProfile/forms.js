import React, { Component } from 'react';
import { View, Button, Text, Image, TextInput, Dimensions, StyleSheet, ScrollView, FlatList, AppRegistry } from "react-native";
import { connect } from 'react-redux';
import { user } from '../../../../redux/actions/services';
import { pass } from '../../../../redux/actions/configRegister';
import Card from '../../../../Components/cards/card';
import Title from '../../../../Components/titles/titles';
import { Loading } from '../../../../Components/common';
import { API, URL_API } from '../../../../API/comunicacionApi';

class Forms extends Component {

    constructor() {
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

    pass(){
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
            API.PUT(`${URL_API}/user/update/${this.props.user.id_person._id}`, { password: this.props.passW, profile: this.props.typeProfile })
                .then(({ data }) => {
                    console.log(data);
                    if (data.n == 0) {
                        this.setState({
                            error: 'error en el servidor intentelo mas tarde'
                        })
                    } else {
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
                this.props.update_user(this.props.user);
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
        return (
            <View style={styles.content} >
                <Title colorBorder='#E88100' colorBg='#E88100' colorText="#fff" title="FORMULARIO DE REGISTRO" />
                <View>
                    <Image source={require('../../../../resources/img/logoInicio/LogoSENA-naranja_vector.png')} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
                </View>
                <ScrollView style={styles.contentGroups}>
                    <Card
                        color="#f09209"
                        // flexDirection="row" margin="3%"
                        name="DATOS PERSONALES" category=""
                        cantPersons={6} description="Algo breve mientras tanto :)"
                        borderRadius={10}
                        config={true}
                        estado={this.props.statusPassW ? "Completado" : "Incompleto"}
                        onPress={() => navigate("DataPersonal")}
                    />
                    <Card
                        color="#f09209"
                        // flexDirection="row" margin="3%"
                        name="DATOS DEL CENTRO" category=""
                        cantPersons={6} description="Algo breve mientras tanto bnjjkhjk hjkh jjbhjk  hjkh jkhjkh kj :)"
                        borderRadius={10}
                        config={true}
                        estado="Completado"
                        onPress={() => navigate("DataCenter")}
                    />
                    {
                        this.props.typeProfile == "CONDUCTOR" ?
                            <Card
                                color="#f09209"
                                // flexDirection="row" margin="3%"
                                name="DATOS DEL VEHICULO" category=""
                                cantPersons={4} description="Algo breve mientras tanto :)"
                                borderRadius={10}
                                config={true}
                                estado={this.props.statusVehi ? "Completado" : "Incompleto"}
                                onPress={() => navigate("DataCar")}
                            /> : null
                    }
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>

                    {!loading ?
                        <Button
                            title="Finalizar"
                            onPress={() => this.save()}
                            color='#E88100'
                        />
                        :
                        <Loading size={'large'} />
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    grupos: {
        marginTop: 10,
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#59b548",
        backgroundColor: "#59b548",
        padding: 10,
        fontSize: 20,
        maxWidth: 150,
        width: 150,
        color: "#fff",
        marginBottom: 10,
        textAlign: "center"
    },
    misgrupos: {
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#59b548",
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 20,
        maxWidth: 150,
        width: 150,
        color: "#238276",
        marginBottom: 10,
        textAlign: "center"
    },
    contentGroups: {
        flex: 1,
    },
    contentMyGroups: {
        flex: 1
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
        passW: state.configRegister.passWord
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_user: person => dispatch(user(person)),
        update_pass: pas => dispatch(pass(pas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

