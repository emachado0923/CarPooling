import {CARGANDO, ERROR, LISTAR_CIUDADES} from '../../actions/Ciudades/ciudadesActions'

const INITIAL_STATE = {
    ciudad: [],
    cargando: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {


    switch (action.type) {

        case LISTAR_CIUDADES:
            return {
                ...state,
                ciudad: action.payload,
                cargando: false,
                error: ''
            }
        case CARGANDO:
            return {
                ...state,
                cargando: true,
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                cargando: false
            }
        default:
            return state

    }
}
