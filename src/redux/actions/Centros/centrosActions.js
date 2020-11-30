import {API} from '../../../API/comunicacionApi'

export const LISTAR_CENTROS = 'listar_centros';
export const CARGANDO = 'cargando_centros';
export const ERROR = 'centros_error';


export const listar_Centros = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })

    try {

        const Centro = await API.GET(`/centro/listar`)

        dispatch({
            type: LISTAR_CENTROS,
            payload: Centro.data.Centro
        })


    } catch (e) {

        dispatch({
            type: ERROR,
            payload: 'Información no disponible',
        });
    }
}
