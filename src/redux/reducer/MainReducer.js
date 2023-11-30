import { ERROR_HANDLER, ERROR_OFF, ERROR_ON, IS_LOADING, MODIFICA_OFF, MODIFICA_ON } from "../action/UserAction";

const initialState = {
  isModify: false,
  hasError: {
    value: false,
    message: "",
  },
  isLoading: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODIFICA_ON:
      return {
        ...state,
        isModify: true,
      };
    case MODIFICA_OFF:
      return {
        ...state,
        isModify: false,
      };
    case ERROR_HANDLER:
      return {
        ...state,
        hasError: {
          value: action.payload.value,
          message: action.payload.message,
        },
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
