import { errorHandler } from "./UserAction";

export const AGGIUNGI_MESSAGGIO = "AGGIUNGI_MESSAGGIO";
export const IS_LOADING_CHAT = "IS_LOADING_CHAT";
export const RESET_CHAT = "RESET_CHAT";

export const aggiungiMessaggio = (message) => ({ type: AGGIUNGI_MESSAGGIO, payload: message });
export const isLoadingChat = (value) => ({ type: IS_LOADING_CHAT, payload: value });
export const resetChat = (value) => ({ type: RESET_CHAT, payload: "" });

export const ottieniRisposta = (message, token, thread) => {
  return async (dispatch) => {
    try {
      dispatch(isLoadingChat(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/chat/${thread}`, {
        method: "POST",
        body: JSON.stringify({ messaggio: message }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        dispatch(aggiungiMessaggio(data.messaggio));
        dispatch(isLoadingChat(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};
