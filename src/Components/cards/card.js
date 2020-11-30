import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listGrups: {
                width: this.props.config ? "100%" : "90%",
                maxWidht: this.props.config ? "100%" : "90%",
                borderWidth: !this.props.config ? 1 : null,
                borderRadius: 16,
                borderColor: !this.props.config ? this.props.color : null,
                backgroundColor: !this.props.config ? "white" : null,
                flexDirection: "row",
                marginBottom: 10,
                alignSelf: "center",
                justifyContent: "space-around",
                overflow: "hidden",
                alignItems: "center",
                position: "relative",
                shadowColor: "black",
                elevation: this.props.config ? 0 : 4,
            },
            foto: {
                borderWidth: 1,
                borderColor: this.props.color,
                borderRadius: this.props.borderRadius || 100,
                width: this.props.cantPersons ? 70 : 90,
                height: this.props.cantPersons ? 70 : 90,
                marginRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
            },
            nombreGrupo: {
                textTransform: "uppercase",
                color: this.props.color,
                fontSize: 17,
                marginRight: 5
            },
            categoriaGrupo: {
                textTransform: "uppercase",
                color: this.props.color,
                fontSize: 12
            },
            direction: {
                flexDirection: this.props.flexDirection,
                alignItems: this.props.flexDirection ? "flex-end" : "flex-start",
                justifyContent: 'flex-start',
                maxWidth: '90%'
            },
            onPress: this.props.onPress,
            container: {
                display: 'flex',
                flexDirection: 'row',
                minWidth: '100%',
                maxWidth: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: this.props.flexDirection ? 10 : 5,
                paddingHorizontal: 20
            },
            estado: {
                color: this.props.estado == "Completo" ? "green" : "red",
            }
        };
    }

    componentWillMount() {
        let {estado} = this.state;
        estado.color = this.props.estado == "Completo" ? "green" : "red";
        this.setState({estado})
    }

    render() {
        let estado = {
            color: this.props.estado === "Completo" ? "green" : "red"
        }
        return (
            <View style={this.state.listGrups}>

                <TouchableHighlight onPress={this.state.onPress} underlayColor="rgba(0,0,0,0.1)">
                    <View style={this.state.container}>


                        <Image style={this.state.foto}
                               source={{uri: this.props.img}}/>

                        {this.props.config ?
                            <View style={styles.headGrupo}>
                                <View style={this.state.direction}>
                                    <Text style={this.state.nombreGrupo}>{this.props.name}</Text>
                                </View>
                                <Text style={styles.description} numberOfLines={3}>
                                    <Icon name={this.props.iconName}/>{this.props.description}
                                </Text>
                                <Text style={estado}>
                                    <Icon name='circle' solid/> {this.props.estado}
                                </Text>
                            </View>
                            :
                            <View style={styles.headGrupo}>
                                <View style={this.state.direction}>
                                    <Text style={this.state.nombreGrupo}>{this.props.name}</Text>
                                    <Text style={this.state.categoriaGrupo}>
                                        {this.props.category}
                                    </Text>
                                </View>
                                {this.props.cantPersons === undefined ? (
                                    <Text style={styles.description} numberOfLines={3}>
                                        <Icon name={this.props.iconName} size={15}/> {this.props.description}
                                    </Text>
                                ) : (
                                    <Text style={this.state.cantPersons}>
                                        Cantidad de personas: {this.props.cupos}/
                                        {this.props.cantPersons}
                                    </Text>
                                )}
                            </View>
                        }

                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headGrupo: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative",
        minWidth: "50%",
        maxWidth: '75%',
    },
    description: {
        textAlign: "justify",
        overflow: "hidden",
        maxWidth: '90%'
    }
});
