import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from '../../common';
import { TitlesTop } from '../../../Components/titles/titlesTop';
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
                <TitlesTop title='FORMULARIO DE REGISTRO' txtColor='#FFF' bgColor='#FF8C01' fontSize={22} />

                <Card
                    color="#f09209"
                    name="DATOS DEL VEHICULO" category=""
                    cantPersons={1}
                    description="Algo breve mientras tanto :)"
                    borderRadius={10}
                    config={true}
                    estado={this.props.statusVehi ? "Completo" : "Incompleto"}
                    iconName='car'
                    iconSize={40}
                />
                <ScrollView>
                    <View style={styles.contForm}>
                        <Input
                            label={"Marca"}
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
                        <View style={styles.contentBtns}>
                            <Button
                                title="Guardar"
                                onPress={() => this.save()}
                                bgColor='#00AA37'
                                colorText='#fff'
                                fontSize={16}
                            />
                            <Text style={errorTextStyle}>
                                {error}
                            </Text>

                            <Button
                                title="Atras"
                                onPress={() => this.props.navigation.goBack()}
                                bgColor='#FF8C01'
                                colorText='#fff'
                                fontSize={16}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-around'
    },
    contForm: {
        paddingHorizontal: 16,
    },
    contentBtns: {
        alignItems: 'center',
        marginVertical: 16
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