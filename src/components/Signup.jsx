import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { CloudUpload } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { signupFetch } from "../redux/action/UserAction";

const Signup = () => {
  const [nome, setNome] = useState();
  const [cognome, setCognome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const hasError = useSelector((state) => state.mainReducer.hasError);

  const signup = () => {
    console.log(nome, cognome, email, password);
    dispatch(signupFetch(nome, cognome, email, password, nav, image, token));
  };

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      <div className="login_form mx-auto  p-4 mt-5" style={{ borderRadius: "20px" }}>
        <div className="mb-5">
          <h2>Registrazione</h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <Row xs={1} md={2}>
            <Col>
              <Form.Group className="mt-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  value={nome}
                  type="text"
                  placeholder="nome"
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="inputSettings"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  required
                  value={cognome}
                  type="text"
                  placeholder="cognome"
                  onChange={(e) => {
                    setCognome(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="inputSettings"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  value={email}
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="inputSettings"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  value={password}
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="inputSettings"
                />
              </Form.Group>
            </Col>
          </Row>
          <Col xs={12}>
            <p className="mt-3">Immagine Utente</p>
            <Form.Group className="d-flex justify-content-start align-items-start">
              <div className="dropZoneModale">
                <Dropzone>
                  {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} id="dropZoneModale" />
                        <p className="pDropZone">
                          {acceptedFiles[0] ? acceptedFiles[0].path : <CloudUpload className="fs-1" />}
                        </p>
                        <p className="pDropZone">{acceptedFiles[0] ? "" : "Trascina un'immagine qui"}</p>
                        {setImage(acceptedFiles[0])}
                      </div>
                    </>
                  )}
                </Dropzone>
              </div>
            </Form.Group>
          </Col>

          <div className="d-flex justify-content-end">
            <Button
              className="mb-2 loginButtonForm"
              type="submit"
              style={{ marginTop: "30px", width: "100px" }}
              disabled={hasError.value}
            >
              SignUp
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Signup;
