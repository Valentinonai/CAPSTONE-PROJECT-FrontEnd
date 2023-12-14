import { errorHandler, messageHandler } from "./UserAction";

export const creaItem = async (body, dispatch, path, token, image, setLgShow) => {
  console.log(body);
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
      caricaImmagine(image, dispatch, data.id, token, setLgShow);
    } else throw new Error(data.message ? data.message : data.errorsList);
  } catch (error) {
    dispatch(errorHandler(true, error.message));
    setTimeout(() => {
      dispatch(errorHandler(false, ""));
      setLgShow(false);
    }, 2000);
  }
};

export const caricaImmagine = async (image, dispatch, id, token, setLgShow) => {
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
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(messageHandler(true, "Elemento salvato con successo"));
        setTimeout(() => {
          dispatch(messageHandler(false, ""));
          setLgShow(false);
        }, 2000);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(messageHandler(true, "Elemento salvato con successo"));
    setTimeout(() => {
      dispatch(messageHandler(false, ""));
      setLgShow(false);
    }, 2000);
  }
};
