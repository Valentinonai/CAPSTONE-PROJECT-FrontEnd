import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../redux/action/BuildActions";
import { Alert, Col, ListGroup, Pagination, Row } from "react-bootstrap";
import { errorHandler } from "../redux/action/UserAction";
import Footer from "./Footer";
import SingleOrderDettaglio from "./SingleOrderDettaglio";

const MyOrders = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const [totpages, setTotPages] = useState();
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState();
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);

  const getAllMyOrders = async (p) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/ordini/me?page=${p - 1}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setOrders(data.content);
        setTotPages(data.totalPages);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    getAllMyOrders(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {orders && (
        <>
          <div id="carrello" className="m-3 p-1 mt-5">
            <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
              I MIEI ORDINI
            </p>
            <div className=" mt-5">
              <ListGroup>
                <ListGroup.Item
                  style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                  className="rounded my-1 py-3"
                >
                  <Row>
                    <Col xs={6} sm={2}>
                      <div className="buttonClick">
                        {" "}
                        <p>Nome</p>
                      </div>
                    </Col>
                    <Col xs={3} sm={3} className="text-truncate d-none d-sm-block">
                      <div>
                        <p>Data creazione</p>
                      </div>
                    </Col>
                    <Col xs={3} sm={2} className="text-truncate d-none d-sm-block">
                      <div>
                        <p>Data consegna</p>
                      </div>
                    </Col>
                    <Col xs={6} sm={2}>
                      <div>
                        {" "}
                        <p>Prezzo</p>
                      </div>
                    </Col>
                    <Col xs={12} sm={2} className="d-none d-sm-block">
                      Stato
                    </Col>
                  </Row>
                </ListGroup.Item>

                {orders.map((elem, index) => (
                  <ListGroup.Item
                    key={`singleBuildDettaglio-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleOrderDettaglio elem={elem} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  {page === 1 ? (
                    <Pagination.Prev disabled />
                  ) : (
                    <Pagination.Prev
                      onClick={() => {
                        setPage(page - 1);
                        getAllMyOrders(page - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  )}
                  <Pagination.Item>{page}</Pagination.Item>
                  {page === totpages ? (
                    <Pagination.Next disabled />
                  ) : (
                    <Pagination.Next
                      onClick={() => {
                        setPage(page + 1);
                        getAllMyOrders(page + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  )}
                </Pagination>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default MyOrders;
