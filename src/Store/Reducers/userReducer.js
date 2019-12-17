/** =======================================================================================
 * @desc    :  User Store Reducer
 * ======================================================================================= */
import { SET_USER, DEL_USER } from './Actions/actionTypes';

export default (state = {}, action = {}) => {

    switch (action.type) {
 
       case SET_USER:
 
          return action.payload || {};
 
       case DEL_USER:
 
          return action.payload || {}
 
       default:
 
          return state;
    }
 
 };
