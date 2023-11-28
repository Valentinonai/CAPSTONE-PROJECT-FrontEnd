import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  const loginSubmit = async () => {
    try {
      const risp = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
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
    <div className="login_form w-50 mx-auto  p-4 mt-5" style={{ borderRadius: "20px" }}>
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
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ boxShadow: "none" }}
            className="input"
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
            className="input"
          />
        </Form.Group>
        <div className="d-flex justify-content-between mt-3 mb-2">
          <Link to={"/signup"} style={{ color: "white", fontWeight: "100", textDecoration: "none" }}>
            SignUp
          </Link>
          <Button className="mt-3" type="submit" id="loginButtonForm" style={{ width: "100px" }}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
