import { Col, Row } from "react-bootstrap";
import { DashCircle, PlusCircle, Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { modifyQtBuild, removeBuildCarrello } from "../redux/action/CarrelloActions";
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
import { useState } from "react";

const CarrelloSingleBuild = ({ elem, index }) => {
  const [qt, setQt] = useState(elem.quantita);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const modificaQuantita = (q) => {
    dispatch(modifyQtBuild(elem.build, q));
  };
  const eliminaCarrello = () => {
    dispatch(removeBuildCarrello(elem.build));
  };
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
      <Col xs={1} className="d-none d-md-block">
        <div>
          <p>{index + 1}</p>
        </div>
      </Col>
      <Col xs={5} sm={5} md={4} className="text-truncate">
        <div
          onClick={() => {
            goToBuildDetail();
          }}
          className="buttonClick"
        >
          {" "}
          <p>Build n° {elem.build.id}</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-sm-block">
        <div>
          {" "}
          <p>{(elem.build.prezzo * qt).toFixed(2)}€</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-md-block">
        <div>
          <p>BUILD</p>
        </div>
      </Col>
      <Col xs={5} sm={4} md={2}>
        <div>
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
                setQt(qt + 1);
                modificaQuantita(qt + 1);
              }}
            />
          </div>
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

export default CarrelloSingleBuild;
