import { MODIFICA_OFF, MODIFICA_ON, SAVE_TOKEN, USER_LOGOUT, USER_SAVE } from "../action/UserAction";

const initialState = {
  token: "",
  user: null,
};

const UserReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default UserReducer;
