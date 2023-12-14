import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";

const InserimentoCpu = ({
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  input7,
  input8,
  input9,
  setInput1,
  setInput2,
  setInput3,
  setInput4,
  setInput5,
  setInput6,
  setInput7,
  setInput8,
  setInput9,
}) => {
  useEffect(() => {
    setInput8(false);
  }, []);
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Socket</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Socket"
            defaultValue={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Numero Cores</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Numero Cores"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Numero Threads</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Numero Threads"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Max boost clock</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Max boost clock"
            defaultValue={input4}
            onChange={(e) => {
              setInput4(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Cache l2 Mb</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Cache l2 Mb"
            defaultValue={input5}
            onChange={(e) => {
              setInput5(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Cache l3 Mb</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Cache l3 Mb"
            defaultValue={input6}
            onChange={(e) => {
              setInput6(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Temperatura massima °C</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Temperatura massima °C"
            defaultValue={input7}
            onChange={(e) => {
              setInput7(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01" className="d-flex flex-column">
          <Form.Label>Opzioni</Form.Label>
          <div>
            <Form.Check
              inline
              label="Grafica integrata"
              type={"checkbox"}
              onClick={(e) => setInput8(e.target.checked)}
            />
          </div>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Tipo memoria di sistema</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tipo memoria di sistema"
            defaultValue={input9}
            onChange={(e) => {
              setInput9(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};

export default InserimentoCpu;
