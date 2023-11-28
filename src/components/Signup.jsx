import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [nome, setNome] = useState();
  const [cognome, setCognome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  const signupFetch = async () => {
    try {
      const risp = await fetch(`http://localhost:3001/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ nome: nome, cognome: cognome, email: email, password: password }),
        headers: {
          "content-type": "Application/json",
        },
      });
      if (risp.ok) {
        const data = await risp.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        nav("/");
      } else throw new Error(risp.status);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login_form mx-auto  p-4 mt-5" style={{ borderRadius: "20px" }}>
      <div className="mb-5">
        <h2>Registrazione</h2>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          signupFetch();
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
                className="input"
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
                className="input"
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
                className="input"
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
                className="input"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button className="mb-2 loginButtonForm" type="submit" style={{ marginTop: "30px", width: "100px" }}>
            SignUp
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Signup;
