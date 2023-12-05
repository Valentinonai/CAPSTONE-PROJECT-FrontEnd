import { Col, Row } from "react-bootstrap";
import { Cart, Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
  addAlimentatore,
  addCase,
  addCpu,
  addHardDisk,
  addRam,
  addSchedaGrafica,
  addSchedaMadre,
  addVentole,
} from "../redux/action/BuildActions";
import { useNavigate } from "react-router-dom";

const SingleBuildDettaglio = ({ elem }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const goToBuildDetail = () => {
    for (let i = 0; i < elem.items.length; i++) {
      switch (elem.items[i].categoria) {
        case "SCHEDA_MADRE":
          dispatch(addSchedaMadre(elem.items[i]));
          break;
        case "CPU":
          dispatch(addCpu(elem.items[i]));
          break;
        case "RAM":
          dispatch(addRam(elem.items[i]));
          break;
        case "CASE":
          dispatch(addCase(elem.items[i]));
          break;
        case "SCHEDA_GRAFICA":
          dispatch(addSchedaGrafica(elem.items[i]));
          break;
        case "HARD_DISK":
          dispatch(addHardDisk(elem.items[i]));
          break;
        case "ALIMENTATORE":
          dispatch(addAlimentatore(elem.items[i]));
          break;
        case "VENTOLE":
          dispatch(addVentole(elem.items[i]));
          break;
        default:
          break;
      }
    }
    nav(`/build/dettaglio/${1}`);
  };
  return (
    <>
      {console.log(elem)}
      <Row>
        <Col xs={4} sm={3}>
          <div
            className="buttonClick"
            onClick={() => {
              goToBuildDetail();
            }}
          >
            {" "}
            <p>Build n°{elem.id}</p>
          </div>
        </Col>
        <Col xs={3} sm={3} className="text-truncate d-none d-sm-block">
          <div>
            <p>{elem.data_creazione}</p>
          </div>
        </Col>
        <Col xs={4} sm={3}>
          <div>
            {" "}
            <p>{elem.prezzo.toFixed(2)}€</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <Cart />
          </div>
        </Col>
        <Col xs={1}>
          <Trash className="buttonClick" onClick={() => {}} />
        </Col>
      </Row>
    </>
  );
};

export default SingleBuildDettaglio;
