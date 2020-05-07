// import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Inicio from '../View/pages/Inicio';
import Grupos from '../View/pages/Grupos';
import Nortificaciones from '../View/pages/Notificacion';
import Perfil from '../View/pages/Perfil';
import Viajes from '../View/pages/Viajes';
import Forms from '../View/pages/Login/customizeProfile/forms';
import SelectRol from '../View/pages/Login/customizeProfile/selectRol';
import DataPersonal from '../Components/Login/customizeProfile/dataPersonal';
import DataCenter from '../Components/Login/customizeProfile/dataCenter';
import DataCar from '../Components/Login/customizeProfile/dataCar';
import ChangePassword from '../Components/Login/changePassword';

  const AppNavigation = createStackNavigator(
    {
      Forms: {screen: Forms},
      SelectRol: {screen: SelectRol},
      DataPersonal: {screen: DataPersonal},
      DataCenter: {screen: DataCenter},
      DataCar: {screen: DataCar},
      ChangePassword: {screen: ChangePassword},
    },{
      initialRouteName:"SelectRol"
    }
  );

  export default AppContainer = createAppContainer(AppNavigation);

