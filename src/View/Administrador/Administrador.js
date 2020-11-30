import React, {Component} from "react";
import {View, ImageBackground, TextInput, ScrollView} from "react-native";
import {TitlesTop} from "../../Components/titles/titlesTop";
import CardInfo from "../../Components/cards/CardInfo";


class Administrador extends Component {


    render() {
        return (
            <View>
                <TitlesTop
                    title={'Administración'}
                    widthSize='80%'
                    bgColor="#00AA37"
                    txtColor='#fff'
                />

                {<ImageBackground source={require('../../resources/animations/images/img_0.png')}
                                  style={{width: '100%', height: '100%'}}>

                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '95%',
                        left: 10,
                        marginTop: 50
                    }}>

                        <CardInfo

                            bgColor='#fff'
                            size={60}
                            title={'Usuarios'}
                            info={'Gestión de usuarios'}
                            containerBorder='#00AA37'
                            colorTitle='#00AA37'
                            iconName={'users'}
                            iconSize={20}
                            onPress={() => this.props.navigation.navigate("AdminUsuarios")}
                        />

                        <CardInfo
                            bgColor='#fff'
                            size={60}
                            iconSize={20}
                            title={'Noticias'}
                            info={'Gestión de noticias'}
                            containerBorder='#00AA37'
                            colorTitle='#00AA37'
                            iconName={'newspaper'}
                            onPress={() => this.props.navigation.navigate("AdminNoticias")}
                        />
                        <CardInfo
                            bgColor='#fff'
                            size={60}
                            iconSize={20}
                            title={'Ciudades'}
                            info={'Gestión de ciudades'}
                            containerBorder='#00AA37'
                            colorTitle='#00AA37'
                            iconName={'city'}
                            onPress={() => this.props.navigation.navigate("AdminCiudad")}
                        />
                        <CardInfo
                            bgColor='#fff'
                            size={60}
                            iconSize={20}
                            title={'Centros'}
                            info={'Gestión de centros'}
                            containerBorder='#00AA37'
                            colorTitle='#00AA37'
                            iconName={'university'}
                            onPress={() => this.props.navigation.navigate("AdminCentros")}
                        />
                        <CardInfo
                            bgColor='#fff'
                            size={60}
                            iconSize={20}
                            title={'Sedes'}
                            info={'Gestión de sedes'}
                            containerBorder='#00AA37'
                            colorTitle='#00AA37'
                            iconName={'building'}
                            onPress={() => this.props.navigation.navigate("AdminSedes")}
                        />

                    </View>
                </ImageBackground>
                }
            </View>
        )
    }

}

export default Administrador
