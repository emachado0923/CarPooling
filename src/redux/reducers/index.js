import {combineReducers} from 'redux';
import postReducer from './post';
import servicesReducer from './services';
import peopleReducer from './people';
import configRegisterReducer from './configRegister';
import UsuariosReducer from './Usuarios/UsuariosReducer';
import NoticiasReducer from './Noticias/noticiasReducer';
import SedesReducer from './Sedes/sedesReducer';
import CentrosReducer from './Centros/centrosReducer'
import CiudadReducer from './Ciudades/ciudadesReducer'

export default combineReducers({
    post: postReducer,
    services: servicesReducer,
    people: peopleReducer,
    configRegister: configRegisterReducer,
    usuarios: UsuariosReducer,
    noticias: NoticiasReducer,
    sedes: SedesReducer,
    centros: CentrosReducer,
    ciudades: CiudadReducer
});
