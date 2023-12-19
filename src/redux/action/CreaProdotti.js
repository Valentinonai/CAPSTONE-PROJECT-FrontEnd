import { creationErrors, creationMessage } from "./UserAction";

export const creaItem = async (body, dispatch, path, token, image, setLgShow, handleShow, handleShow1) => {
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
      caricaImmagine(image, dispatch, data.id, token, setLgShow, handleShow, handleShow1);
    } else throw new Error(data.message ? data.message : data.errorsList);
  } catch (error) {
    dispatch(creationErrors(true, error.message));
    handleShow();
    setLgShow(false);
  }
};

export const caricaImmagine = async (image, dispatch, id, token, setLgShow, handleShow, handleShow1) => {
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
        console.log("SALVATO IMMAGINE PRESENTE");
        dispatch(creationMessage(true, "Elemento salvato con successo"));
        handleShow1();
        setLgShow(false);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(creationErrors(true, error.message));
      handleShow();
      setLgShow(false);
    }
  } else {
    console.log("SALVATO IMMAGINE NON PRESENTE");
    dispatch(creationMessage(true, "Elemento salvato con successo"));
    handleShow1();
    setLgShow(false);
  }
};
