import { useEffect, useState } from "react";
import { Accordion, Alert, Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearMarket, getAll, getByCategoria, getSingleItem } from "../redux/action/MarketStoreAction";
import CardVuota from "./CardVuota";
import CardItemStore from "./CardItemStore";
import Footer from "./Footer";
import "../style/Store.css";
import { clearAll } from "../redux/action/BuildActions";
const Preferiti = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const items = useSelector((state) => state.marketStoreReducer.items);
  const load = useSelector((state) => state.mainReducer.isLoading);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const dispatch = useDispatch();
  const getAllPreferiti = () => {
    for (let i = 0; i < user.items.length; i++) {
      dispatch(getSingleItem(token, user.items[i].id));
    }
  };

  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(clearMarket());
    getAllPreferiti();
  }, [user]);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {!user && <h4 className="text-center mt-5">Effettua il login per visualizzare i preferiti</h4>}

      {user && (
        <>
          <div className="mt-5 mx-1 pt-4 store pb-5" style={{ position: "relative" }}>
            <p className=" h1 ms-0 ms-sm-2 ms-md-4 mb-5 mt-3" style={{ fontWeight: "bold", fontSize: "50px" }}>
              PREFERITI
            </p>
            {user && user.items.length === 0 && <h4 className="text-center mt-5">Non ci sono preferiti</h4>}
            {/* ------------CARICAMENTO------------- */}
            {user && load && (
              <Row xs={1} sm={2} md={3} lg={5} className="gy-5 mx-0 mx-md-2">
                {[...Array(user.items.length).keys()].map((elem) => (
                  <Col>
                    {" "}
                    <CardVuota />
                  </Col>
                ))}
              </Row>
            )}
            {user && items && items.length > 0 && (
              <>
                <Row xs={1} sm={2} xl={5} className="gy-5 mx-0 mx-md-2">
                  {items.map((elem) => (
                    <Col>
                      <CardItemStore elem={elem} />
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default Preferiti;
