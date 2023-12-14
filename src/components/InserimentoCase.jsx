import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";

const InserimentoCase = ({
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  setInput1,
  setInput2,
  setInput3,
  setInput4,
  setInput5,
  setInput6,
}) => {
  useEffect(() => {
    setInput1("ATX");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Col>
        <Form.Group md="4" controlId="validationCustom01" className="d-flex flex-column">
          <Form.Label>Formato</Form.Label>
          <div>
            <Form.Check
              type={"radio"}
              label={"ATX"}
              name="Formato"
              inline
              defaultChecked
              onClick={() => {
                setInput1("ATX");
              }}
            />
            <Form.Check
              type={"radio"}
              label={"MINI_ITX"}
              name="Formato"
              inline
              onClick={() => {
                setInput1("MINI_ITX");
              }}
            />
            <Form.Check
              type={"radio"}
              label={"MICRO_ATX"}
              name="Formato"
              inline
              onClick={() => {
                setInput1("MICRO_ATX");
              }}
            />
          </div>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Numero ventole</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Numero ventole"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Larghezza mm</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Larghezza mm"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Altezza mm</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Altezza mm"
            defaultValue={input4}
            onChange={(e) => {
              setInput4(e.target.value);
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
            defaultValue={input5}
            onChange={(e) => {
              setInput5(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Dimensione ventole mm (min=120mm)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Dimensione ventole mm (min=120mm)"
            defaultValue={input6}
            onChange={(e) => {
              setInput6(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};
export default InserimentoCase;
