import { GET_ERRORSTORE, GET_PERSON ,GET_TYPEPROFILE, GET_NEXTCONFIG} from '../actions/people'


export default (state = {person:{}, nextConfig:1 }, action) => {
    switch (action.type) {
        case GET_ERRORSTORE:
            return { ...state, err: action.err }

        case GET_PERSON:
            return { ...state, person: action.person }

        case GET_TYPEPROFILE:
            return { ...state, typeProfile: action.typeProfile }

        case GET_NEXTCONFIG:
            return { ...state, nextConfig: action.nextConfig }

        default:
            return state;
    }
}