import { API, URL_API } from '../../API/comunicacionApi';
import { GET_STATE_PASSWORD, GET_STATE_VEHICULO, GET_PASSWORD , GET_PASS} from '../actions/configRegister'


export default (state = { statusPassword: false, statusVehiculo: false, passWord: "" , pass:false}, action) => {
    switch (action.type) {
        case GET_STATE_PASSWORD:
            return { ...state, statusPassword: action.statusPassword }
        case GET_STATE_VEHICULO:
            return { ...state, statusVehiculo: action.statusVehiculo }
        case GET_PASSWORD:
            return { ...state, passWord: action.passWord }
        case GET_PASS:
            return {...state, pass: action.pass}

        default:
            return state;
    }
}