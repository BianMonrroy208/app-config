import axios from "axios";
import * as Routes from "./apiRutas";

// --- Constantes con la ruta y el nombre del cliente
const CONFIG = Routes.ROUTES.CONFIG;
const CLIENT = 'prueba03'; //cliente con el que se trabaja  la base de datos
const FETCH_TIMEOUT = 10000; //limite de espera 

/**
 * @desc : Es obtiene la configuracion de un cliente puntual
 */
function getConfig() {

    return fetch(CONFIG + CLIENT, {
        method: 'GET'
    })
        .then(res => res.json())

}

export { getConfig };