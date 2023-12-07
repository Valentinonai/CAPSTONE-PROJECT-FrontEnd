import { SAVE_INDIRIZZO } from "../action/UserAction";

const initialState = {
  indirizzo: null,
};

const indirizzoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INDIRIZZO:
      return {
        ...state,
        indirizzo: action.payload,
      };

    default:
      return state;
  }
};

export default indirizzoReducer;
