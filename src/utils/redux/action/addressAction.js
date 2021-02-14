import * as actionTypes from '../actionTypes';

export const addAddress = (address) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    payload: address,
  };
};
