export const USER_SAVE = "USER_SAVE";
export const USER_LOGOUT = "USERLOGOUT";
export const SAVE_TOKEN = "SAVE_TOKEN";

export const userSave = (data) => ({ type: USER_SAVE, payload: data });
export const userLogout = (data) => ({ type: USER_LOGOUT, payload: null });
export const saveToken = (token) => ({ type: SAVE_TOKEN, payload: token });

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
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};
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
        console.log(data);
        dispatch(saveToken(data.token));
        dispatch(uploadUserImg(image, data.token));
        nav("/");
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};
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
