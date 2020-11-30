import {API} from '../../../API/comunicacionApi'

export const LISTAR_USUARIOS = 'listar_usuarios';
export const CARGANDO = 'cargando_usuarios';
export const ERROR = 'usuarios_error';


export const ListarUsuarios = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })

    try {

        const Usuarios = await API.GET(`/usuario`)

        dispatch({
            type: LISTAR_USUARIOS,
            payload: Usuarios.data.datos
        })


    } catch (e) {

        dispatch({
            type: ERROR,
            payload: e.response,
        });
    }
}
