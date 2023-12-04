export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";
export const MODIFY_QT = "MODIFY_QT";
export const CLEAR_CART = "CLEAR_CART";

export const addCarrello = (item, q) => ({ type: ADD_CART, payload: { item: item, quantita: q } });
export const modifyQt = (item, q) => ({ type: MODIFY_QT, payload: { item: item, quantita: q } });
export const removeCarrello = (item) => ({ type: REMOVE_CART, payload: item });
export const clearCart = (item) => ({ type: CLEAR_CART, payload: null });
