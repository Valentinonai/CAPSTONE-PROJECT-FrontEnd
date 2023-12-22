import { useEffect, useState } from "react";
import { Alert, Button, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import { Pencil, Trash, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBuilds,
  creaCarta,
  creaIndirizzo,
  eliminaAccount,
  modificaCarta,
  modificaIndirizzo,
  modificaOff,
  modificaOn,
  modificaPasswordUtente,
  uploadUserImg,
  userLogout,
} from "../redux/action/UserAction";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { clearAll } from "../redux/action/BuildActions";
import { clearCart } from "../redux/action/CarrelloActions";
import { isLoadingChat, resetChat } from "../redux/action/ChatActions";

const Settings = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const modify = useSelector((state) => state.mainReducer.isModify);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const [password, setPassword] = useState();
  const [via, setVia] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.via);
  const [numero, setNumero] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.numero);
  const [codice, setCodice] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.codice_postale);
  const [paese, setPaese] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.paese);
  const [provincia, setProvincia] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.provincia);
  const [interno, setInterno] = useState(user && user.indirizzoSpedizione && user.indirizzoSpedizione.numero_interno);
  const [numCarta, setNumCarta] = useState(user && user.cartaDiCredito && user.cartaDiCredito.numero_carta);
  const [cvv, setCvv] = useState(user && user.cartaDiCredito && user.cartaDiCredito.cvv);
  const [scadenza, setScadenza] = useState(user && user.cartaDiCredito && user.cartaDiCredito.data_di_scadenza);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState();
  const load = useSelector((state) => state.mainReducer.isLoading);
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(true);

  const handleClose1 = () => setShow1(false);

  const setModifica = () => {
    if (modify === false) dispatch(modificaOn());
    else {
      dispatch(modificaOff());
      if (user.indirizzoSpedizione) {
        setVia(user.indirizzoSpedizione.via);
        setNumero(user.indirizzoSpedizione.numero);
        setCodice(user.indirizzoSpedizione.codice_postale);
        setPaese(user.indirizzoSpedizione.paese);
        setProvincia(user.indirizzoSpedizione.provincia);
        setInterno(user.indirizzoSpedizione.numero_interno);
      }
      if (user.cartaDiCredito) {
        setNumCarta(user.cartaDiCredito.numero_carta);
        setCvv(user.cartaDiCredito.cvv);
        setScadenza(user.cartaDiCredito.data_di_scadenza);
      }
    }
  };

  const save = () => {
    if (password) {
      dispatch(modificaPasswordUtente(password, token));
      setPassword("");
    }
    if (!user.indirizzoSpedizione) {
      if (via && numero && codice && paese && provincia && interno) {
        dispatch(
          creaIndirizzo(
            {
              via: via,
              numero: numero,
              codice_postale: codice,
              paese: paese,
              provincia: provincia,
              numero_interno: interno,
            },
            token
          )
        );
      }
    } else {
      dispatch(
        modificaIndirizzo(
          {
            via: via === "" ? null : via,
            numero: numero === "" ? null : numero,
            codice_postale: codice === "" ? null : codice,
            paese: paese === "" ? null : paese,
            provincia: provincia === "" ? null : provincia,
            numero_interno: interno === "" ? null : interno,
          },
          token
        )
      );
    }

    if (!user.cartaDiCredito) {
      if (numCarta && cvv && scadenza) {
        dispatch(
          creaCarta(
            {
              numero_carta: numCarta,
              cvv: cvv,
              data_di_scadenza: scadenza,
            },
            token
          )
        );
      }
    } else {
      dispatch(
        modificaCarta(
          {
            numero_carta: numCarta === "" ? null : numCarta,
            cvv: cvv === "" ? null : cvv,
            data_di_scadenza: scadenza === "" ? null : scadenza,
          },
          token
        )
      );
    }
    setModifica();
  };
  const cambiaImg = (file) => {
    setImage(file);
    if (file !== undefined) {
      dispatch(uploadUserImg(file, token));
    }
    return undefined;
  };
  useEffect(() => {
    if (modify === true) dispatch(modificaOff());
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">{hasError.message}</Alert>}
      {user && (
        <div id="paginaSettings" className="p-4 p-md-5 m-4 mt-5 ">
          <p className="h1 mx-xlg-5 mx-1 mx-lg-3">Benvenuto {user.nome}</p>
          <Row className="mb-3">
            <Col xs={12} md={12} lg={5} className="d-flex flex-column justify-content-between align-items-start">
              <div id="settingsImg" className="mt-4 mt-lg-5 mb-3 mx-xlg-5 mx-1 mx-lg-3">
                <Image src={user.immagineUrl} width={"100%"} height={"100%"} id="imgSettings" />
                <div id="overrideImg">
                  <Dropzone>
                    {({ getRootProps, getInputProps, acceptedFiles }) => (
                      <>
                        <div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
                          <input {...getInputProps()} className="dropZoneSettings" />
                          {!load && (
                            <p className="pDropZoneSettings">{acceptedFiles[0] ? "" : "Trascina un'immagine qui"}</p>
                          )}
                          {load && (
                            <Spinner animation="border" role="status" className="spinnerSettings">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          )}
                          {(acceptedFiles[0] = cambiaImg(acceptedFiles[0]))}
                        </div>
                      </>
                    )}
                  </Dropzone>
                </div>
              </div>
              <Button variant="outline-danger">
                <Trash onClick={handleShow} />
              </Button>
            </Col>
            <Col xs={12} md={12} lg={7}>
              <div className="mt-5" id="settingsMain">
                <Row className="justify-content-between align-items-center mb-4">
                  <Col xs={12}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-3 mb-sm-4">Dati utente</h4>
                      {modify === false ? (
                        <Pencil
                          onClick={() => {
                            setModifica();
                          }}
                          style={{ cursor: "pointer" }}
                          id="modifica"
                          className="mb-2 mb-sm-4"
                        />
                      ) : (
                        <XLg
                          onClick={() => {
                            setModifica();
                          }}
                          style={{ cursor: "pointer" }}
                          id="modifica"
                          className="mb-2 mb-sm-4"
                        />
                      )}
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Nome:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>{user.nome}</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Cognome:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>{user.cognome}</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Data iscrizione</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>{user.data_creazione}</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Email</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>{user.email}</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Password:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>********</p>
                    ) : (
                      <input
                        type="text"
                        value={password}
                        placeholder="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-between align-items-center mb-4">
                  <Col xs={12}>
                    <h4 className="mb-3  mb-sm-4 mt-2 mb-sm-2 mt-sm-2 mt-md-1">Indirizzo di spedizione</h4>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Via:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.via}</p>
                    ) : (
                      <input
                        type="text"
                        value={via}
                        placeholder="via"
                        onChange={(e) => {
                          setVia(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Numero:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.numero}</p>
                    ) : (
                      <input
                        type="number"
                        value={numero}
                        placeholder="numero"
                        onChange={(e) => {
                          setNumero(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Codice Postale:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.codice_postale}</p>
                    ) : (
                      <input
                        type="text"
                        value={codice}
                        placeholder="codice postale"
                        onChange={(e) => {
                          setCodice(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Paese:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.paese}</p>
                    ) : (
                      <input
                        type="text"
                        value={paese}
                        placeholder="paese"
                        onChange={(e) => {
                          setPaese(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Provincia:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.provincia}</p>
                    ) : (
                      <input
                        type="text"
                        value={provincia}
                        placeholder="provincia"
                        onChange={(e) => {
                          setProvincia(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Numero interno:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.indirizzoSpedizione && user.indirizzoSpedizione.numero_interno}</p>
                    ) : (
                      <input
                        type="number"
                        value={interno}
                        placeholder="numero interno"
                        onChange={(e) => {
                          setInterno(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-between align-items-center">
                  <Col xs={12}>
                    <h4 className="mb-3  mb-sm-4 mt-2 mb-sm-2 mt-sm-2 mt-md-1">Carta di credito</h4>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Numero carta:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.cartaDiCredito && user.cartaDiCredito.numero_carta}</p>
                    ) : (
                      <input
                        type="text"
                        value={numCarta}
                        placeholder="numero carta"
                        onChange={(e) => {
                          setNumCarta(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Cvv:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.cartaDiCredito && user.cartaDiCredito.cvv}</p>
                    ) : (
                      <input
                        type="number"
                        value={cvv}
                        placeholder="cvv"
                        onChange={(e) => {
                          setCvv(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>Data di scadenza:</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    {!modify ? (
                      <p>{user.cartaDiCredito && user.cartaDiCredito.data_di_scadenza}</p>
                    ) : (
                      <input
                        type="date"
                        value={scadenza}
                        placeholder="cvv"
                        onChange={(e) => {
                          setScadenza(e.target.value);
                        }}
                        style={{ boxShadow: "none" }}
                        className="inputSettings"
                      />
                    )}
                  </Col>

                  <Col className="d-flex justify-content-end" xs={12}>
                    {modify && (
                      <Button
                        className="mb-2 loginButtonForm"
                        type="submit"
                        style={{ marginTop: "30px", width: "100px" }}
                        onClick={save}
                      >
                        Save
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminazione Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l'account?
          <br />
          L'operazione è irreversibile
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              dispatch(eliminaAccount(token, nav));
              dispatch(userLogout());
              dispatch(clearCart());
              dispatch(clearAll());
              dispatch(resetChat());
              dispatch(isLoadingChat(false));
              dispatch(clearBuilds());
              nav("/");
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1} id="modaleAlert">
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: "50px" }}>ATTENZIONE!!!!!!!!!</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ fontSize: "20px" }}>
            Questo sito è stato progettato al solo scopo didattico{" "}
            <span style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "40px" }}>NON</span> inserire dati
            reali che vi riguardano
          </span>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default Settings;
