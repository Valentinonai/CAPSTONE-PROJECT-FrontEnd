import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";

const InserimentoHardDisk = ({ input1, input2, setInput1, setInput2 }) => {
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01" className="d-flex flex-column">
          <Form.Label>Opzioni</Form.Label>
          <Form.Check
            inline
            defaultValue={false}
            label="nvme M2"
            type={"checkbox"}
            onClick={(e) => setInput1(e.target.checked)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Capacità Gb</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Capacità Gb"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};
export default InserimentoHardDisk;
