import { Badge, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleOrderDettaglio = ({ elem }) => {
  const token = useSelector((state) => state.userReducer.token);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <>
      <Row>
        <Col xs={6} sm={3}>
          <div
            className="buttonClick"
            onClick={() => {
              //   goToBuildDetail();
            }}
          >
            {" "}
            <p>Ordine n°{elem.id}</p>
          </div>
        </Col>
        <Col xs={3} sm={2} className="text-truncate d-none d-sm-block">
          <div>
            <p>{elem.data_creazione}</p>
          </div>
        </Col>
        <Col xs={3} sm={2} className="text-truncate d-none d-sm-block">
          <div>
            <p>{elem.data_di_consegna}</p>
          </div>
        </Col>
        <Col xs={6} sm={2}>
          <div>
            {" "}
            <p>{elem.prezzo.toFixed(2)}€</p>
          </div>
        </Col>
        <Col xs={12} sm={2} className="">
          <Badge bg={elem.stato === "IN_LAVORAZIONE" ? "primary" : elem.stato === "SPEDITO" ? "warning" : "success"}>
            {elem.stato}
          </Badge>
        </Col>
      </Row>
    </>
  );
};

export default SingleOrderDettaglio;
