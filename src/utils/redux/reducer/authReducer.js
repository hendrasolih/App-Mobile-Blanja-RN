import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLogin: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
