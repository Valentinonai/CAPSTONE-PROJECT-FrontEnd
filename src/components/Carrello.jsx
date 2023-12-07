import { Alert, Button, Col, ListGroup, ListGroupItem, Modal, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import CarrelloSingleItem from "./CarrelloSingleItem";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { clearAll } from "../redux/action/BuildActions";
import CarrelloSingleBuild from "./CarrelloSingleBuild";
import { errorHandler, messageHandler } from "../redux/action/UserAction";
import { clearCart } from "../redux/action/CarrelloActions";

const Carrello = () => {
  const carrelloItems = useSelector((state) => state.carrelloReducer.items);
  const carrelloBuildes = useSelector((state) => state.carrelloReducer.builds);
  // eslint-disable-next-line no-unused-vars
  const tot = useSelector((state) => state.carrelloReducer.totale);
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const [buildsNonOrdinate, setBuildsNonOrdinate] = useState();
  const [itemsNonOrdinati, setItemsNonOrdinati] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();
  const calcolaTot = () => {
    let tot = 0;
    for (let i = 0; i < carrelloItems.length; i++) tot = tot + carrelloItems[i].item.prezzo * carrelloItems[i].quantita;
    for (let i = 0; i < carrelloBuildes.length; i++) tot = tot + carrelloBuildes[i].prezzo;
    return tot;
  };
  const salvaOrdine = async (builds_id, items_id) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/ordini/me`, {
        method: "POST",
        body: JSON.stringify({ builds_id: builds_id, items_id: items_id }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        if (
          (data.build_list === undefined || data.build_list.length === 0) &&
          (data.items_List === undefined || data.items_List.length === 0)
        ) {
          dispatch(messageHandler(true, "Ordine effettuato correttamente"));
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            dispatch(messageHandler(false, ""));
            dispatch(clearCart());
            nav("/");
          }, 2000);
        } else {
          setBuildsNonOrdinate(data.build_list);
          setItemsNonOrdinati(data.items_list);
          setLgShow(true);
        }
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  const creaOrdine = () => {
    if (user.cartaDiCredito === null || user.indirizzoDiSpedizione === null) {
      handleShow();
    } else {
      const builds_id = [];
      const items_id = [];
      carrelloBuildes.forEach((elem) => builds_id.push(elem.id));
      for (let i = 0; i < carrelloItems.length; i++) {
        for (let j = 0; j < carrelloItems[i].quantita; j++) items_id.push(carrelloItems[i].item.id);
      }
      salvaOrdine(builds_id, items_id);
    }
  };
  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      <div id="carrello" className="m-3 p-1 mt-5">
        <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
          CART
        </p>
        <ListGroup>
          <ListGroup.Item
            style={{ backgroundColor: "transparent", border: "1px solid grey" }}
            className="rounded my-1 py-3"
          >
            <Row className="align-items-center">
              <Col xs={1} className="d-none d-md-block">
                {" "}
                <p>N°</p>
              </Col>
              <Col xs={5} sm={5} md={4}>
                {" "}
                <p>Nome</p>
              </Col>
              <Col xs={2} className="d-none d-sm-block">
                {" "}
                <p>Prezzo</p>
              </Col>
              <Col xs={2} className="d-none d-md-block">
                {" "}
                <p>Categoria</p>
              </Col>
              <Col xs={5} sm={4} md={2}>
                {" "}
                <p>Quantità</p>
              </Col>
              <Col xs={2} sm={1}>
                <Trash />
              </Col>
            </Row>
          </ListGroup.Item>
          {carrelloItems.length === 0 && carrelloBuildes.length === 0 ? (
            <p className="text-center mt-4">Nessun elemento nel carrello</p>
          ) : (
            carrelloItems.length > 0 &&
            carrelloItems.map((elem, index) => (
              <ListGroupItem
                key={`carrelloItem-${index}`}
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <CarrelloSingleItem elem={elem} index={index} />
              </ListGroupItem>
            ))
          )}
          {carrelloBuildes.length > 0 &&
            carrelloBuildes.map((elem, index) => (
              <ListGroupItem
                key={`carrelloItem-${index}`}
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <CarrelloSingleBuild elem={elem} index={index} />
              </ListGroupItem>
            ))}
        </ListGroup>
        {(carrelloItems.length > 0 || carrelloBuildes.length > 0) && (
          <div>
            <p className="h2 d-flex justify-content-end mt-4 me-3">Totale: {calcolaTot().toFixed(2)}€</p>
          </div>
        )}

        {(carrelloItems.length > 0 || carrelloBuildes.length > 0) && (
          <div className=" mt-5 ">
            {" "}
            <Button
              variant="outline-secondary"
              className="w-100 "
              onClick={() => {
                creaOrdine();
              }}
            >
              <span className="fs-4">Ordina</span>
            </Button>
          </div>
        )}
      </div>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ATTENZIONE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Alcuni dati fondamentali per l'acuisto di un ordine come indirizzo di spedizione o metodo di pagamento sono
          mancanti
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              nav("/settings");
            }}
          >
            Settings
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => {
          setLgShow(false);
          dispatch(clearCart());
          nav("/");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Ordine incompleto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            L'ordine è stato processato correttamente ma alcuni elementi non sono stati accettati dal momento che le
            quantità scelte eccedono le nostre scorte a magazzino
          </p>
          {buildsNonOrdinate && buildsNonOrdinate.length > 0 && (
            <>
              <h4>Build non ordinate:</h4>
              <ListGroup>
                {buildsNonOrdinate.map((elem, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>Build n°{elem.id}</Col>
                      <Col>{elem.prezzo.toFixed(2)}€</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
          {itemsNonOrdinati && itemsNonOrdinati.length > 0 && (
            <>
              <h4>Items non ordinati:</h4>
              <ListGroup>
                {itemsNonOrdinati.map((elem, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>Items n°{elem.id}</Col>
                      <Col>{elem.prezzo.toFixed(2)}€</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Carrello;
