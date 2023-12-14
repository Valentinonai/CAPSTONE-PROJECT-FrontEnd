import { Col, Form } from "react-bootstrap";

const InserimentoVentole = ({
  input1,
  input2,
  input3,
  input4,
  setInput1,
  setInput2,
  setInput3,
  setInput4,
  input5,
  setInput5,
}) => {
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Rpm minimi</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Rpm minimi"
            defaultValue={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Rpm massimi</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Rpm massimi"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01" className="d-flex flex-column">
          <Form.Label>Opzioni</Form.Label>
          <Form.Check
            inline
            defaultValue={false}
            label="Pwm"
            type={"checkbox"}
            onClick={(e) => setInput3(e.target.checked)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Dimensione mm</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Dimensione mm"
            defaultValue={input4}
            onChange={(e) => {
              setInput4(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Quantità per box</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Quantità per box"
            defaultValue={input5}
            onChange={(e) => {
              setInput5(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};
export default InserimentoVentole;
