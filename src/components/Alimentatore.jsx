import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Alert, Button, Col, Pagination, Row } from "react-bootstrap";
import CardVuota from "./CardVuota";
import { errorHandler, isLoading } from "../redux/action/UserAction";
import CardItemBuild from "./CardItemBuild";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { addAlimentatore, clearVentole } from "../redux/action/BuildActions";

const Alimentatore = () => {
  const token = useSelector((state) => state.userReducer.token);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const user = useSelector((state) => state.userReducer.user);
  const hasError = useSelector((state) => state.mainReducer.hasError);

  const schedaMAdreSelezionata = useSelector((state) => state.buildReducer.scheda_madre);
  const cpuSelezionata = useSelector((state) => state.buildReducer.cpu);
  const ramSelezionata = useSelector((state) => state.buildReducer.ram);
  const caseSelezionato = useSelector((state) => state.buildReducer.case);
  const schedaGraficaSelezionata = useSelector((state) => state.buildReducer.scheda_grafica);
  const hardDiskSelezionato = useSelector((state) => state.buildReducer.hard_disk);
  const ventoleSelezionate = useSelector((state) => state.buildReducer.ventole);
  const nav = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totPages, setTotPages] = useState();
  const dispatch = useDispatch();
  const [selezionato, setSelezionato] = useState();

  const getAllAlimentatoreCompatibili = async (p) => {
    const somma =
      schedaMAdreSelezionata.potenza_di_picco +
      cpuSelezionata.potenza_di_picco +
      ramSelezionata.potenza_di_picco +
      caseSelezionato.potenza_di_picco +
      schedaGraficaSelezionata.potenza_di_picco +
      hardDiskSelezionato.potenza_di_picco +
      ventoleSelezionate.potenza_di_picco * ventoleSelezionate.pezzi_per_pacco;
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/alimentatore?power=${somma}&page=${p - 1}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setData(data.content);
        setTotPages(data.totalPages);
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };

  const goToBuildDettaglio = () => {
    dispatch(addAlimentatore(selezionato));
    nav(`/build/dettaglio/${0}`);
  };

  useEffect(() => {
    getAllAlimentatoreCompatibili(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      <div className="mt-5 mx-1 pt-4 store">
        <p className="h1 ms-0 ms-sm-2 ms-md-4 mb-5" style={{ fontWeight: "bold", fontSize: "50px" }}>
          POWER SUPPLY
        </p>
        {!user && <h4 className="text-center">Effettua il login per visualizzare i prodotti</h4>}
        {user && load && (
          <Row xs={1} sm={2} md={3} lg={5} className="gy-5 mx-0 mx-md-2">
            {[...Array(10).keys()].map((elem) => (
              <Col>
                {" "}
                <CardVuota />
              </Col>
            ))}
          </Row>
        )}
        {user &&
          data &&
          schedaMAdreSelezionata &&
          cpuSelezionata &&
          ramSelezionata &&
          caseSelezionato &&
          schedaGraficaSelezionata &&
          hardDiskSelezionato &&
          ventoleSelezionate && (
            <Row xs={1} sm={2} xl={5} className="gy-5 mx-0 mx-md-2">
              {data.map((elem) => (
                <Col>
                  {" "}
                  <CardItemBuild elem={elem} selezionato={selezionato} setSelezionato={setSelezionato} />{" "}
                </Col>
              ))}
            </Row>
          )}
        <div className="d-flex justify-content-between align-items-start mt-5">
          <Button
            variant="outline-secondary"
            onClick={() => {
              nav("/build/ventole");
              dispatch(clearVentole());
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowLeft />
          </Button>
          <Pagination>
            {page === 1 ? (
              <Pagination.Prev disabled />
            ) : (
              <Pagination.Prev
                onClick={() => {
                  setPage(page - 1);
                  getAllAlimentatoreCompatibili(page - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
            <Pagination.Item>{page}</Pagination.Item>
            {page === totPages ? (
              <Pagination.Next disabled />
            ) : (
              <Pagination.Next
                onClick={() => {
                  setPage(page + 1);
                  getAllAlimentatoreCompatibili(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </Pagination>
          <Button
            variant="primary"
            className={!selezionato && "disabled"}
            onClick={() => {
              goToBuildDettaglio();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Alimentatore;
