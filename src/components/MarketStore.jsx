import { useEffect, useState } from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/action/MarketStoreAction";
import CardVuota from "./CardVuota";
import CardItemStore from "./CardItemStore";

const MarketStore = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const items = useSelector((state) => state.marketStoreReducer.items);
  const pagesNumber = useSelector((state) => state.marketStoreReducer.pagesNumber);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const [selezione, setSelezione] = useState("Tutti");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchStore = (mypage) => {
    switch (selezione) {
      case "Tutti":
        dispatch(getAll(token, mypage));
        break;
      case "Scheda Madre":
        break;
      case "Cpu":
        break;
      case "Ram":
        break;
      case "Case":
        break;
      case "Scheda Grafica":
        break;
      case "Alimentatore":
        break;
      case "Hard Disk":
        break;
      case "Ventole":
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    fetchStore(page);
  }, [selezione]);
  return (
    <div id="store">
      <Form className=" mb-5 mt-3" style={{ marginInline: "-12px" }}>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <Form.Check
            label="Tutti"
            defaultChecked
            name="group1"
            type="radio"
            className="mx-2"
            onSelect={() => {
              setSelezione("Scheda Madre");
            }}
          />
          <Form.Check
            label="Scheda Madre"
            name="group1"
            type="radio"
            className="mx-2"
            onSelect={() => {
              setSelezione("Scheda Madre");
            }}
          />
          <Form.Check
            label="Cpu"
            name="group1"
            type="radio"
            className="mx-2"
            onSelect={() => {
              setSelezione("Cpu");
            }}
          />
          <Form.Check
            label="Ram"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Ram");
            }}
          />
          <Form.Check
            label="Case"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Case");
            }}
          />
          <Form.Check
            label="Scheda Grafica"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Scheda Grafica");
            }}
          />
          <Form.Check
            label="Alimentatore"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Alimentatore");
            }}
          />
          <Form.Check
            label="Hard Disk"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Hard Disk");
            }}
          />
          <Form.Check
            label="Ventole"
            type="radio"
            name="group1"
            className="mx-2"
            onSelect={() => {
              setSelezione("Ventole");
            }}
          />
        </div>
      </Form>
      <h1 className="ms-0 ms-md-4 mb-5" style={{ fontWeight: "bold", fontSize: "60px" }}>
        STORE
      </h1>
      {!user && <h4 className="text-center">Effettua il login per visualizzare i prodotti</h4>}
      {/* ------------CARICAMENTO------------- */}
      {user && load && (
        <Row xs={1} sm={2} md={3} lg={5} className="gy-5 mx-0 mx-md-4">
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
        <Row xs={1} sm={2} xl={5} className="gy-5 mx-0 mx-md-4">
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
                fetchStore(page - 1);
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
                fetchStore(page + 1);
              }}
            />
          )}
        </Pagination>
      </div>
    </div>
  );
};
export default MarketStore;
