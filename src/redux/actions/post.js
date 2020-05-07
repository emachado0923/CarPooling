import { API, URL_API } from '../../API/comunicacionApi'

export const GET_POST = 'GET_POST';
export const GET_RESPUESTA = 'GET_RESPUESTA';
export const GET_ERROR = 'GET_ERROR';

export const articulos = datos => ({
    type: GET_POST,
    datos
});

export const respuesta = resp => ({
    type: GET_RESPUESTA,
    resp
});

export const error = err => ({
    type: GET_ERROR,
    err
});

export const obtener_articulos = () => dispatch => {
    return API.GET(`${URL_API}/personas`).then(({data})=>{
        dispatch(articulos(data))
    })
    .catch(err => {
        dispatch(error(err));
    });
}
