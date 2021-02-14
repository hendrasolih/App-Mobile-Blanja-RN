import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  address: null,
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
