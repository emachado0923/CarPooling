import {CARGANDO, ERROR, LISTAR_CENTROS} from "../../actions/Centros/centrosActions";


const INITIAL_STATE = {

    centros: [],
    cargando: false,
    error: ''

}

export default (state = INITIAL_STATE, action) => {


    switch (action.type) {
        case LISTAR_CENTROS:
            return {
                ...state,
                centros: action.payload,
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
