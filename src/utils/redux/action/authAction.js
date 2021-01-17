import * as actionTypes from '../actionTypes';

export const login = (token, id, level) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      token: token,
      id: id,
      level: level,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
