import { Col, Form } from "react-bootstrap";

const InserimentoRam = ({ input1, input2, input3, input4, setInput1, setInput2, setInput3, setInput4 }) => {
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Tipo di memoria</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tipo di memoria"
            defaultValue={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Velocità GHz</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Velocità GHz"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Dimensione Gb</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Dimensione Gb"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Lista ID scheda madre (Pattern:id-id-id-id) </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Lista ID scheda madre (Pattern:id-id-id-id)"
            defaultValue={input4}
            onChange={(e) => {
              setInput4(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};

export default InserimentoRam;
