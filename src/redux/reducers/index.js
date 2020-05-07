import { combineReducers } from 'redux';
import postReducer from './post';
import servicesReducer from './services';
import peopleReducer from './people';
import configRegisterReducer from './configRegister';

export default combineReducers({
    post: postReducer,
    services: servicesReducer,
    people : peopleReducer,
    configRegister : configRegisterReducer,
});
