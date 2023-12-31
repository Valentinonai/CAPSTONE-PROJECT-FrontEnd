import { IS_LOADING_CHAT } from "../action/ChatActions";
import {
  CREATION_ERRORS,
  CREATION_MESSAGE,
  ERROR_HANDLER,
  IS_LOADING,
  MESSAGE_HANDLER,
  MODIFICA_OFF,
  MODIFICA_ON,
} from "../action/UserAction";

const initialState = {
  isModify: false,
  hasError: {
    value: false,
    message: "",
  },
  creationErrors: {
    value: false,
    message: "",
  },
  isLoading: false,

  hasMessage: {
    value: false,
    message: "",
  },
  creationMessage: {
    value: false,
    message: "",
  },
  isLoadingChat: false,
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
    case CREATION_ERRORS:
      return {
        ...state,
        creationErrors: {
          value: action.payload.value,
          message: action.payload.message,
        },
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case MESSAGE_HANDLER:
      return {
        ...state,
        hasMessage: {
          value: action.payload.value,
          message: action.payload.message,
        },
      };
    case CREATION_MESSAGE:
      return {
        ...state,
        creationMessage: {
          value: action.payload.value,
          message: action.payload.message,
        },
      };
    case IS_LOADING_CHAT:
      return {
        ...state,
        isLoadingChat: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
