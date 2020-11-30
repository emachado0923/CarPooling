import {API} from '../../../API/comunicacionApi'

export const LISTAR_SEDES = 'listar_sedes';
export const CARGANDO = 'cargando_sedes';
export const ERROR = 'sedes_error';


export const Listar_Sedes = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })

    try {

        const Sedes = await API.GET(`/sede/listar`)

        dispatch({
            type: LISTAR_SEDES,
            payload: Sedes.data.Sede
        })



    } catch (e) {

        dispatch({
            type: ERROR,
            payload: 'Información no disponible',
        });
    }
}
