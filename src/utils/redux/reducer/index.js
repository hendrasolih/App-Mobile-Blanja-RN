import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import authReducer from './authReducer';
import filterReducer from './filterReducer';
import addressReducer from './addressReducer';

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  filter: filterReducer,
  address: addressReducer,
});

export default reducers;
