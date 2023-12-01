import { ELIMINA_ACCOUNT, ELIMINA_TOKEN, SAVE_TOKEN, USER_LOGOUT, USER_SAVE } from "../action/UserAction";

const initialState = {
  token: "",
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SAVE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        token: "",
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ELIMINA_ACCOUNT:
      return {
        ...state,
        token: "",
        user: null,
      };
    case ELIMINA_TOKEN:
      return {
        ...state,
        token: "",
      };

    default:
      return state;
  }
};

export default userReducer;
