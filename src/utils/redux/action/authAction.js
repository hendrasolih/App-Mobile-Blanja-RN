import * as actionTypes from '../actionTypes';

export const login = (token, id, level, name) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      token: token,
      id: id,
      level: level,
      nameUser: name,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
