import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      console.log(action.payload.id);
      const item = action.payload;
      console.log(state);
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false,
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? {...item, qty: item.qty + 1}
                : item,
            )
          : [...state.cart, {...item, qty: 1}],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.PICK_CART:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? {...item, pick: !item.pick} : item,
        ),
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.pick == false),
      };
    case actionTypes.PLUS_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? {...item, qty: item.qty + 1} : item,
        ),
      };
    case actionTypes.MIN_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {...item, qty: item.qty === 0 ? item.qty : item.qty - 1}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
