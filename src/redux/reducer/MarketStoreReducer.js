import { ADD_SINGLE_ITEM, CLEAR_MARKET, SAVE_ITEMS } from "../action/MarketStoreAction";

const initialState = {
  items: null,
  pagesNumber: 0,
};

const marketStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        pagesNumber: action.payload.numPages,
      };
    case CLEAR_MARKET:
      return {
        ...state,
        items: null,
        pagesNumber: 0,
      };
    case ADD_SINGLE_ITEM:
      return {
        ...state,
        items: !state.items ? [action.payload] : [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default marketStoreReducer;
