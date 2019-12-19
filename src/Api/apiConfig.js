import axios from "axios";
import * as Routes from "./apiRutas";

// --- Constantes con la ruta y el nombre del cliente
const CONFIG = Routes.ROUTES.CONFIG;
const UPCONFIG = Routes.ROUTES.UPCONFIG;

const HEADERS = {
    headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
    }
}

/**
 * @desc : Get info Config
 */

function getConfig(client) {
    return axios.get(CONFIG + client )
        .then(res => res.data)
        .catch(err => err)
}

/**
 * @desc : Update Config
 */

function updateConfig(config) {
    console.log(config)
    return axios.post(UPCONFIG, config, HEADERS)
        .then(res => res.data)
        .catch(err => err)
}

export { getConfig, updateConfig };