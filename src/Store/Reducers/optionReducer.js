/** =======================================================================================
 * @desc    :  Options Store Reducer
 * ======================================================================================= */
import { SET_OPTION } from './Actions/actionTypes';

export default (state = {}, action = {}) => {

    switch (action.type) {
 
       case SET_OPTION:
 
          return action.payload || {};
       default:
 
          return state;
    }
 
 };
