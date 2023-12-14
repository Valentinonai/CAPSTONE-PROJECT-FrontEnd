import { Col, Form } from "react-bootstrap";

const InserimentoSchedaGrafica = ({ input1, input2, input3, input4, setInput1, setInput2, setInput3, setInput4 }) => {
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Larghezza mm</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Larghezza mm"
            defaultValue={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Lunghezza mm</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Lunghezza mm"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Boost clock GHz</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Boost clock GHz"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Dimensione memoria Gb</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Dimensione memoria Gb"
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

export default InserimentoSchedaGrafica;
