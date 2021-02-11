import * as actionTypes from '../actionTypes';

// `${itemID}-${size}-${size}`

export const addToCart = (
  itemID,
  image,
  price,
  name,
  size,
  color,
  sellerid,
) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      img: image,
      prc: price,
      name: name,
      size: size,
      color: color,
      seller_id: sellerid,
      pick: true,
    },
  };
};

export const plusQty = (id) => {
  return {
    type: actionTypes.PLUS_QTY,
    payload: {
      id,
    },
  };
};

export const minQty = (id) => {
  return {
    type: actionTypes.MIN_QTY,
    payload: {
      id,
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

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};
