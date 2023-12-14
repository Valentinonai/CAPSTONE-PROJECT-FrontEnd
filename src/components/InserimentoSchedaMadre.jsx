import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";

const InserimentoSchedaMadre = ({
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  input7,
  input8,
  input9,
  input10,
  setInput1,
  setInput2,
  setInput3,
  setInput4,
  setInput5,
  setInput6,
  setInput7,
  setInput8,
  setInput9,
  setInput10,
}) => {
  useEffect(() => {
    setInput1("ATX");
    setInput6(false);
    setInput7(false);
    setInput8(false);
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
          <Form.Label>Chipset</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Chipset"
            defaultValue={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Socket</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Socket"
            defaultValue={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Tipo di memoria</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tipo di memoria"
            defaultValue={input4}
            onChange={(e) => {
              setInput4(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Memoria massima Gb</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Memoria massima Gb"
            defaultValue={input5}
            onChange={(e) => {
              setInput5(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01" className="d-flex flex-column">
          <Form.Label>Opzioni</Form.Label>
          <div>
            <Form.Check inline label="has wifi" type={"checkbox"} onClick={(e) => setInput6(e.target.checked)} />
            <Form.Check inline label="has bluetooth" type={"checkbox"} onClick={(e) => setInput7(e.target.checked)} />
            <Form.Check inline label="nvme M2" type={"checkbox"} onClick={(e) => setInput8(e.target.checked)} />
          </div>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Numero Pcie</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="numero pcie"
            defaultValue={input9}
            onChange={(e) => {
              setInput9(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>numero USB</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="numero USB"
            defaultValue={input10}
            onChange={(e) => {
              setInput10(e.target.value);
            }}
          />
        </Form.Group>
      </Col>
    </>
  );
};
export default InserimentoSchedaMadre;
