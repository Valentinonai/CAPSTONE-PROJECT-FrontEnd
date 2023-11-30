import { SAVE_CARTA } from "../action/UserAction";

const initialState = {
  cartaDiCredito: null,
};

const cartaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CARTA:
      return {
        ...state,
        cartaDiCredito: action.payload,
      };

    default:
      return state;
  }
};

export default cartaReducer;
