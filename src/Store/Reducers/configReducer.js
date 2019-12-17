/** ===========================================================================================
 * @author     :        Carlos Andrés Cobo <ingeniero.desarrollo020@smarttmt.com>
 * @since      :        28.09.2018
 * @desc       :        El reducer correspondiente al trabajo con el store de la configuracion
 * =========================================================================================== */

import { SET_CONFIG, SET_LOCAL_CONFIG} from './Actions/actionTypes';

export default (state = {}, action = {}) => {

   switch (action.type) {
      case SET_CONFIG:

         return action.payload || [];
         
      case SET_LOCAL_CONFIG:

         return action.payload || [];

      default:
         
      return state;
   }

};