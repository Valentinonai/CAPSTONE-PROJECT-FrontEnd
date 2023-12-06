import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { DashCircle, Pencil, PlusCircle, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import CarrelloSingleItem from "./CarrelloSingleItem";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { clearAll } from "../redux/action/BuildActions";
import CarrelloSingleBuild from "./CarrelloSingleBuild";

const Carrello = () => {
  const carrelloItems = useSelector((state) => state.carrelloReducer.items);
  const carrelloBuildes = useSelector((state) => state.carrelloReducer.builds);
  const tot = useSelector((state) => state.carrelloReducer.totale);
  const dispatch = useDispatch();
  const calcolaTot = () => {
    let tot = 0;
    for (let i = 0; i < carrelloItems.length; i++) tot = tot + carrelloItems[i].item.prezzo * carrelloItems[i].quantita;
    for (let i = 0; i < carrelloBuildes.length; i++) tot = tot + carrelloBuildes[i].prezzo;
    return tot;
  };
  useEffect(() => {
    dispatch(clearAll());
  }, []);

  return (
    <>
      <div id="carrello" className="m-3 p-1 mt-5">
        <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
          CART
        </p>
        <ListGroup>
          <ListGroup.Item
            style={{ backgroundColor: "transparent", border: "1px solid grey" }}
            className="rounded my-1 py-3"
          >
            <Row className="align-items-center">
              <Col xs={1} className="d-none d-md-block">
                {" "}
                <p>N°</p>
              </Col>
              <Col xs={5} sm={5} md={4}>
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
              <Col xs={2} sm={1}>
                <Trash />
              </Col>
            </Row>
          </ListGroup.Item>
          {carrelloItems.length === 0 && carrelloBuildes.length === 0 ? (
            <p className="text-center mt-4">Nessun elemento nel carrello</p>
          ) : (
            carrelloItems.length > 0 &&
            carrelloItems.map((elem, index) => (
              <ListGroupItem
                key={`carrelloItem-${index}`}
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <CarrelloSingleItem elem={elem} index={index} />
              </ListGroupItem>
            ))
          )}
          {carrelloBuildes.length > 0 &&
            carrelloBuildes.map((elem, index) => (
              <ListGroupItem
                key={`carrelloItem-${index}`}
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3"
              >
                <CarrelloSingleBuild elem={elem} index={index} />
              </ListGroupItem>
            ))}
        </ListGroup>
        <div>
          <p className="h2 d-flex justify-content-end mt-4 me-3">Totale: {calcolaTot().toFixed(2)}€</p>
        </div>

        {carrelloItems.length !== 0 && (
          <div className=" mt-5 ">
            {" "}
            <Button variant="outline-secondary" className="w-100 ">
              <span className="fs-4">Ordina</span>
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Carrello;
