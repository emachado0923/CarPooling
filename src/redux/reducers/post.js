import { GET_ERROR, GET_RESPUESTA, GET_POST } from './../actions/post'


export default (state = { estado : false }, action) => {
    switch (action.type) {
        case GET_POST:
            return { ...state, datos: action.datos }

        case GET_RESPUESTA:
            return { ...state, resp: action.resp }

        case GET_ERROR:
            return { ...state, err: action.err }

        default:
            return state;
    }
}