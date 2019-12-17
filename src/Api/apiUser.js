import axios from "axios";
import * as Routes from "./apiRutas";

const LOGIN = Routes.ROUTES.LOGIN;

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

export { getLogin };