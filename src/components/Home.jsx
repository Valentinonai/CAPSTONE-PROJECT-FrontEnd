import { Col, Image, Row } from "react-bootstrap";
import hero from "../assets/pcCustom.jpg";
import chiSiamo from "../assets/MotherBoard.jpg";
import componenti from "../assets/componenti.jpg";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAll } from "../redux/action/BuildActions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Row className="shadow mb-5" id="heroSection">
        <Col xs={12} md={7}>
          <div className="text-white mt-5 me-2 me-sm-5 pt-0 pt-lg-5">
            <h1 className="" id="homeH1">
              BUILD MY PC
            </h1>
            <h2>Crea il tuo prossimo PC</h2>
          </div>
        </Col>
        <Col xs={12} md={5}>
          <div className="d-flex justify-content-center ">
            <Image src={hero} width={"100%"} className="my-3" style={{ borderRadius: "20px" }} shadow />
          </div>
        </Col>
      </Row>
      <Row className="shadow mb-5 py-3">
        <Col xs={12} md={5}>
          <div className="d-flex justify-content-center ">
            <Image
              src={chiSiamo}
              width={"100%"}
              className="my-3"
              style={{ borderRadius: "20px", boxShadow: " 0px 0px 15px 5px var(--colore-3)" }}
            />
          </div>
        </Col>
        <Col xs={12} md={7}>
          <div className=" mt-5 me-2 me-sm-5 pt-0 pt-lg-5 ">
            <h2>CHI SIAMO</h2>
            <p>
              Benvenuto nel tuo universo digitale personalizzato. Siamo qui per trasformare la tua visione di un PC su
              misura in realtà. Ogni componente che offriamo è un mattoncino nel costruire la tua esperienza informatica
              unica. Esplora il potenziale della personalizzazione e crea il PC dei tuoi sogni con noi. Entra nel futuro
              della tecnologia su misura.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="shadow py-3 mb-5">
        <Col xs={12} md={7}>
          <div className=" mt-5 me-2 me-sm-5 pt-0 pt-xl-5">
            <h2>Dai vita alla Tua Visione Tecnologica con Noi!</h2>
            <p>
              <p>
                Benvenuto nel luogo dove la tua creatività e la potenza si incontrano. Da BUILD MY PC, ti offriamo
                un'esperienza unica nel creare il tuo PC personalizzato. Guidiamo ogni tuo passo, dalla selezione dei
                componenti alla messa insieme, trasformando le tue idee in una realtà digitale.
              </p>

              <p>
                La nostra guida virtuale semplifica il processo, garantendo che ogni decisione sia informata e centrata
                sulle tue esigenze. Il nostro team di esperti è a tua disposizione per rispondere a ogni domanda e
                offrire consigli personalizzati.
              </p>
            </p>
          </div>
        </Col>
        <Col xs={12} md={5} className="order-1">
          <div className="d-flex justify-content-center ">
            <Image
              src={componenti}
              width={"100%"}
              className="my-3"
              style={{ borderRadius: "20px", boxShadow: " 0px 0px 15px 5px var(--colore-3)" }}
              shadow
            />
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
};
export default Home;
