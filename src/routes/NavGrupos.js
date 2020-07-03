import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grupos from '../View/Grupos/Grupos';
import MisGrupos from '../View/Grupos/MisGrupos';

const Tab = createMaterialTopTabNavigator();

function TabGrupos() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Mis Grupos' component={MisGrupos} />
      <Tab.Screen name='Grupos' component={Grupos} />
    </Tab.Navigator>
  );
}

export default TabGrupos;