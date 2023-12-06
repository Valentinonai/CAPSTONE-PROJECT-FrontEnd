import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DashCircle, Pencil, PlusCircle, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { modificaTot, modify, removeBuildCarrello, removeCarrello } from "../redux/action/CarrelloActions";
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

const CarrelloSingleBuild = ({ elem, index }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const eliminaCarrello = () => {
    dispatch(removeBuildCarrello(elem));
  };
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
          <p>Build n° {elem.id}</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-sm-block">
        <div>
          {" "}
          <p>{elem.prezzo.toFixed(2)}€</p>
        </div>
      </Col>
      <Col xs={2} className="d-none d-md-block">
        <div>
          <p>BUILD</p>
        </div>
      </Col>
      <Col xs={5} sm={4} md={2}>
        <div>
          <DashCircle className="me-2 buttonClick" style={{ visibility: "hidden" }} />
          {1}
          <PlusCircle className="ms-2 buttonClick" style={{ visibility: "hidden" }} />
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
