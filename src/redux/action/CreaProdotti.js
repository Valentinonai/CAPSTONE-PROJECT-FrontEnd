import { errorHandler, messageHandler } from "./UserAction";

export const creaSchedaMadre = async (body, dispatch, path, token, image) => {
  console.log(`${process.env.REACT_APP_BASEURL}/items/${path.toLowerCase()}`);
  try {
    const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/${path.toLowerCase()}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await risp.json();
    if (risp.ok) {
      caricaImmagine(image, dispatch, data.id, token);
    } else throw new Error(data.message);
  } catch (error) {
    dispatch(errorHandler(true, error.message));
    setTimeout(() => {
      dispatch(errorHandler(false, ""));
    }, 2000);
  }
};

export const caricaImmagine = async (image, dispatch, id, token) => {
  if (image) {
    const formImg = new FormData();
    formImg.append("item_img", image);
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/carica_img/${id}`, {
        method: "PUT",
        body: formImg,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = risp.json();
      if (risp.ok) {
        dispatch(messageHandler(true, "Elemento salvato con successo"));
        setTimeout(() => {
          dispatch(messageHandler(false, ""));
        }, 2000);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  }
};
