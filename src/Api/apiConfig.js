import axios from "axios";
import * as Routes from "./apiRutas";

// --- Constantes con la ruta y el nombre del cliente
const CONFIG = Routes.ROUTES.CONFIG;
const CLIENT = 'prueba03'; //cliente con el que se trabaja  la base de datos
//const FETCH_TIMEOUT = 10000; //limite de espera 
const LOGIN = Routes.ROUTES.LOGIN;
/**
 * @desc : Get info Config
 */
function getConfig() {
    return axios.get(CONFIG + CLIENT)
        .then(res => res.json())
}

/**
 * @desc : Get info user
 */
function getLogin(user, pass) {
    return axios.post(LOGIN, {
        "password": pass,
        "username": user
    }).then(res => res.data)
    .catch(err => err);
}

export { getConfig, getLogin };