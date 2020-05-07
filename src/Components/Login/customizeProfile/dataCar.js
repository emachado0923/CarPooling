import React, { Component } from 'react';
import { View, Alert, Button, Text, Image, TextInput, Dimensions, StyleSheet,} from "react-native";
import { Input } from '../../common';
import Title from '../../../Components/titles/titles';
import { connect } from 'react-redux';
import Card from '../../../Components/cards/card';
import { statusVehiculo } from '../../../redux/actions/configRegister';

class DataCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            error: "",
            loading: false
        }
    }

    save() {
        this.props.statusVehicu(true)
        this.props.navigation.navigate("Forms")
    }

    render() {
        const { error } = this.state;
        const { errorTextStyle } = styles;
        return (
            <View style={styles.content} >
                <Title colorBorder='#E88100' colorBg='#E88100' colorText="#fff" title="FORMULARIO DE REGISTRO" />
                <Card
                    color="#f09209"
                    // flexDirection="row" margin="3%"
                    name="DATOS DEL VEHICULO" category=""
                    cantPersons={4} description="Algo breve mientras tanto :)"
                    borderRadius={10}
                    config={true}
                    estado={this.props.statusVehi ? "Completado" : "Incompleto"}
                />
                <Input
                    label={"Marca"}
                    // style={{ width: '85%', color: 'green' }}
                    borderBottomColor="green"
                />
                <Input
                    label={"Modelo"}
                    borderBottomColor="green"
                />
                <Input
                    label={"Tipo vehiculo"}
                    borderBottomColor="green"
                />
                <Input
                    label={"Placa"}
                    borderBottomColor="green"
                />
                <Button
                    title="Guardar"
                    onPress={()=>this.save()}
                    color='#E88100'
                />
                <Text style={errorTextStyle}>
                    {error}
                </Text>

                <Button
                    title="Atras"
                    onPress={() => this.props.navigation.goBack()}
                    color='#E88100'
                />
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
    containerStyle: {
        height: 40,
        flex: 1,
        alignItems: 'center'
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
        statusPassW: state.configRegister.statusPassword,
        statusVehi: state.configRegister.statusVehiculo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        statusVehicu: statusVehi => dispatch(statusVehiculo(statusVehi))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataCar);