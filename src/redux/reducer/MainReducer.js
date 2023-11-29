import { MODIFICA_OFF, MODIFICA_ON } from "../action/UserAction";

const initialState = {
  isModify: false,
};

const MainReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default MainReducer;
