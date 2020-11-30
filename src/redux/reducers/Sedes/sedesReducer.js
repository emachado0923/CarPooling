import {LISTAR_SEDES, CARGANDO, ERROR} from '../../actions/Sedes/sedesActions'

const INITIAL_STATE = {

    sedes: [],
    cargando: false,
    error: ''

}

export default (state = INITIAL_STATE, action) => {


    switch (action.type) {
        case LISTAR_SEDES:
            return {
                ...state,
                sedes: action.payload,
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
