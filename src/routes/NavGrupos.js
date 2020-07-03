import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grupos from '../View/Grupos/SubViews/Grupos';
import MisGrupos from '../View/Grupos/SubViews/MisGrupos';

const Tab = createMaterialTopTabNavigator();

function TabGrupos() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Mis Grupos' component={MisGrupos} />
      <Tab.Screen name='Grupos sugeridos' component={Grupos} />
      <Tab.Screen name='Nuevo grupo' component={Grupos} />
    </Tab.Navigator>
  );
}

export default TabGrupos;