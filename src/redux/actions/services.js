import { API, URL_API } from '../../API/comunicacionApi';
import AsyncStorage from '@react-native-community/async-storage';

export const JWT = 'JWT';
export const CARGANDO = 'CARGANDO';
export const GET_ERRORSTORE = 'GET_ERRORSTORE';
export const GET_USER = 'GET_USER';

export const cargando = stateLoading => ({
    type: CARGANDO,
    stateLoading
});

export const jwt = jwt => ({
    type: JWT,
    jwt
});

export const user = user => ({
    type: GET_USER,
    user
});

export const error = err => ({
    type: GET_ERRORSTORE,
    err
});

export const saveKey = (key, value) => async dispatch => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        dispatch(error('AsyncStorage Error: ' + error.message));
    }
}

export const loadJWT = () => async dispatch => {
    try {
        const value = await AsyncStorage.getItem('id_token');
        if (value !== null) {
            await API.AUTH(`${URL_API}/auth/user`,value).then(({data})=>{
                dispatch(jwt(value))
                dispatch(user(data));
            })
        }
        dispatch(cargando(false))
    } catch (error) {
        deleteJWT();
        dispatch(cargando(false));
        dispatch(error('AsyncStorage Error: ' + error.message));
    }
}

export const deleteJWT = () => async dispatch => {
    try {
        await AsyncStorage.removeItem('id_token')
            .then(
                () => {
                    dispatch(jwt(''))
                }
            );
    } catch (error) {
        dispatch(error('AsyncStorage Error: ' + error.message));
    }
}