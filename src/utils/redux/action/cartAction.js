import {color} from 'react-native-reanimated';
import * as actionTypes from '../actionTypes';

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
    },
  };
};
