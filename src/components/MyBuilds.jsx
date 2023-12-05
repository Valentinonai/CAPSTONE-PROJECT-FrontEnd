import { useEffect, useState } from "react";
import { clearAll } from "../redux/action/BuildActions";
import { useDispatch, useSelector } from "react-redux";
import { getMyBuilds, saveMyBuilds } from "../redux/action/UserAction";
import Footer from "./Footer";
import { Alert, ListGroup, Pagination } from "react-bootstrap";
import SingleBuildDettaglio from "./SingleBuildDettaglio";

const MyBuilds = () => {
  const dispatch = useDispatch();
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
  }, []);
  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {builds && (
        <>
          <div id="carrello" className="m-3 p-1 mt-5">
            <p className="ms-2 ms-md-4 my-5 h1" style={{ fontWeight: "bold", fontSize: "60px" }}>
              MY BUILDS
            </p>
            <div className=" mt-5">
              <ListGroup>
                {builds.map((elem, index) => (
                  <ListGroup.Item
                    key={`singleBuildDettaglio-${index}`}
                    style={{ backgroundColor: "transparent", border: "1px solid grey" }}
                    className="rounded my-1 py-3"
                  >
                    <SingleBuildDettaglio elem={elem} />
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
