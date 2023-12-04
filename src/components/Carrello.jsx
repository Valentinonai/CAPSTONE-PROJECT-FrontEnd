import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { DashCircle, Pencil, PlusCircle, Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import CarrelloSingleItem from "./CarrelloSingleItem";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Carrello = () => {
  const carrelloItems = useSelector((state) => state.carrelloReducer.items);
  const carrelloBuildes = useSelector((state) => state.carrelloReducer.bulds);

  return (
    <>
      <div id="carrello" className="m-3 p-1">
        <p className="ms-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "60px" }}>
          CARRELLO
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
              <Col xs={6} sm={5} md={4}>
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
              <Col xs={1}>
                <Trash />
              </Col>
            </Row>
          </ListGroup.Item>
          {carrelloItems.length === 0 ? (
            <p className="text-center mt-4">Nessun elemento nel carrello</p>
          ) : (
            carrelloItems.map((elem, index) => (
              <ListGroupItem
                key={`carrelloItem-${index}`}
                style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                className="rounded my-1 py-3 shadow"
              >
                <CarrelloSingleItem elem={elem} index={index} />
              </ListGroupItem>
            ))
          )}
        </ListGroup>
        <div className=" mt-5 ">
          {" "}
          <Button variant="outline-secondary" className="w-100 shadow">
            <span className="fs-4">Ordina</span>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Carrello;
