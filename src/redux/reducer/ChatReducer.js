import { AGGIUNGI_MESSAGGIO, RESET_CHAT } from "../action/ChatActions";

const initialState = {
  messages: ["Ciao, sono il tuo assistente virtuale come posso aiutarti?"],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGGIUNGI_MESSAGGIO: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    case RESET_CHAT:
      return {
        ...state,
        messages: ["Ciao, sono il tuo assistente virtuale come posso aiutarti?"],
      };
    default:
      return state;
  }
};

export default ChatReducer;
