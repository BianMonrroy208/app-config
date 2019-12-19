import axios from "axios";
import * as Routes from "./apiRutas";

const OPTION = Routes.ROUTES.OPTION;
const UPOPTION = Routes.ROUTES.UPOPTION;
const DELOPTION = Routes.ROUTES.DELOPTION;
const CREATEOPTION = Routes.ROUTES.CREATEOPTION;



const HEADERS = {
    headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
    }
}
/**
 * @desc : Get Options
 */
function getOptions(client, type) {
    return axios.get(`${OPTION}/${client}/${type}`).then(res => res.data)
    .catch(err => err);
}

/**
 * @desc : Update Option
 */
function updateOptions(option) {
    return axios.post(UPOPTION, JSON.stringify(option), HEADERS).then(res => res.data)
    .catch(err => err);
}

/**
 * @desc : Delete Option
 */
function delOption(id) {
    return axios.delete(`${DELOPTION}/${id}`, HEADERS).then(res => res.data)
    .catch(err => err);
}

/**
 * @desc : Create Option
 */
function createOption(option) {
    const newOption = {
        "address": option.address,
        "cliename": option.cliename,
        "email": option.email,
        "latitude": parseFloat(option.latitude),
        "longitud": parseFloat(option.longitud),
        "name": option.name,
        "offiHour": option.offiHour,
        "phone": option.phone,
        "typesucu": option.typesucu
    }
    return axios.post(CREATEOPTION, JSON.stringify(newOption), HEADERS).then(res => res.data)
    .catch(err => err);
}


export { getOptions, updateOptions, delOption, createOption };

