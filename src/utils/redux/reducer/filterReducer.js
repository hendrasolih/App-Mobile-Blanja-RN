import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  brand: [],
  size: [],
  color: [],
  category: [],
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_BRAND:
      const item = action.payload;
      const inBrand = state.brand.includes(item);
      return {
        ...state,
        brand: inBrand
          ? state.brand.filter((brand) => brand !== item)
          : [...state.brand, item],
      };
    case actionTypes.ADD_COLOR:
      const itemColor = action.payload;
      const inColor = state.color.includes(itemColor);
      return {
        ...state,
        color: inColor
          ? state.color.filter((color) => color !== itemColor)
          : [...state.color, itemColor],
      };
    case actionTypes.ADD_SIZE:
      const itemSize = action.payload;
      const inSize = state.size.includes(itemSize);
      return {
        ...state,
        size: inSize
          ? state.size.filter((size) => size !== itemSize)
          : [...state.size, itemSize],
      };
    case actionTypes.ADD_CTG:
      const itemCtg = action.payload;
      const inCtg = state.category.includes(itemCtg);
      return {
        ...state,
        category: inCtg
          ? state.category.filter((ctg) => ctg !== itemCtg)
          : [...state.category, itemCtg],
      };
    default:
      return state;
  }
};

export default filterReducer;
