import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const SingleBuildOrdine = ({ elem }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const goToBuildDetail = () => {
    for (let i = 0; i < elem.build.items.length; i++) {
      switch (elem.build.items[i].categoria) {
        case "SCHEDA_MADRE":
          dispatch(addSchedaMadre(elem.build.items[i]));
          break;
        case "CPU":
          dispatch(addCpu(elem.build.items[i]));
          break;
        case "RAM":
          dispatch(addRam(elem.build.items[i]));
          break;
        case "CASE":
          dispatch(addCase(elem.build.items[i]));
          break;
        case "SCHEDA_GRAFICA":
          dispatch(addSchedaGrafica(elem.build.items[i]));
          break;
        case "HARD_DISK":
          dispatch(addHardDisk(elem.build.items[i]));
          break;
        case "ALIMENTATORE":
          dispatch(addAlimentatore(elem.build.items[i]));
          break;
        case "VENTOLE":
          dispatch(addVentole(elem.build.items[i]));
          break;
        default:
          break;
      }
    }
    nav(`/build/dettaglio/${1}`);
  };

  return (
    <Row>
      <Col xs={5} sm={5} md={4} className="text-truncate">
        <div onClick={() => goToBuildDetail()} className="buttonClick">
          {" "}
          <p>Build n° {elem.build.id}</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-sm-block">
        <div>
          {" "}
          <p>{(elem.build.prezzo * elem.q).toFixed(2)}€</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-md-block">
        <div>
          {" "}
          <p>BUILD</p>
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

export default SingleBuildOrdine;
