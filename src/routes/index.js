import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Register from '../View/Login/Register';
import Auth from '../View/Login/Auth';
import Grupos from '../View/Grupos';
import Perfil from '../View/Perfil';
import ModificarConductor from '../View/Perfil/Modificar/modificarConductor';
import ModificarPasajero from '../View/Perfil/Modificar/modificarPasajero';
import Viajes from '../View/Viajes';
import Notificaciones from '../View/Notificacion';
import Inicio from '../View/Inicio';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

export default function App({View}) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={View}>
                <Stack.Screen name='Auth' component={Auth} options={{headerShown: false}}/>
                <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                <Stack.Screen name='MyTabs' component={MyTabs} options={{headerShown: false}}/>
                <Stack.Screen name='ModificarConductor' component={ModificarConductor} options={{headerShown: false}}/>
                <Stack.Screen name='ModificarPasajero' component={ModificarPasajero} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({}) => {
                    const routeName = route.name;
                    let iconName;
                    if (routeName === 'Inicio') {
                        iconName = 'home';
                    } else if (routeName === 'Perfil') {
                        return <FontAwesome name={'user'} size={25} color={'#00AA37'}/>;
                    } else if (routeName === 'Grupos') {
                        return <FontAwesome name={'users'} size={25} color={'#00AA37'}/>;
                    } else if (routeName === 'Noticias') {
                        return <FontAwesome name={'bell'} size={25} color={'#00AA37'}/>;
                    } else if (routeName === 'Viajes') {
                        return <FontAwesome name={'car'} size={25} color={'#00AA37'}/>;
                    }
                    return <FontAwesome name={iconName} size={25} color={'#00AA37'}/>;
                },
            })}
            initialRouteName='Inicio'
            tabBarOptions={{
                activeTintColor: '#FF8C01',
                inactiveTintColor: 'gray',
                labelStyle: {fontSize: 15, fontWeight: 'bold'},
                style: {height: 55,}
            }}>
            <Tab.Screen name='Grupos' component={Grupos} options={{headerShown: false}}/>
            <Tab.Screen name='Viajes' component={Viajes}/>
            <Tab.Screen name='Inicio' component={Inicio}/>
            <Tab.Screen name='Noticias' component={Notificaciones}/>
            <Tab.Screen name='Perfil' component={Perfil}/>
        </Tab.Navigator>
    );
}
