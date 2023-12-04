import { useEffect, useState } from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getByCategoria } from "../redux/action/MarketStoreAction";
import CardVuota from "./CardVuota";
import CardItemStore from "./CardItemStore";
import Footer from "./Footer";

const MarketStore = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const items = useSelector((state) => state.marketStoreReducer.items);
  const pagesNumber = useSelector((state) => state.marketStoreReducer.pagesNumber);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const [selezione, setSelezione] = useState("Tutti");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchStore = (mypage, sel) => {
    switch (sel) {
      case "Tutti":
        dispatch(getAll(token, mypage));
        break;
      case "Scheda_Madre":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Cpu":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Ram":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Case":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Scheda_Grafica":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Alimentatore":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Hard_Disk":
        dispatch(getByCategoria(token, mypage, sel));
        break;
      case "Ventole":
        dispatch(getByCategoria(token, mypage, sel));
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    fetchStore(page, "Tutti");
  }, []);
  return (
    <>
      <div id="store" className="mt-5 mx-1 pt-4">
        <Form className=" mb-5 mt-3" style={{ marginInline: "-12px" }}>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <Form.Check
              label="Tutti"
              defaultChecked
              name="group1"
              type="radio"
              className="mx-2"
              onClick={() => {
                setSelezione("Tutti");
                setPage(1);
                fetchStore(1, "Tutti");
              }}
            />
            <Form.Check
              label="Scheda Madre"
              name="group1"
              type="radio"
              className="mx-2"
              onClick={() => {
                setSelezione("Scheda_Madre");
                setPage(1);
                fetchStore(1, "Scheda_Madre");
              }}
            />
            <Form.Check
              label="Cpu"
              name="group1"
              type="radio"
              className="mx-2"
              onClick={() => {
                setSelezione("Cpu");
                setPage(1);
                fetchStore(1, "Cpu");
              }}
            />
            <Form.Check
              label="Ram"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Ram");
                setPage(1);
                fetchStore(1, "Ram");
              }}
            />
            <Form.Check
              label="Case"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Case");
                setPage(1);
                fetchStore(1, "Case");
              }}
            />
            <Form.Check
              label="Scheda Grafica"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Scheda_Grafica");
                setPage(1);
                fetchStore(1, "Scheda_Grafica");
              }}
            />
            <Form.Check
              label="Alimentatore"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Alimentatore");
                setPage(1);
                fetchStore(1, "Alimentatore");
              }}
            />
            <Form.Check
              label="Hard Disk"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Hard_Disk");
                setPage(1);
                fetchStore(1, "Hard_Disk");
              }}
            />
            <Form.Check
              label="Ventole"
              type="radio"
              name="group1"
              className="mx-2"
              onClick={() => {
                setSelezione("Ventole");
                setPage(1);
                fetchStore(1, "Ventole");
              }}
            />
          </div>
        </Form>
        <h1 className="ms-2 ms-md-4 mb-5" style={{ fontWeight: "bold", fontSize: "60px" }}>
          STORE
        </h1>
        {!user && <h4 className="text-center">Effettua il login per visualizzare i prodotti</h4>}
        {/* ------------CARICAMENTO------------- */}
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
        {/* ---------------------CREAZIONE PAGINA------------------- */}
        {user && items && (
          <Row xs={1} sm={2} xl={5} className="gy-5 mx-0 mx-md-2">
            {items.map((elem) => (
              <Col>
                <CardItemStore elem={elem} />
              </Col>
            ))}
          </Row>
        )}
        {/* ------------PAGINAZIONE------------ */}
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Pagination>
            {page === 1 ? (
              <Pagination.Prev disabled />
            ) : (
              <Pagination.Prev
                onClick={() => {
                  setPage(page - 1);
                  fetchStore(page - 1, selezione);
                }}
              />
            )}
            <Pagination.Item>{page}</Pagination.Item>
            {page === pagesNumber ? (
              <Pagination.Next disabled />
            ) : (
              <Pagination.Next
                onClick={() => {
                  setPage(page + 1);
                  fetchStore(page + 1, selezione);
                }}
              />
            )}
          </Pagination>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MarketStore;
