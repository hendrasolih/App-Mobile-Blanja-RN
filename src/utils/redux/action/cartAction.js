import * as actionTypes from '../actionTypes';

// `${itemID}-${size}-${size}`

export const addToCart = (itemID, image, price, name, size, color) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      img: image,
      prc: price,
      name: name,
      size: size,
      color: color,
      pick: true,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const pickCart = (id) => {
  return {
    type: actionTypes.PICK_CART,
    payload: {
      id,
    },
  };
};

// export const unpickCart = () => {
//   return {
//     type: actionTypes.UNPICK_CART,
//   };
// };
