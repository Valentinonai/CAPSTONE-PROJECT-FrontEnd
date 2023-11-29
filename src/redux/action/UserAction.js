export const USER_SAVE = "USER_SAVE";
export const USER_LOGOUT = "USERLOGOUT";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const MODIFICA_ON = "MODIFICA_ON";
export const MODIFICA_OFF = "MODIFICA_OFF";
export const ERROR_HANDLER = "ERROR_HANDLER";

export const userSave = (data) => ({ type: USER_SAVE, payload: data });
export const userLogout = (data) => ({ type: USER_LOGOUT, payload: null });
export const saveToken = (token) => ({ type: SAVE_TOKEN, payload: token });
export const modificaOn = () => ({ type: MODIFICA_ON, payload: true });
export const modificaOff = () => ({ type: MODIFICA_OFF, payload: false });
export const errorHandler = (value, message) => ({ type: ERROR_HANDLER, payload: { value: value, message: message } });

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
      } else throw new Error(risp.message);
    } catch (error) {
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
      } else throw new Error(risp.status);
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
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};
