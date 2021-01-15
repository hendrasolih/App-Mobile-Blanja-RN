import * as actionTypes from '../actionTypes';

export const login = () => {
  return {
    type: actionTypes.LOGIN,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
