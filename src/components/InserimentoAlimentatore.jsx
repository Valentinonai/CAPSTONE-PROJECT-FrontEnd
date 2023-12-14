import { Col, Form } from "react-bootstrap";

const InserimentoAlimentatore = ({ input1, input2, setInput1, setInput2, input3, setInput3 }) => {
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Potenza massima erogata Watt</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Potenza massima erogata Watt"
            defaultValue={input1}
            onChange={(e) => {
              setInput1(e.target.value);
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
            label="Modulare"
            type={"checkbox"}
            onClick={(e) => setInput2(e.target.checked)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Peso grammi</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Peso grammi"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};
export default InserimentoAlimentatore;
