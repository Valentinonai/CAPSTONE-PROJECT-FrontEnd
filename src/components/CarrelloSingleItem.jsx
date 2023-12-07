import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DashCircle, PlusCircle, Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { modifyQt, removeCarrello } from "../redux/action/CarrelloActions";
import { useNavigate } from "react-router-dom";

const CarrelloSingleItem = ({ elem, index }) => {
  const [qt, setQt] = useState(elem.quantita);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const modificaQuantita = (q) => {
    dispatch(modifyQt(elem.item, q));
  };
  const eliminaCarrello = () => {
    dispatch(removeCarrello(elem.item));
  };

  useEffect(() => {
    setQt(elem.quantita);
  }, [elem, qt]);
  return (
    <Row>
      <Col xs={1} className="d-none d-md-block">
        <div>
          {" "}
          <p>{index + 1}</p>
        </div>
      </Col>
      <Col xs={5} sm={5} md={4} className="text-truncate">
        <div
          onClick={() => {
            nav(`/dettaglio/${elem.item.id}`);
          }}
          className="buttonClick"
        >
          {" "}
          <p>{elem.item.nome}</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-sm-block">
        <div>
          {" "}
          <p>{elem.item.prezzo * qt}€</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-md-block">
        <div>
          {" "}
          <p>{elem.item.categoria}</p>
        </div>
      </Col>
      <Col xs={5} sm={4} md={2}>
        <div>
          <DashCircle
            className="me-2 buttonClick"
            onClick={() => {
              if (qt > 1) {
                setQt(qt - 1);
                modificaQuantita(qt - 1);
              }
            }}
          />
          {qt}
          <PlusCircle
            className="ms-2 buttonClick"
            onClick={() => {
              if (qt < elem.item.quantità) {
                setQt(qt + 1);
                modificaQuantita(qt + 1);
              }
            }}
          />
        </div>
      </Col>
      <Col xs={2} sm={1}>
        <Trash
          className="buttonClick"
          onClick={() => {
            eliminaCarrello();
          }}
        />
      </Col>
    </Row>
  );
};

export default CarrelloSingleItem;
