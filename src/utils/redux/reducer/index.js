import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import authReducer from './authReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  filter: filterReducer,
});

export default reducers;
