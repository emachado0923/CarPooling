import axios from 'axios';

const URL_API = "http://192.168.1.2:3001"; 
const AXIOS = axios.create({ timeout: 5000 });

class AP {

    async GET(link) {
        var pet;
        if (link[0].length > 1) {
            pet = [];
            link.forEach(link => {
                pet.push(AXIOS.get(`${URL_API}/${link}`));
            });
        } else {
            pet = await AXIOS.get(link)
                .then((resp) => {
                    return resp;
                });
        }
        return pet;
    }
    async POST(url, datos, config = {}) {
        return await AXIOS.post(url, datos, config)
            .then((resp) => {
                return resp;
            });
    }

    async PUT(url, datos, config = {}) {
        return await AXIOS.put(url, datos, config)
            .then((resp) => {
                return resp;
            });
    }

    async DEL(url) {
        return await AXIOS.delete(url)
            .then((resp) => {
                return resp;
            });
    }

    async AUTH(link, token) {
        AXIOS.defaults.headers.common = { 'Authorization': `bearer ${token}` }
        var pet;
        pet = await AXIOS.get(link)
            .then((resp) => {
                return resp;
            });
        return pet;
    }
}

const API = new AP();

export {
    API,
    URL_API
}