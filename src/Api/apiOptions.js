import axios from "axios";
import * as Routes from "./apiRutas";

const OPTION = Routes.ROUTES.OPTION;

/**
 * @desc : Get info user
 */
function getOptions(client, type) {
    return axios.get(`${OPTION}/${client}/${type}`).then(res => res.data)
    .catch(err => err);
}

export { getOptions };