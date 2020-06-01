// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import Forms from '../View/Login/customizeProfile/forms';
// import SelectRol from '../View/Login/customizeProfile/selectRol';
// import DataPersonal from '../Components/Login/customizeProfile/dataPersonal';
// import DataCenter from '../Components/Login/customizeProfile/dataCenter';
// import DataCar from '../Components/Login/customizeProfile/dataCar';
// import ChangePassword from '../Components/Login/changePassword';
// import Register from '../View/Login/Register';
// import Auth from '../View/Login/Auth';

// const AppNavigation = createStackNavigator(

//   {
//     Forms: { navigationOptions: { headerShown: false }, screen: Forms },
//     Auth: { navigationOptions: { headerShown: false }, screen: Auth },
//     Register: { navigationOptions: { headerShown: false }, screen: Register },
//     SelectRol: { navigationOptions: { headerShown: false }, screen: SelectRol },
//     DataPersonal: { navigationOptions: { headerShown: false }, screen: DataPersonal },
//     DataCenter: { navigationOptions: { headerShown: false }, screen: DataCenter },
//     DataCar: { navigationOptions: { headerShown: false }, screen: DataCar },
//     ChangePassword: { navigationOptions: { headerShown: false }, screen: ChangePassword },
//   }, {

//   initialRouteName: 'SelectRol'
// }
// );

// export default AppContainer = createAppContainer(AppNavigation);

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Forms from '../View/Login/customizeProfile/forms';
import SelectRol from '../View/Login/customizeProfile/selectRol';
import DataPersonal from '../Components/Login/customizeProfile/dataPersonal';
import DataCenter from '../Components/Login/customizeProfile/dataCenter';
import DataCar from '../Components/Login/customizeProfile/dataCar';
import ChangePassword from '../Components/Login/changePassword';
import Register from '../View/Login/Register';
import Auth from '../View/Login/Auth';
import Grupos from '../View/Grupos';
import Perfil from '../View/Perfil';
import Viajes from '../View/Viajes';
import Notificaciones from '../View/Notificacion';
import Inicio from '../View/Inicio';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

export default function App({View}) {
  console.log('Está en la vista ------>',  View)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={View}>
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="DataCar" component={DataCar} options={{ headerShown: false }} />
        <Stack.Screen name="DataCenter" component={DataCenter} options={{ headerShown: false }} />
        <Stack.Screen name="DataPersonal" component={DataPersonal} options={{ headerShown: false }} />
        <Stack.Screen name="SelectRol" component={SelectRol} options={{ headerShown: false }} />
        <Stack.Screen name="Forms" component={Forms} options={{ headerShown: false }} />
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ }) => {
          const routeName = route.name;
          let iconName;
          if (routeName === 'Inicio') {
            iconName = `home`;
          } else if (routeName === 'Perfil') {
            return <FontAwesome name={'user'} size={25} color={'#00AA37'} />;
          } else if (routeName === 'Grupos') {
            return <FontAwesome name={'users'} size={25} color={'#00AA37'} />;
          } else if (routeName === 'Notificaciones') {
            return <FontAwesome name={'bell'} size={25} color={'#00AA37'} />;
          } else if (routeName === 'Viajes') {
            return <FontAwesome name={'car'} size={25} color={'#00AA37'} />;
          }
          return <FontAwesome name={iconName} size={25} color={'#00AA37'} />;
        },
      })}
      initialRouteName='Inicio'
      tabBarOptions={{activeTintColor: 'tomato', inactiveTintColor: 'gray', labelStyle: {fontSize: 15}, style: {height: 55,}
      }}>
      <Tab.Screen name='Grupos' component={Grupos} options={{ headerShown: false }} />
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Notificaciones" component={Notificaciones} />
      <Tab.Screen name="Viajes" component={Viajes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}