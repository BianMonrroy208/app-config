import {
    SET_CONFIG,
    SET_LOCAL_CONFIG,
    SET_USER,
    DEL_USER,
    SET_OPTION
} from './actionTypes';

import { apiConfig } from '../../../Api';



/** =======================================================================================
 * @desc    :  Set config on redux
 * ======================================================================================= */
const setConfig = (client) => ({
    type: SET_CONFIG,
    payload: apiConfig.getConfig(client)
        .then(res => res)
});


/** =======================================================================================
 * @desc    :  Set local config on redux
 * ======================================================================================= */
const setLocalConfig = (localConfig) => ({
    type: SET_LOCAL_CONFIG,
    payload: localConfig
});

/** =======================================================================================
 * @desc    :  Set user on Redux
 * ======================================================================================= */
const setUser = newUser => ({
    type: SET_USER,
    payload: newUser
})

/** =======================================================================================
 * @desc    :  Delete user on redux
 * ======================================================================================= */
const delUser = () => ({
    type: DEL_USER,
    payload: {}
});

const setOption = newOption => ({
    type: SET_OPTION,
    payload: newOption
})

export {
    setConfig,
    setLocalConfig,
    setUser,
    delUser,
    setOption
};