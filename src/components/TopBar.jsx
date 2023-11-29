import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, userLogout } from "../redux/action/UserAction";
import { useEffect } from "react";

const TopBar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const loc = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, []);
  return (
    <Navbar expand="lg" id="topBar">
      <Container fluid="sm">
        <div>
          <Link to={"/"} className="me-3 mb-lg-0 mb-3">
            {" "}
            <Image src={logo} roundedCircle width={"80px"} style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center" id="topbarUserSection">
          <NavDropdown
            title={user ? user.nome : "User"}
            drop="down"
            align="end"
            id="basic-nav-dropdown"
            className="me-2"
          >
            {user && (
              <NavDropdown.Item>
                <Link to={"/settings"}>Settings</Link>
              </NavDropdown.Item>
            )}
            {user && (
              <NavDropdown.Item>
                <Link
                  to={"/"}
                  onClick={() => {
                    logout();
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Link>
              </NavDropdown.Item>
            )}
            {!user && (
              <NavDropdown.Item>
                <Link to={"/login"}>Login</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
          <Image
            src={
              user
                ? user.immagineUrl
                : "https://res.cloudinary.com/dzr77mvcs/image/upload/v1699804243/bqnqdcricxpzxojhihxz.webp"
            }
            roundedCircle
            width={"50px"}
            height={"50px"}
            className="me-3 d-none d-sm-block"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="topbarButton" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={"/"}
              className={
                loc.pathname === "/"
                  ? "topbarSelected ms-3 ms-lg-0 mb-2 mb-lg-0 mt-4 mt-lg-0"
                  : "ms-3 ms-lg-0 mb-2 mb-lg-0 mt-4 mt-lg-0"
              }
            >
              Home
            </Link>
            <Link
              to={"/store"}
              className={
                loc.pathname === "/store"
                  ? "topbarSelected ms-3 mb-2 mb-lg-0 mt-4 mt-lg-0"
                  : "ms-3 mb-2 mb-lg-0 mt-lg-0"
              }
            >
              Store
            </Link>
            <Link
              to={"/build"}
              className={
                loc.pathname === "/build"
                  ? "topbarSelected ms-3 mb-2 mb-lg-0 mt-4 mt-lg-0"
                  : "ms-3 mb-2 mb-lg-0 mt-lg-0"
              }
            >
              Build
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopBar;
