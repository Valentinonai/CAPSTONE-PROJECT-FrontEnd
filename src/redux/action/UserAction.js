export const USER_SAVE = "USER_SAVE";
export const USER_LOGOUT = "USERLOGOUT";

export const userSave = (data) => ({ type: USER_SAVE, payload: data });
export const userLogout = (data) => ({ type: USER_LOGOUT, payload: null });

export const fetchGetUser = (token) => {
  return async (dispatch) => {
    const t = `Bearer ${token}`;
    console.log("SONO QUI");
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/me`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(risp);
      if (risp.ok) {
        const data = await risp.json();
        dispatch(userSave(data));
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};
