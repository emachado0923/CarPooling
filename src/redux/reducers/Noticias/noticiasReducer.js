import {LISTAR_NOTICIAS, CARGANDO, ERROR} from '../../actions/Noticias/noticiasActions'

const INITIAL_STATE = {

    noticias: [],
    cargando: false,
    error: ''

}

export default (state = INITIAL_STATE, action) => {


    switch (action.type) {
        case LISTAR_NOTICIAS:
            return {
                ...state,
                noticias: action.payload,
                cargando: false,
                error: ''
            }
        case CARGANDO:
            return {
                ...state,
                cargando: action.payload,
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
                cargando: false
            }
        default:
            return state
    }
}
