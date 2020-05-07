import { JWT, CARGANDO, GET_ERRORSTORE, GET_USER } from '../actions/services'


export default (state = { jwt: false, stateLoading: true, user:{} }, action) => {
    switch (action.type) {
        case CARGANDO:
            return { ...state, stateLoading: action.stateLoading }

        case JWT:
            return { ...state, jwt: action.jwt }

        case GET_ERRORSTORE:
            return { ...state, err: action.err }

        case GET_USER:
            return { ...state, user: action.user }

        default:
            return state;
    }
}