import { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../redux/action/UserAction";

const SingleOrderAdminDettaglio = ({ elem, getAllOrders, p }) => {
  const nav = useNavigate();
  const [selection, setSelection] = useState();
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  //   const goToOrdineDetail = () => {
  //     nav(`/my_orders/${elem.id}`);
  //   };
  const modificaStatoOrdine = async (s) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/ordini/${elem.id}?stato=${s}`, {
        method: "PUT",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        getAllOrders(p);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  useEffect(() => {
    setSelection(elem.stato);
  }, [elem]);
  return (
    <>
      {elem && (
        <Row>
          <Col xs={6} sm={2}>
            <div
              className="buttonClick"
              onClick={() => {
                // goToOrdineDetail();
              }}
            >
              {" "}
              <p>Ordine n°{elem.id}</p>
            </div>
          </Col>
          <Col xs={3} sm={3} className="text-truncate d-none d-sm-block">
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
          <Col xs={12} md={2} className="mt-4 mt-md-0">
            <Dropdown>
              <Dropdown.Toggle
                variant={selection === "IN_LAVORAZIONE" ? "primary" : selection === "SPEDITO" ? "warning" : "success"}
                id="dropdown-basic"
              >
                {selection}
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-white">
                <Dropdown.Item
                  onClick={() => {
                    setSelection("IN_LAVORAZIONE");
                    modificaStatoOrdine("IN_LAVORAZIONE");
                  }}
                >
                  IN_LAVORAZIONE
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelection("SPEDITO");
                    modificaStatoOrdine("SPEDITO");
                  }}
                >
                  SPEDITO
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSelection("CONSEGNATO");
                    modificaStatoOrdine("CONSEGNATO");
                  }}
                >
                  CONSEGNATO
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      )}
    </>
  );
};
export default SingleOrderAdminDettaglio;
