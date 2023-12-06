import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Alert, Button, Col, Pagination, Row } from "react-bootstrap";
import CardVuota from "./CardVuota";
import { errorHandler, isLoading } from "../redux/action/UserAction";
import CardItemBuild from "./CardItemBuild";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { addHardDisk, addSchedaGrafica, clearCase, clearSchedaGrafica } from "../redux/action/BuildActions";

const HardDisk = () => {
  const token = useSelector((state) => state.userReducer.token);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const user = useSelector((state) => state.userReducer.user);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const schedaMadreSelezionata = useSelector((state) => state.buildReducer.scheda_madre);
  const nav = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totPages, setTotPages] = useState();
  const dispatch = useDispatch();
  const [selezionato, setSelezionato] = useState();

  const getAllHardDiskCompatibili = async (p) => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(
        `${process.env.REACT_APP_BASEURL}/items/hard_disk?m2=${schedaMadreSelezionata.supporto_m2}&page=${p - 1}`,
        {
          method: "GET",
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const goToVentole = () => {
    dispatch(addHardDisk(selezionato));
    nav("/build/ventole");
  };

  useEffect(() => {
    getAllHardDiskCompatibili(1);
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      <div className="mt-5 mx-1 pt-4 store">
        <p className=" h1 ms-2 ms-md-4 mb-5" style={{ fontWeight: "bold", fontSize: "60px" }}>
          HARD DISK
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
        {user && data && schedaMadreSelezionata && (
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
              nav("/build/scheda_grafica");
              dispatch(clearSchedaGrafica());
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
                  getAllHardDiskCompatibili(page - 1);
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
                  getAllHardDiskCompatibili(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </Pagination>
          <Button
            variant="primary"
            className={!selezionato && "disabled"}
            onClick={() => {
              goToVentole();
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
export default HardDisk;
