import React, { Component } from 'react';
import { View, Alert, Text, Image, TextInput, Dimensions, StyleSheet, ScrollView, } from "react-native";
import { Input, Button } from '../../common';
import Title from '../../../Components/titles/titles';
import { connect } from 'react-redux';
import Card from '../../../Components/cards/card';

class DataCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            error: "",
            loading: false
        }
    }

    save() {
        alert("Hola")
    }

    render() {
        const { error, loading } = this.state;
        const { errorTextStyle } = styles;
        return (
            <View style={styles.content} >
                <Title colorBorder='#FF8C01' colorBg='#FF8C01' colorText="#fff" title="FORMULARIO DE REGISTRO" />
                <Card
                    color="#f09209"
                    // flexDirection="row" margin="3%"
                    name="DATOS DEL CENTRO" category=""
                    cantPersons={1}
                    description="Algo breve mientras tanto bnjjkhjk hjkh jjbhjk  hjkh jkhjkh kj :)"
                    borderRadius={10}
                    config={true}
                    estado="Completo"
                    iconName='building'
                    iconSize={40}
                />
                <Text>PENDIENTES</Text>
                {/* 
        <Input
          label={"Nombre"}
          value={"this.props.user.id_person.nombre"}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"Apellido"}
          value={this.props.user.id_person.apellido}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"Documento"}
          value={this.props.user.id_person.documento}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"Telefono"}
          value={this.props.user.id_person.telefono}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"E-mail"}
          value={this.props.user.id_person.email}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"Ciudad"}
          value={this.props.user.id_person.ciudad}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Input
          label={"Fecha_Facimiento"}
          value={this.props.user.id_person.fecha_nacimiento}
          style={{ width: '85%', color: 'green' }}
          editable={false}
        />
        <Button
            title="Cambiar contraseña"
            onPress={()=>this.props.navigation.navigate("ChangePassword")}
            color='#FF8C01'
          />
        <Text style={errorTextStyle}>
          {error}
        </Text>
        */}
                <Button
                    title="Atras"
                    onPress={() => this.props.navigation.goBack()}
                    bgColor='#FF8C01'
                    bgColor='#FF8C01'
                    colorText='#fff'
                    fontSize={16}
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
    }
}

export default connect(mapStateToProps, {})(DataCenter);