import * as actionTypes from '../actionTypes';

export const addToCart = (itemID, image, price, name) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      img: image,
      prc: price,
      name: name,
    },
  };
};
