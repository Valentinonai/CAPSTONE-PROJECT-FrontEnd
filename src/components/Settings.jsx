import { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Pencil, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { modificaOff, modificaOn } from "../redux/action/UserAction";

const Settings = () => {
  const user = useSelector((state) => state.userReducer.user);
  const modify = useSelector((state) => state.mainReducer.isModify);
  const [nome, setNome] = useState(user.nome);
  const [cognome, setCognome] = useState(user.cognome);
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
    else dispatch(modificaOff());
  };

  const save = () => {};

  return (
    <>
      <h1 className="mt-5 ms-5">Benvenuto {user.nome}</h1>
      <Row>
        <Col xs={12} md={6} lg={5}>
          <div style={{ overflow: "hidden" }}>
            <Image src={user.immagineUrl} id="settingsImg" className="mt-5 ms-lg-5" />
          </div>
        </Col>
        <Col xs={12} md={6} lg={7}>
          <div className="mt-5 me-3">
            <Row xs={2} className="justify-content-between align-items-center mb-4">
              <Col>
                <h4 className="mb-4">Dati utente</h4>
              </Col>
              <Col className="text-end mb-4">
                {modify === false ? (
                  <Pencil
                    onClick={() => {
                      setModifica();
                    }}
                    style={{ cursor: "pointer" }}
                    id="modifica"
                  />
                ) : (
                  <XLg
                    onClick={() => {
                      setModifica();
                    }}
                    style={{ cursor: "pointer" }}
                    id="modifica"
                  />
                )}
              </Col>
              <Col>
                <p>Nome:</p>
              </Col>
              <Col>
                {!modify ? (
                  <p>{user.nome}</p>
                ) : (
                  <input
                    type="text"
                    value={nome}
                    placeholder="nome"
                    onChange={(e) => {
                      setNome(e.target.value);
                    }}
                    style={{ boxShadow: "none" }}
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Cognome:</p>
              </Col>
              <Col>
                {!modify ? (
                  <p>{user.cognome}</p>
                ) : (
                  <input
                    type="text"
                    value={cognome}
                    placeholder="cognome"
                    onChange={(e) => {
                      setCognome(e.target.value);
                    }}
                    style={{ boxShadow: "none" }}
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Data iscrizione</p>
              </Col>
              <Col>
                <p>{user.data_creazione}</p>
              </Col>
              <Col>
                <p>Email</p>
              </Col>
              <Col>
                <p>{user.email}</p>
              </Col>
              <Col>
                <p>Password:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
            </Row>
            <Row xs={2} className="justify-content-between align-items-center mb-4">
              <Col>
                <h4 className="mb-4">Indirizzo di spedizione</h4>
              </Col>
              <Col className="text-end mb-4"></Col>
              <Col>
                <p>Via:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Numero:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Codice Postale:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Paese:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Provincia:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Numero interno:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
            </Row>
            <Row xs={2} className="justify-content-between align-items-center">
              <Col>
                <h4 className="mb-4">Carta di credito</h4>
              </Col>
              <Col className="text-end mb-4"></Col>
              <Col>
                <p>Numero carta:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Cvv:</p>
              </Col>
              <Col>
                {!modify ? (
                  <p>{user.cartaDiCredito && user.cartaDiCredito.cvv}</p>
                ) : (
                  <input
                    type="text"
                    value={cvv}
                    placeholder="cvv"
                    onChange={(e) => {
                      setCvv(e.target.value);
                    }}
                    style={{ boxShadow: "none" }}
                    className="input"
                  />
                )}
              </Col>
              <Col>
                <p>Data di scadenza:</p>
              </Col>
              <Col>
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
                    className="input"
                  />
                )}
              </Col>
              <Col></Col>
              <Col className="d-flex justify-content-end">
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
    </>
  );
};

export default Settings;
