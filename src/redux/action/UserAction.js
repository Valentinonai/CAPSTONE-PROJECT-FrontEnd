export const USER_SAVE = "USER_SAVE";
export const USER_LOGOUT = "USERLOGOUT";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const MODIFICA_ON = "MODIFICA_ON";
export const MODIFICA_OFF = "MODIFICA_OFF";
export const ERROR_HANDLER = "ERROR_HANDLER";
export const SAVE_INDIRIZZO = "SAVE_INDIRIZZO";
export const SAVE_CARTA = "SAVE_CARTA";
export const IS_LOADING = "IS_LOADING";
export const ELIMINA_ACCOUNT = "ELIMINA_ACCOUNT";
export const ELIMINA_TOKEN = "ELIMINA_TOKEN";

export const userSave = (data) => ({ type: USER_SAVE, payload: data });
export const userLogout = (data) => ({ type: USER_LOGOUT, payload: null });
export const saveToken = (token) => ({ type: SAVE_TOKEN, payload: token });
export const modificaOn = () => ({ type: MODIFICA_ON, payload: true });
export const modificaOff = () => ({ type: MODIFICA_OFF, payload: false });
export const errorHandler = (value, message) => ({ type: ERROR_HANDLER, payload: { value: value, message: message } });
export const salvaIndirizzo = (data) => ({ type: SAVE_INDIRIZZO, payload: data });
export const salvaCarta = (data) => ({ type: SAVE_CARTA, payload: data });
export const isLoading = (value) => ({ type: IS_LOADING, payload: value });
export const eliminaUser = () => ({ type: ELIMINA_ACCOUNT, payload: null });
export const eliminaToken = () => ({ type: ELIMINA_TOKEN, payload: null });

//---------------------------------Get user---------------------------
export const fetchGetUser = (token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/me`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(userSave(data));
        console.log("USER: ", data);
      } else throw new Error(risp.message);
    } catch (error) {
      dispatch(eliminaToken());
      console.log(error.message);
    }
  };
};
//---------------------------------SignUp-------------------------------------------
export const signupFetch = (nome, cognome, email, password, nav, image) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ nome: nome, cognome: cognome, email: email, password: password }),
        headers: {
          "content-type": "Application/json",
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(saveToken(data.token));
        dispatch(fetchGetUser(data.token));
        dispatch(uploadUserImg(image, data.token));
        nav("/");
      } else throw new Error("Utente non creato");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};
//---------------------------------Upload immagine user--------------------------------
export const uploadUserImg = (image, token) => {
  return async (dispatch) => {
    if (image) {
      dispatch(isLoading(true));
      const formImg = new FormData();
      formImg.append("user_img", image);
      try {
        const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/carica_immagine/me`, {
          method: "PUT",
          body: formImg,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (risp.ok) {
          const data = await risp.json();
          dispatch(fetchGetUser(token));
          dispatch(isLoading(false));
        } else throw new Error(risp.status);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
};

//-----------------------------Modifica settings user--------------------------------

export const modificaPasswordUtente = (password, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/me`, {
        method: "PUT",
        body: JSON.stringify({ password: password }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(userSave(data));
        dispatch(fetchGetUser(token));
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};

//---------------------Crea Indirizzo--------------------------

export const creaIndirizzo = (indirizzo, token) => {
  return async (dispatch) => {
    console.log(indirizzo);
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/indirizzi/me`, {
        method: "POST",
        body: JSON.stringify(indirizzo),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(salvaIndirizzo(data));
        dispatch(fetchGetUser(token));
      } else throw new Error("Indirizzo non creato (tutti i campi sono obbligatori)");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};

//-------------------------Modifica Indirizzo---------------------------

export const modificaIndirizzo = (indirizzo, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/indirizzi/modifica_indirizzo/me`, {
        method: "PUT",
        body: JSON.stringify(indirizzo),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(salvaIndirizzo(data));
        dispatch(fetchGetUser(token));
      } else throw new Error("Indirizzo non modificato");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};
//---------------------Crea Carta di credito--------------------------

export const creaCarta = (carta, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/carte_di_credito/me`, {
        method: "POST",
        body: JSON.stringify(carta),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(salvaCarta(data));
        dispatch(fetchGetUser(token));
      } else throw new Error("Metodo di pagamento non creato (tutti i campi sono obbligatori)");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};

//-------------------------Modifica Carta di credito---------------------------

export const modificaCarta = (carta, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/carte_di_credito/modifica_carta/me`, {
        method: "PUT",
        body: JSON.stringify(carta),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        dispatch(salvaCarta(data));
      } else throw new Error("Metodo di pagamento non modificato");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};

//----------------------------------Elimina account------------------------------------

export const eliminaAccount = (token, nav) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/elimina/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(risp);
      if (risp.ok) {
        console.log("here");
        dispatch(eliminaUser());
        dispatch(errorHandler(true, "Account eliminato"));
        setTimeout(() => {
          dispatch(errorHandler(false, ""));
          nav("/");
        }, 2000);
      } else throw new Error("Utente non eliminato");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
};
