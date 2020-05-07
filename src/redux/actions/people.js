import { API, URL_API } from '../../API/comunicacionApi';
export const GET_ERRORSTORE = 'GET_ERRORSTORE';
export const GET_PERSON = 'GET_USER';
export const GET_TYPEPROFILE = 'GET_TYPEPROFILE';
export const GET_NEXTCONFIG = 'GET_NEXTCONFIG';

export const Person = person => ({
    type: GET_PERSON,
    person
});

export const error = err => ({
    type: GET_ERRORSTORE,
    err
});

export const typeProfile = typeProfile => ({
    type: GET_TYPEPROFILE,
    typeProfile
})

export const nextConfig = nextConfig => ({
    type: GET_NEXTCONFIG,
    nextConfig
})

export const updatePerson = (person,dispatch) => {
    dispatch(Person(person))
}

// export const updateTypeProfile = (type,dispatch) => {
//     dispatch(typeProfile(type))
// }