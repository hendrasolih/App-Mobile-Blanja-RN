import * as actionTypes from '../actionTypes';

export const addBrand = (brand) => {
  return {
    type: actionTypes.ADD_BRAND,
    payload: brand,
  };
};

export const addSize = (size) => {
  return {
    type: actionTypes.ADD_SIZE,
    payload: size,
  };
};

export const addColor = (color) => {
  return {
    type: actionTypes.ADD_COLOR,
    payload: color,
  };
};

export const addCategory = (category) => {
  return {
    type: actionTypes.ADD_CTG,
    payload: category,
  };
};
