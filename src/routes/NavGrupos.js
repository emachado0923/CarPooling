import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Grupos from '../View/Grupos/SubViews/Grupos';
import MisGrupos from '../View/Grupos/SubViews/MisGrupos';
import CrearGrupo from '../View/Grupos/SubViews/CrearGrupo';

const Tab = createMaterialTopTabNavigator();

function TabGrupos() {
    return (
        <Tab.Navigator swipeEnabled={false} tabBarOptions={{
            activeTintColor: '#00AA37',
            labelStyle: {fontSize: 12},

        }}>
            <Tab.Screen name='Mis Grupos' component={MisGrupos}/>
            <Tab.Screen name='Grupos sugeridos' component={Grupos}/>
            <Tab.Screen name='Nuevo grupo' component={CrearGrupo}/>
        </Tab.Navigator>
    );
}

export default TabGrupos;
