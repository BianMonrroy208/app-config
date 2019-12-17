import axios from "axios";
import * as Routes from "./apiRutas";

// --- Constantes con la ruta y el nombre del cliente
const CONFIG = Routes.ROUTES.CONFIG;

/**
 * @desc : Get info Config
 */

function getConfig(client) {
    return axios.get(CONFIG + client )
        .then(res => res.data)
        .catch(err => err)
}

export { getConfig };