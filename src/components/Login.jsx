import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { errorHandler, errorOff, errorOn, fetchGetUser, saveToken } from "../redux/action/UserAction";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const hasError = useSelector((state) => state.mainReducer.hasError);

  const loginSubmit = async () => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "content-type": "Application/json",
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        dispatch(saveToken(data.token));
        dispatch(fetchGetUser(data.token));
        nav("/");
      } else throw new Error(data.message);
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
      <div className="login_form mx-auto  p-4 mt-5">
        <div className="mb-5">
          <h2>Login</h2>
        </div>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            loginSubmit();
          }}
        >
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
          <Row className="d-flex justify-content-between mt-3 mb-2">
            <Col xs={12} sm={6}>
              <Link to={"/signup"} style={{ fontWeight: "100", textDecoration: "none" }}>
                SignUp
              </Link>
            </Col>
            <Col xs={12} sm={6} className="text-end">
              <Button
                className="mt-3 loginButtonForm"
                type="submit"
                style={{ width: "100px" }}
                disabled={hasError.value}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Login;
