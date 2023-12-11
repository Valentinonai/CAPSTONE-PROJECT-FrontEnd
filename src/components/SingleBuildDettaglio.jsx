import { Col, Row } from "react-bootstrap";
import { Cart, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
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
import { errorHandler, messageHandler } from "../redux/action/UserAction";
import { addBuildCarrello } from "../redux/action/CarrelloActions";

const SingleBuildDettaglio = ({ elem, getAllMyBuilds, setPage }) => {
  const token = useSelector((state) => state.userReducer.token);
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
  const eliminaBuild = async () => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/builds/cancella_build/${elem.id}/me`, {
        method: "DELETE",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (risp.ok) {
        dispatch(messageHandler(true, "Build eliminata"));
        setTimeout(() => {
          dispatch(messageHandler(false, ""));
          setPage(1);
          getAllMyBuilds(1);
        }, 2000);
      } else throw new Error("Build non eliminata");
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  const aggiungiAlCarrello = () => {
    dispatch(addBuildCarrello(elem, 1));
  };
  return (
    <>
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
            <Cart onClick={() => aggiungiAlCarrello()} className="buttonClick" />
          </div>
        </Col>
        <Col xs={1}>
          <Trash
            className="buttonClick"
            onClick={() => {
              eliminaBuild();
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default SingleBuildDettaglio;
