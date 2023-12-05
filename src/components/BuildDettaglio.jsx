import { useDispatch, useSelector } from "react-redux";
import "../style/Build.css";
import Footer from "./Footer";
import { Alert, Button, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";
import pc from "../assets/pcCustom.jpg";
import { useNavigate } from "react-router-dom";
import { clearAll } from "../redux/action/BuildActions";
import { useEffect, useState } from "react";
import { errorHandler, messageHandler } from "../redux/action/UserAction";

const BuildDettaglio = () => {
  const user = useSelector((state) => state.userReducer.user);
  const build = useSelector((state) => state.buildReducer);
  const token = useSelector((state) => state.userReducer.token);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const salvaBuild = async () => {
    const mybuild = [
      build.scheda_madre.id,
      build.cpu.id,
      build.ram.id,
      build.case.id,
      build.scheda_grafica.id,
      build.hard_disk.id,
      build.ventole.id,
      build.alimentatore.id,
    ];
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/builds/me`, {
        method: "POST",
        body: JSON.stringify({ items_id: mybuild }),
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        dispatch(messageHandler(true, "Build salvata con successo"));
        setTimeout(() => {
          dispatch(messageHandler(false, ""));
          nav("/build");
        }, 2000);
      } else throw new Error("Build non salvata");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {!user && <h4 className="text-center my-5">Effettua il login per accedere alla sezione build your pc</h4>}
      {user && build.scheda_madre && (
        <>
          <div className="mt-5 mx-2 mx-md-5 pb-5" id="buildHero">
            <p className=" h1 ms-2 ms-md-4 mb-5 mt-4" style={{ fontWeight: "bold", fontSize: "60px" }}>
              LA TUA BUILD
            </p>
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.scheda_madre.id}`);
                      }}
                    >
                      {build.scheda_madre.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_madre.marca}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_madre.categoria}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_madre.prezzo}€
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.cpu.id}`);
                      }}
                    >
                      {build.cpu.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.cpu.marca}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.cpu.categoria}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.cpu.prezzo}€</div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick "
                      onClick={() => {
                        nav(`/dettaglio/${build.ram.id}`);
                      }}
                    >
                      {build.ram.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.ram.marca}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.ram.categoria}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.ram.prezzo}€</div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.case.id}`);
                      }}
                    >
                      {build.case.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.case.marca}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.case.categoria}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.case.prezzo}€</div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.scheda_grafica.id}`);
                      }}
                    >
                      {build.scheda_grafica.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_grafica.marca}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_grafica.categoria}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.scheda_grafica.prezzo}€
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.hard_disk.id}`);
                      }}
                    >
                      {build.hard_disk.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.hard_disk.marca}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.hard_disk.categoria}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.hard_disk.prezzo}€
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.ventole.id}`);
                      }}
                    >
                      {build.ventole.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">{build.ventole.marca}</div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.ventole.categoria}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.ventole.prezzo}€
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row xs={1} md={4} c>
                  <Col className="text-truncate">
                    <div
                      className="d-flex justify-content-start buttonClick"
                      onClick={() => {
                        nav(`/dettaglio/${build.alimentatore.id}`);
                      }}
                    >
                      {build.alimentatore.nome}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.alimentatore.marca}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.alimentatore.categoria}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-start justify-content-md-center">
                      {build.alimentatore.prezzo}€
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <div className="d-flex justify-content-end mt-5">
              <Button variant="outline-danger" className="mx-2" onClick={handleShow}>
                Elimina
              </Button>
              <Button
                variant="primary"
                className="mx-2"
                onClick={() => {
                  salvaBuild();
                }}
              >
                Salva
              </Button>
            </div>
          </div>
          <Footer />
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ELIMINA BUILD</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare la Build appena creata?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              dispatch(clearAll());
              nav("/build");
            }}
          >
            ELIMINA
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuildDettaglio;
