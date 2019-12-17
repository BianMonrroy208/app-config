/** ==================================================================================================
 * @author     :        Carlos Andrés Cobo <ingeniero.desarrollo020@smarttmt.com>
 * @since      :        28.09.2018
 * @desc       :        El estado inicial de la aplicación esta vacio y redux esta configurado
 * ================================================================================================== */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

// --- Reducers
import configReducer from './Reducers/configReducer';
import userReducer from "./Reducers/userReducer";

const Logger = createLogger()

export default (initialState = {}) => (
   createStore(
      combineReducers({
         config: configReducer,
         login: userReducer,
      }),
      initialState,
      applyMiddleware(
         Logger,
         promiseMiddleware,
         thunk
      )
   )
);