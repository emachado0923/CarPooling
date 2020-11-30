import {API} from '../../../API/comunicacionApi'

export const LISTAR_CIUDADES = 'listar_ciudades';
export const CARGANDO = 'cargando_ciudades';
export const ERROR = 'ciudades_error';


export const listar_Ciudad = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })

    try {

        const Ciudad = await API.GET(`/ciudad/listar`)

        dispatch({
            type: LISTAR_CIUDADES,
            payload: Ciudad.data.ciudad
        })



    } catch (e) {

        dispatch({
            type: ERROR,
            payload: 'Información no disponible',
        });
    }
}
