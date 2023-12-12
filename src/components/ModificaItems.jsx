import { useEffect, useState } from "react";
import { Alert, Col, ListGroup, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { clearAll } from "../redux/action/BuildActions";
import { errorHandler } from "../redux/action/UserAction";
import SingleItemAdmin from "./SingleItemAdmin";

const ModificaItems = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const [totpages, setTotPages] = useState();
  const [page, setPage] = useState(1);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const [items, setItems] = useState();

  const getAllItems = async (p) => {
    try {
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/get_attivi?page=${p - 1}`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setItems(data.content);
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
    getAllItems(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {items && (
        <>
          <div id="carrello" className="m-3 p-1 mt-5">
            <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
              MAGAZZINO
            </p>
            <div className=" mt-5">
              <ListGroup>
                <ListGroup.Item
                  style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                  className="rounded my-1 py-3"
                >
                  <Row className="g-3">
                    <Col xs={8} sm={4}>
                      <div className="buttonClick">
                        {" "}
                        <p>Nome</p>
                      </div>
                    </Col>

                    <Col xs={4} sm={4}>
                      <div>
                        <p>Prezzo</p>
                      </div>
                    </Col>
                    <Col xs={8} sm={3}>
                      <div>
                        {" "}
                        <p>Quantità</p>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {items.map((elem, index) => (
                  <ListGroup.Item
                    key={`singleBuilAdminDettaglio-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleItemAdmin elem={elem} getAllItems={getAllItems} p={page} />
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
                        getAllItems(page - 1);
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
                        getAllItems(page + 1);
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

export default ModificaItems;
