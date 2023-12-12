import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Pencil, Save } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorHandler, messageHandler } from "../redux/action/UserAction";

const SingleItemAdmin = ({ elem, getAllItems, p }) => {
  const nav = useNavigate();
  const [modifica, setModifica] = useState(false);
  const [q, setQ] = useState(elem.quantità);
  const [prezzo, setPrezzo] = useState(elem.prezzo);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const goToItemDettagli = () => {
    nav(`/dettaglio/${elem.id}`);
  };
  const salvaQuantita = async () => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/modifica_quantità/${elem.id}`, {
        method: "PUT",
        body: JSON.stringify({ quantita: q }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        await salvaPrezzo();
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(messageHandler(true, "Prodotto aggiornato"));
        setTimeout(() => {
          dispatch(messageHandler(false, ""));
          getAllItems(p);
        }, 2000);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  const salvaPrezzo = async () => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/modifica_prezzo/${elem.id}`, {
        method: "PUT",
        body: JSON.stringify({ prezzo: prezzo }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  useEffect(() => {
    setQ(elem.quantità);
    setPrezzo(elem.prezzo);
  }, [elem]);
  return (
    <>
      {elem && (
        <Row className="g-4">
          <Col xs={8} sm={4}>
            <div
              className="buttonClick"
              onClick={() => {
                goToItemDettagli();
              }}
            >
              {" "}
              <p>{elem.nome}</p>
            </div>
          </Col>

          <Col xs={4} sm={4}>
            <div>
              {modifica ? (
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Control
                    required
                    type="number"
                    placeholder="Prezzo"
                    defaultValue={prezzo}
                    width={"100%"}
                    onChange={(e) => {
                      setPrezzo(e.target.value);
                    }}
                  />
                </Form.Group>
              ) : (
                <p>{elem.prezzo.toFixed(2)}€</p>
              )}
            </div>
          </Col>
          <Col xs={8} sm={3}>
            <div>
              {" "}
              {modifica ? (
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Control
                    required
                    type="number"
                    placeholder="Q"
                    defaultValue={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                    }}
                  />
                </Form.Group>
              ) : (
                <p>{elem.quantità}</p>
              )}
            </div>
          </Col>
          <Col xs={4} sm={1}>
            <div>
              {modifica ? (
                <Save
                  onClick={() => {
                    setModifica(false);
                    salvaQuantita();
                  }}
                  style={{ cursor: "pointer" }}
                  className="buttonClick"
                />
              ) : (
                <Pencil
                  onClick={() => {
                    setModifica(true);
                  }}
                  style={{ cursor: "pointer" }}
                  className="buttonClick"
                />
              )}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SingleItemAdmin;
