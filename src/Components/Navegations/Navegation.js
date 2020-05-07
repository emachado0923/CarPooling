import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Inicio from '../../View/pages/Inicio';
import Grupos from '../../View/pages/Grupos';
import Nortificaciones from '../../View/pages/Notificacion';
import Perfil from '../../View/pages/Perfil';
import Viajes from '../../View/pages/Viajes';

// const InicioStack = createStackNavigator({
//   Home: { screen: Inicio },
//   Details: { screen: DetailsScreen },
// });

// const NortificacionesStack = createStackNavigator({
//   Settings: { screen: Nortificaciones },
//   Details: { screen: DetailsScreen },
// });

// const ViajesStack = createStackNavigator({
//     Home: { screen: Inicio },
//     Details: { screen: DetailsScreen },
// });

// const GruposStack = createStackNavigator({
//     Settings: { screen: Nortificaciones },
//     Details: { screen: DetailsScreen },
// });

// const PerfilStack = createStackNavigator({
//     Settings: { screen: Nortificaciones },
//     Details: { screen: DetailsScreen },
// });

const Contenedor = createAppContainer(createBottomTabNavigator(
    {
        Viajes: { screen: Viajes },
        Grupos: { screen: Grupos },
        Inicio: { screen: Inicio },
        Nortificaciones: { screen: Nortificaciones },
        Perfil: { screen: Perfil },
        
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Viajes') {
                    iconName = `ios-car`;
                } else if (routeName === 'Grupos') {
                    iconName = `ios-people`;
                } else if (routeName === 'Inicio') {
                    iconName = `ios-home`;
                } else if (routeName === 'Nortificaciones') {
                    iconName = `ios-notifications`;
                } else if (routeName === 'Perfil') {
                    iconName = `ios-person`;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
            
            // tabBarLabel: ({ focused, tintColor }) => {
            //     const {routeName} = navigation.state;
            //     if (routeName === 'Viajes') {
            //         return label = focused ? (<Text>Viajes</Text>) : null;
            //     } else if (routeName === 'Grupos') {
            //         return label = focused ? (<Text>Grupos</Text>) : null;
            //     } else if (routeName === 'Inicio') {
            //         return label = focused ? (<Text>Inicio</Text>) : null;
            //     } else if (routeName === 'Nortificaciones') {
            //         return label = focused ? (<Text>Nortificaciones</Text>) : null;
            //     } else if (routeName === 'Perfil') {
            //         return label = focused ? (<Text>Perfil</Text>) : null;
            //     }
            // }
        }),
        initialRouteName : 'Inicio',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
));

export default function () {
    return (
        <Contenedor initialRouteName="Inicio"/>
    );
}