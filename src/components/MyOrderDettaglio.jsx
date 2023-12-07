import { useEffect, useState } from "react";
import { Alert, Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandler } from "../redux/action/UserAction";
import Footer from "./Footer";
import SingleItemOrdine from "./SingleItemOrdine";
import SingleBuildOrdine from "./SingleBuildOrdine";
import { clearAll } from "../redux/action/BuildActions";

const MyOrderDettaglio = () => {
  const token = useSelector((state) => state.userReducer.token);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const nav = useNavigate();
  const param = useParams();
  const [ordine, setOrdine] = useState();
  const [itemList, setItemList] = useState();
  const [buildList, setBuildList] = useState();

  const preparaOrdine = (o) => {
    const items = [];
    const builds = [];
    let found = false;
    o.items.forEach((elem) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].item.id === elem.id) {
          items[i].q += 1;
          found = true;
        }
      }
      if (found === false) {
        items.push({ item: elem, q: 1 });
      } else {
        found = false;
      }
    });
    setItemList(items);
    found = false;
    o.builds.forEach((elem) => {
      for (let i = 0; i < builds.length; i++) {
        if (builds[i].build.id === elem.id) {
          builds[i].q += 1;
          found = true;
        }
      }
      if (found === false) {
        builds.push({ build: elem, q: 1 });
      } else {
        found = false;
      }
    });
    setBuildList(builds);
  };

  const getOrder = async (id) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/ordini/me/${id}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setOrdine(data);
        preparaOrdine(data);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };

  useEffect(() => {
    getOrder(param.order_id);
    dispatch(clearAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {ordine && (
        <>
          <div id="carrello" className="m-3 p-1 mt-5">
            <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
              ORDINE N° {ordine.id}
            </p>
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <Row className="align-items-center">
                  <Col xs={5} sm={5} md={4} className="text-truncate">
                    {" "}
                    <p>Nome</p>
                  </Col>
                  <Col xs={2} className="d-none d-sm-block">
                    {" "}
                    <p>Prezzo</p>
                  </Col>
                  <Col xs={2} className="d-none d-md-block">
                    {" "}
                    <p>Categoria</p>
                  </Col>
                  <Col xs={5} sm={4} md={2}>
                    {" "}
                    <p>Quantità</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              {ordine.builds.length === 0 && ordine.items.length === 0 ? (
                <p className="text-center mt-4">Nessun elemento in questo ordine</p>
              ) : (
                itemList.length > 0 &&
                itemList.map((elem, index) => (
                  <ListGroupItem
                    key={`carrelloItem-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleItemOrdine elem={elem} index={index} />
                  </ListGroupItem>
                ))
              )}
              {buildList.length > 0 &&
                buildList.map((elem, index) => (
                  <ListGroupItem
                    key={`carrelloItem-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleBuildOrdine elem={elem} index={index} />
                  </ListGroupItem>
                ))}
            </ListGroup>
            {(ordine.items.length > 0 || ordine.builds.length > 0) && (
              <div>
                <p className="h2 d-flex justify-content-end mt-4 me-3">Totale: {ordine.prezzo.toFixed(2)}€</p>
              </div>
            )}

            {(ordine.items.length > 0 || ordine.builds.length > 0) && (
              <div className=" mt-5 ">
                {" "}
                <Button
                  variant="outline-secondary"
                  className=""
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <span className="fs-4">Indietro</span>
                </Button>
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyOrderDettaglio;
