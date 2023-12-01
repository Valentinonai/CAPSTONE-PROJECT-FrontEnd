import { fetchGetUser, isLoading } from "./UserAction";

export const SAVE_ITEMS = "SAVE_ITEMS";
export const ADD_PREFERITI = "ADD_PREFERITI";

export const getAllItems = (data, numPages) => ({ type: SAVE_ITEMS, payload: { items: data, numPages: numPages } });
export const addPref = (data) => ({ type: ADD_PREFERITI, payload: data });

//--------------------------Get all items------------------------------------

export const getAll = (token, page) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/get_attivi?page=${page - 1}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        console.log(data);
        dispatch(getAllItems(data.content, data.totalPages));
        dispatch(isLoading(false));
      } else throw new Error(risp.message);
    } catch (error) {
      console.log(error.message);
    }
  };
};

//---------------------------Aggiungi preferiti---------------------------------------

export const aggiungiPreferiti = (elem, token) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/aggiungi_preferiti/me?item_id=${elem}`, {
        method: "PUT",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (risp.ok) {
        const data = await risp.json();
        dispatch(fetchGetUser(token));
        dispatch(isLoading(false));
      } else throw new Error(risp.message);
    } catch (error) {
      console.log(error.message);
    }
  };
};
//---------------------------Rimuovi preferiti---------------------------------------

export const rimuoviPreferiti = (elem, token) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/rimuovi_preferiti/me?item_id=${elem}`, {
        method: "PUT",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(fetchGetUser(token));
        dispatch(isLoading(false));
      } else throw new Error(risp.message);
    } catch (error) {
      console.log(error.message);
    }
  };
};
