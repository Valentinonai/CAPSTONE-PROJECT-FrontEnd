import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Alert, Button, Col, Pagination, Row } from "react-bootstrap";
import CardVuota from "./CardVuota";
import { errorHandler, isLoading } from "../redux/action/UserAction";
import CardItemBuild from "./CardItemBuild";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { addVentole, clearHardDisk } from "../redux/action/BuildActions";

const Ventole = () => {
  const token = useSelector((state) => state.userReducer.token);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const user = useSelector((state) => state.userReducer.user);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const caseSelezionato = useSelector((state) => state.buildReducer.case);
  const nav = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totPages, setTotPages] = useState();
  const dispatch = useDispatch();
  const [selezionato, setSelezionato] = useState();

  const getAllVentoleCompatibili = async (p) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(
        `${process.env.REACT_APP_BASEURL}/items/ventole?dimensione=${caseSelezionato.dimensioneVentole}&page=${p - 1}`,
        {
          method: "GET",
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (risp.ok) {
        const data = await risp.json();
        setData(data.content);
        setTotPages(data.totalPages);
        dispatch(isLoading(false));
      } else throw new Error("Elementi non trovati");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };

  const goToAlimentatore = () => {
    dispatch(addVentole(selezionato));
    nav("/build/alimentatore");
  };

  useEffect(() => {
    getAllVentoleCompatibili(1);
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      <div className="mt-5 mx-1 pt-4 store">
        <h1 className="ms-2 ms-md-4 mb-5" style={{ fontWeight: "bold", fontSize: "60px" }}>
          SCHEDA GRAFICA
        </h1>
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
        {user && data && caseSelezionato && (
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
              nav("/build/hard_disk");
              dispatch(clearHardDisk());
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
                  getAllVentoleCompatibili(page - 1);
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
                  getAllVentoleCompatibili(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </Pagination>
          <Button
            variant="primary"
            className={!selezionato && "disabled"}
            onClick={() => {
              goToAlimentatore();
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
export default Ventole;
