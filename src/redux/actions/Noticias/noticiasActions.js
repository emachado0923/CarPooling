import {API} from '../../../API/comunicacionApi'

export const LISTAR_NOTICIAS = 'listar_noticias';
export const CARGANDO = 'cargando_noticias';
export const ERROR = 'noticias_error';


export const listarNoticias = () => async (dispatch) => {

    dispatch({
        type: CARGANDO,
        payload: true
    })

    try {

        const Noticias = await API.GET(`/noticia/listar`)

        dispatch({
            type: LISTAR_NOTICIAS,
            payload: Noticias.data
        })

    } catch (e) {

        dispatch({
            type: ERROR,
            payload: 'Información no disponible',
        });
    }
}
