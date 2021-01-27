import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLogin: false,
  token: null,
  id: null,
  level: null,
  name_user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        id: action.payload.id,
        level: action.payload.level,
        name_user: action.payload.nameUser,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: null,
        id: null,
        level: null,
        name_user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
