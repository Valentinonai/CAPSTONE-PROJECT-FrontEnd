import { SAVE_ITEMS } from "../action/MarketStoreAction";

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
    default:
      return state;
  }
};

export default marketStoreReducer;
