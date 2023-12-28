import { Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { QuestionCircleFill, Gear, ShieldShaded, Github } from "react-bootstrap-icons";
import "../style/footer.css";
import { useState } from "react";
import portfolio from "../assets/Portfolio.png";
import buildMyPc from "../assets/BuildMyPc.png";
import linkedin from "../assets/Linkedin.png";
import Privacy from "./Privacy";

const Footer = () => {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  return (
    <>
      <Container fluid="lg" className="Footer-container">
        <Row className="Footer ">
          <Col sm={3} md={2}>
            <Row className="d-flex flex-column text-start">
              <Col>
                <p
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}
                  onClick={() => {
                    setLgShow(true);
                  }}
                >
                  Privacy e condizioni
                </p>
              </Col>
              <Col>
                <p
                  style={{ fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}
                  onClick={() => {
                    setLgShow1(true);
                  }}
                >
                  Contatti{" "}
                </p>
              </Col>
              <Col>
                <p>Linee guida della comunity</p>
              </Col>
              <Col>
                <p>Sales Solution</p>
              </Col>
              <Col>
                <p>Centro sicurezza</p>
              </Col>
            </Row>
          </Col>
          <Col sm={3} md={2}>
            <Row className="d-flex flex-column text-start">
              <Col>
                <p>Accessibilità</p>
              </Col>
              <Col>
                <p>Carriera</p>
              </Col>
              <Col>
                <p>Opzioni per gli annunci pubblicitari</p>
              </Col>
              <Col>
                <p>Mobile</p>
              </Col>
            </Row>
          </Col>
          <Col sm={3} md={2}>
            <Row className="d-flex flex-column text-start">
              <Col>
                <p>Talent solution</p>
              </Col>
              <Col>
                <p>Soluzione di marketing</p>
              </Col>
              <Col>
                <p>Pubblicità</p>
              </Col>
              <Col>
                <p>Piccole imprese</p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="d-flex flex-column text-start">
              <Col sm={12} className="d-flex">
                <QuestionCircleFill className="mt-1" />
                <Col className="ms-3">
                  <p style={{ fontWeight: "bold" }}>Domande?</p>
                  <p>Visita il nostro centro assistenza</p>
                </Col>
              </Col>
              <Col sm={12} className="d-flex">
                <Gear className="mt-1" />
                <Col className="ms-3">
                  <p style={{ fontWeight: "bold", verticalAlign: "top" }}>Gestisci il tuo account e la tua privacy</p>
                  <p>Vai alle impostazioni</p>
                </Col>
              </Col>
              <Col sm={12} className="d-flex">
                <ShieldShaded className="mt-1" />
                <Col className="ms-3">
                  <p style={{ fontWeight: "bold" }}>Trasparenza sui contenuti consigliati</p>
                  <p>Scopri di piu sui contenuti consigliati</p>
                </Col>
              </Col>
              <Col sm={12}>
                <Form.Select size="sm" className="Footer-barra-option-sotto">
                  <option>Italiano</option>
                  <option>English</option>
                  <option>Español</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="">
              <Col>
                <Form.Select size="sm" className="Footer-barra-option-lato">
                  <option>Italiano</option>
                  <option>English</option>
                  <option>Español</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <p className="Footer-ultimo-link">Build_my_pc Corporation © 2023</p>
      </Container>
      <Privacy lgShow={lgShow} setLgShow={setLgShow} />
      <Modal
        size="lg"
        show={lgShow1}
        fullscreen={true}
        onHide={() => setLgShow1(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <p className="h1 mb-0">
              {" "}
              <span className="ps-2 ps-lg-5">VALENTINO NAI</span>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            className="my-3 py-5 d-flex flex-column justify-content-between align-items-center "
            style={{ minHeight: "80%" }}
          >
            <Row xs={1} lg={4} className="mb-5 justify-content-center align-items-center g-5 text-center">
              <Col>
                <div style={{ overflow: "hidden", objectFit: "contain" }} className=" shadow buttonClick rounded">
                  <a href="https://www.linkedin.com/in/valentinonaiwebdeveloper" target="_blank" rel="noreferrer">
                    {" "}
                    <Image src={linkedin} width={"100%"} rounded />
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  LinkedIn:{" "}
                  <a href="https://www.linkedin.com/in/valentinonaiwebdeveloper" target="_blank" rel="noreferrer">
                    /valentinonaiwebdeveloper
                  </a>
                </div>
              </Col>
              <Col>
                <a
                  href="https://github.com/Valentinonai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <div
                    style={{ overflow: "hidden", objectFit: "contain" }}
                    className=" shadow buttonClick rounded p-5 d-flex flex-column justify-content-center align-items-center"
                  >
                    {" "}
                    <Github className="fs-1 mb-2" />
                    <p>Valentinonai</p>
                  </div>
                </a>
              </Col>
              <Col>
                <div>
                  GitHub:{" "}
                  <a href="https://github.com/Valentinonai" target="_blank" rel="noreferrer">
                    github.com/Valentinonai
                  </a>
                </div>
              </Col>
            </Row>
            <Row xs={1} lg={4} className=" justify-content-center align-items-center g-5 text-center">
              <Col>
                <div style={{ overflow: "hidden", objectFit: "contain" }} className=" shadow buttonClick">
                  <a href="https://valentinonai.netlify.app" target="_blank" rel="noreferrer">
                    {" "}
                    <Image src={portfolio} width={"100%"} rounded />
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  Portfolio:{" "}
                  <a href="https://valentinonai.netlify.app" target="_blank" rel="noreferrer">
                    valentinonai.netlify.app
                  </a>
                </div>
              </Col>
              <Col>
                <div style={{ overflow: "hidden", objectFit: "contain" }} className=" shadow buttonClick">
                  <a href="https://capstoneproject-buildmypc.netlify.app" target="_blank" rel="noreferrer">
                    <Image src={buildMyPc} width={"100%"} rounded />
                  </a>
                </div>
              </Col>
              <Col>
                <div>
                  BuildMyPc project: <br />
                  <a href="https://capstoneproject-buildmypc.netlify.app" target="_blank" rel="noreferrer">
                    capstoneproject-buildmypc.netlify.app
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Footer;
