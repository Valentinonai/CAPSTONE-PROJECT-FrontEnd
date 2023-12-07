import { useEffect, useState } from "react";
import { clearAll } from "../redux/action/BuildActions";
import { useDispatch, useSelector } from "react-redux";
import { getMyBuilds } from "../redux/action/UserAction";
import Footer from "./Footer";
import { Alert, Col, ListGroup, Pagination, Row } from "react-bootstrap";
import SingleBuildDettaglio from "./SingleBuildDettaglio";

const MyBuilds = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const builds = useSelector((state) => state.userReducer.builds);
  const totpages = useSelector((state) => state.userReducer.pagesNumber);
  const [page, setPage] = useState(1);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);

  const getAllMyBuilds = (p) => {
    dispatch(getMyBuilds(token, p));
  };

  useEffect(() => {
    dispatch(clearAll());
    window.scrollTo({ top: 0, behavior: "smooth" });
    getAllMyBuilds(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {builds && (
        <>
          <div id="carrello" className="m-3 p-1 mt-5">
            <p className="ms-0 ms-sm-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "50px" }}>
              MY BUILDS
            </p>
            <div className=" mt-5">
              <ListGroup>
                <ListGroup.Item
                  style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                  className="rounded my-1 py-3"
                >
                  <Row>
                    <Col xs={4} sm={3}>
                      <div className="buttonClick">
                        {" "}
                        <p>N°</p>
                      </div>
                    </Col>
                    <Col xs={3} sm={3} className="text-truncate d-none d-sm-block">
                      <div>
                        <p>Data creazione</p>
                      </div>
                    </Col>

                    <Col xs={6} sm={3}>
                      <div>
                        {" "}
                        <p>Prezzo</p>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {builds.map((elem, index) => (
                  <ListGroup.Item
                    key={`singleBuildDettaglio-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleBuildDettaglio elem={elem} getAllMyBuilds={getAllMyBuilds} setPage={setPage} />
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
                        getAllMyBuilds(page - 1);
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
                        getAllMyBuilds(page + 1);
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
export default MyBuilds;
