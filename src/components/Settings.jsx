import { useEffect, useState } from "react";
import { Alert, Button, Col, Image, Row } from "react-bootstrap";
import { Pencil, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  creaCarta,
  creaIndirizzo,
  errorHandler,
  fetchGetUser,
  modificaCarta,
  modificaIndirizzo,
  modificaOff,
  modificaOn,
  modificaPasswordUtente,
} from "../redux/action/UserAction";

const Settings = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const modify = useSelector((state) => state.mainReducer.isModify);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const [password, setPassword] = useState();
  const [via, setVia] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.via);
  const [numero, setNumero] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.numero);
  const [codice, setCodice] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.codice_postale);
  const [paese, setPaese] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.paese);
  const [provincia, setProvincia] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.provincia);
  const [interno, setInterno] = useState(user.indirizzoSpedizione && user.indirizzoSpedizione.numero_interno);
  const [numCarta, setNumCarta] = useState(user.cartaDiCredito && user.cartaDiCredito.numero_carta);
  const [cvv, setCvv] = useState(user.cartaDiCredito && user.cartaDiCredito.cvv);
  const [scadenza, setScadenza] = useState(user.cartaDiCredito && user.cartaDiCredito.data_di_scadenza);
  const dispatch = useDispatch();

  const setModifica = () => {
    console.log(modify);
    if (modify === false) dispatch(modificaOn());
    else {
      dispatch(modificaOff());
      setVia(user.indirizzoSpedizione.via);
      setNumero(user.indirizzoSpedizione.numero);
      setCodice(user.indirizzoSpedizione.codice_postale);
      setPaese(user.indirizzoSpedizione.paese);
      setProvincia(user.indirizzoSpedizione.provincia);
      setInterno(user.indirizzoSpedizione.numero_interno);
      setNumCarta(user.cartaDiCredito.numero_carta);
      setCvv(user.cartaDiCredito.cvv);
      setScadenza(user.cartaDiCredito.data_di_scadenza);
    }
  };

  const save = () => {
    if (password) {
      dispatch(modificaPasswordUtente(password, token));
      setPassword("");
    }
    if (user.indirizzoSpedizione === null) {
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

    if (user.cartaDiCredito === null) {
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
            numero_carta: numCarta,
            cvv: cvv,
            data_di_scadenza: scadenza,
          },
          token
        )
      );
    }
    setModifica();
  };
  useEffect(() => {
    if (modify === true) dispatch(modificaOff());
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      <div id="paginaSettings" className="p-4 p-md-5 m-4 mt-5">
        <h1 className="mx-xlg-5 mx-1 mx-lg-3">Benvenuto {user.nome}</h1>
        <Row>
          <Col xs={12} md={12} lg={5}>
            <Image src={user.immagineUrl} id="settingsImg" className="mt-4 mt-lg-5 mb-3 mx-xlg-5 mx-1 mx-lg-3" />
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
    </>
  );
};

export default Settings;
