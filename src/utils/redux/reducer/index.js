import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default reducers;
