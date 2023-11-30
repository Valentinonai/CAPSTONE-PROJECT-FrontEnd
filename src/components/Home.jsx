import { Col, Image, Row } from "react-bootstrap";
import hero from "../assets/pcCustom.jpg";

const Home = () => {
  return (
    <Row className="shadow" id="heroSection">
      <Col xs={12} md={7}>
        <div className="text-white mt-5 me-2 me-sm-5 pt-0 pt-lg-5">
          <h1 className="" id="homeH1">
            BUILD MY PC
          </h1>
          <h2>Crea il tuo prossimo PC</h2>
        </div>
        {/* <p>
            Benvenuto nel tuo universo digitale personalizzato. Siamo qui per trasformare la tua visione di un PC su
            misura in realtà. Ogni componente che offriamo è un mattoncino nel costruire la tua esperienza informatica
            unica. Esplora il potenziale della personalizzazione e crea il PC dei tuoi sogni con noi. Entra nel futuro
            della tecnologia su misura.
          </p> */}
      </Col>
      <Col xs={12} md={5}>
        <div className="d-flex justify-content-center ">
          <Image src={hero} width={"100%"} className="my-3" style={{ borderRadius: "20px" }} shadow />
        </div>
      </Col>
    </Row>
  );
};
export default Home;
