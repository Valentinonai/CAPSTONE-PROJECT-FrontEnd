import { useDispatch, useSelector } from "react-redux";
import "../style/Build.css";
import Footer from "./Footer";
import { Button, Col, Image, Row } from "react-bootstrap";
import pc from "../assets/pcCustom.jpg";
import { Link, useNavigate } from "react-router-dom";
import { clearAll } from "../redux/action/BuildActions";
import { useEffect } from "react";

const Build = () => {
  const user = useSelector((state) => state.userReducer.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!user && (
        <h4 className="text-center my-5">
          Effettua il <Link to={"/login"}>login</Link> per accedere alla sezione build your pc
        </h4>
      )}
      {user && (
        <>
          <div className="mt-5 mx-2 mx-md-5 pb-5" id="buildHero">
            <p className="h1 ms-0 ms-sm-2 ms-md-4 mb-5 mt-4" style={{ fontWeight: "bold", fontSize: "50px" }}>
              BUILD YOUR PC
            </p>
            <Row xs={1} md={2}>
              <Col>
                <div className="" style={{ borderRadius: "20px", overflow: "hidden" }}>
                  <Image src={pc} width={"100%"} />
                </div>
              </Col>
              <Col className="d-flex flex-column justify-content-between">
                <p className="pt-5  pt-md-5">
                  Benvenuto nella nostra sezione "Build Your PC"! Scegli processore, scheda madre, scheda grafica, RAM e
                  altro. Il sistema garantisce compatibilità in tempo reale, suggerendo prodotti correlati. Ogni
                  modifica viene analizzata, con indicazioni sulla potenza e requisiti di alimentazione. Visualizza il
                  tuo PC in costruzione e salva la configurazione. L'interfaccia intuitiva rende il processo facile.
                  Esperti o principianti, rendiamo l'assemblaggio senza stress. "Build Your PC" è un'esperienza
                  personalizzata. Crea il PC perfetto passo dopo passo!
                </p>
                <div className="d-flex justify-content-end  me-3 mt-5">
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      nav("/build/scheda_madre");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Start
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Build;
