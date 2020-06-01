import { API, URL_API } from '../../API/comunicacionApi';
export const GET_STATE_PASSWORD = 'GET_STATE_PASSWORD';
export const GET_STATE_VEHICULO = 'GET_STATE_VEHICULO';
export const GET_PASSWORD = 'GET_PASSWORD';
export const GET_PASS = "GET_PASS";
export const REGISTRAR ='REGISTRAR'

export const statusPassword = statusPassword => ({
    type: GET_STATE_PASSWORD,
    statusPassword
});

export const statusVehiculo = statusVehiculo => ({
    type: GET_STATE_VEHICULO,
    statusVehiculo
});

export const passWord = passWord => ({
    type: GET_PASSWORD,
    passWord
});

export const pass = pass => ({
    type: "GET_PASS",
    pass
})

export const Registro = Registro =>({
    type: REGISTRAR,
    Registro
})