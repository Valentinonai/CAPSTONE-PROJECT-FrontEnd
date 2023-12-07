import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SingleItemOrdine = ({ elem }) => {
  const nav = useNavigate();

  useEffect(() => {}, []);
  return (
    <Row>
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
          <p>{(elem.item.prezzo * elem.q).toFixed(2)}€</p>
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
          <p>{elem.q}</p>
        </div>
      </Col>
    </Row>
  );
};

export default SingleItemOrdine;
