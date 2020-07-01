import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { deleteJWT } from "../../redux/actions/services";
import { Grid, Row, Col } from "react-native-easy-grid";

// Componentes
import { ButtonMenu } from "../../Components/common/ButtonMenu";
import { ScrollView } from "react-native-gesture-handler";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: true
        };
    }

    actualizar_jwt() {
        const token = this.props.delJWT();
        if (token) {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Row style={styles.contaSec1}>
                    <Col style={styles.contImg}>
                        <View style={styles.img} />
                    </Col>
                    <Col style={styles.contPrincipalInfo}>
                        <Text style={styles.txt}>{this.props.user.nombre} {this.props.user.apellido}</Text>
                        <Text style={styles.txt}>{this.props.user.profile}</Text>
                        <ButtonMenu
                            onPress={this.actualizar_jwt.bind(this)}
                            colorText="black"
                            bgColor="white"
                            colorBorder="#274fb2"
                            title='Cerrar sesión'
                            iconName='sign-out-alt'
                            iconSize={20}
                        />
                    </Col>
                </Row>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
    },
    contaSec1: {
        flex: 1,
        backgroundColor:'#E0E0E0',
    },
    contImg: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: '#00AA37',
        borderWidth: 2
    },
    contPrincipalInfo: {
        justifyContent: 'center',
        paddingHorizontal:20,
        // backgroundColor: '#16ade1'
    },
    txt: {
        fontSize: 20
    },
})



const mapStateToProps = state => {
    return {
        jwt: state.services.jwt,
        user: state.services.user
        // person : state.people.person
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actualizar_jwt: est => dispatch(jwt(est)),
        delJWT: () => dispatch(deleteJWT())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);


