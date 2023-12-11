import { errorHandler, fetchGetUser, isLoading } from "./UserAction";

export const SAVE_ITEMS = "SAVE_ITEMS";
export const ADD_PREFERITI = "ADD_PREFERITI";
export const ADD_SINGLE_ITEM = "ADD_SINGLE_ITEM";
export const CLEAR_MARKET = "CLEAR_MARKET";

export const getAllItems = (data, numPages) => ({ type: SAVE_ITEMS, payload: { items: data, numPages: numPages } });
export const addPref = (data) => ({ type: ADD_PREFERITI, payload: data });
export const addOneItem = (data) => ({ type: ADD_SINGLE_ITEM, payload: data });
export const clearMarket = () => ({ type: CLEAR_MARKET, payload: null });

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
      const data = await risp.json();
      if (risp.ok) {
        console.log(data);
        dispatch(getAllItems(data.content, data.totalPages));
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
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

      const data = await risp.json();
      if (risp.ok) {
        dispatch(fetchGetUser(token));
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
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
      const data = await risp.json();
      if (risp.ok) {
        dispatch(fetchGetUser(token));
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};

//------------------Get by categoria---------------------------
export const getByCategoria = (token, page, categoria) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(
        `${process.env.REACT_APP_BASEURL}/items/categoria?categoria=${categoria}&page=${page - 1}`,
        {
          method: "GET",
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await risp.json();
      if (risp.ok) {
        dispatch(getAllItems(data.content, data.totalPages));
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};

//----------------Get single Item----------------------------
export const getSingleItem = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/${id}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        dispatch(addOneItem(data));
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};
