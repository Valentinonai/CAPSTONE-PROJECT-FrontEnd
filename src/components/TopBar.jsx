import {
  Alert,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearBuilds, fetchGetUser, userLogout } from "../redux/action/UserAction";
import { useEffect, useState } from "react";
import { Cart } from "react-bootstrap-icons";
import { clearCart } from "../redux/action/CarrelloActions";
import { clearAll } from "../redux/action/BuildActions";
import { isLoadingChat, resetChat } from "../redux/action/ChatActions";
import InserimentoGenerico from "./InserimentoGenerico";
import InserimentoSchedaMadre from "./InserimentoSchedaMadre";
import { creaItem } from "../redux/action/CreaProdotti";
import InserimentoCpu from "./InserimentoCpu";

const TopBar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const carrello = useSelector((state) => state.carrelloReducer);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const loc = useLocation();
  const dispatch = useDispatch();
  const [cat, setCat] = useState();
  const [lgShow, setLgShow] = useState(false);

  const [nome, setNome] = useState();
  const [marca, setMarca] = useState();
  const [prezzo, setPrezzo] = useState();
  const [descrizione, setDescrizione] = useState();
  const [data_rilascio, setData_rilascio] = useState();
  const [image, setImage] = useState();
  const [potenzaPicco, setPotenzaPicco] = useState();
  const [quantita, setQuantita] = useState();

  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [input3, setInput3] = useState();
  const [input4, setInput4] = useState();
  const [input5, setInput5] = useState();
  const [input6, setInput6] = useState();
  const [input7, setInput7] = useState();
  const [input8, setInput8] = useState();
  const [input9, setInput9] = useState();
  const [input10, setInput10] = useState();

  const logout = () => {
    dispatch(userLogout());
    dispatch(clearCart());
    dispatch(clearAll());
    dispatch(resetChat());
    dispatch(isLoadingChat(false));
    dispatch(clearBuilds());
  };
  const svuotaCampi = () => {
    setNome("");
    setMarca("");
    setDescrizione("");
    setData_rilascio("");
    setImage("");
    setPrezzo("");
    setQuantita("");
    setPotenzaPicco("");
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");
    setInput7("");
    setInput8("");
    setInput9("");
    setInput10("");
  };
  const handleSubmit = () => {
    switch (cat) {
      case "Scheda_madre": {
        creaItem(
          {
            marca: marca,
            nome: nome,
            descrizione: descrizione,
            prezzo: prezzo,
            data_di_rilascio: data_rilascio,
            potenza_di_picco: potenzaPicco,
            quantita: quantita,
            formato: input1,
            chipset: input2,
            socket: input3,
            tipo_di_memoria: input4,
            max_memory_size: input5,
            has_wifi: input6,
            has_bluetooth: input7,
            numero_porte_usb: input10,
            numero_pcie: input9,
            supporto_m2: input8,
          },
          dispatch,
          cat,
          token,
          image,
          setLgShow
        );
        break;
      }
      case "Cpu": {
        creaItem(
          {
            marca: marca,
            nome: nome,
            descrizione: descrizione,
            prezzo: prezzo,
            data_di_rilascio: data_rilascio,
            potenza_di_picco: potenzaPicco,
            quantita: quantita,
            socket: input1,
            numero_core: input2,
            numero_threads: input3,
            max_boost_clock: input4,
            cache_l2: input5,
            cache_l3: input6,
            max_temperatura: input7,
            grafica_integrata: input8,
            tipo_memoria_di_sistema: input9,
          },
          dispatch,
          cat,
          token,
          image,
          setLgShow
        );
        break;
      }
      default:
        break;
    }
    svuotaCampi();
  };
  useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [carrello]);
  return (
    <>
      <Navbar expand="lg" id="topBar" className="px-2" style={{ marginInline: "-12px" }}>
        <div>
          <Link to={"/"} className="me-3 mb-lg-0 mb-3">
            {" "}
            <Image src={logo} roundedCircle width={"80px"} style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center" id="topbarUserSection">
          <div style={{ position: "relative" }}>
            <Link to={"/carrello"}>
              {" "}
              <Cart className="text-white me-4 fs-4" />
              <div
                className={
                  carrello.items.length || carrello.builds.length
                    ? "badgeCarrello badgeCarrelloAttivo"
                    : "badgeCarrello"
                }
              >
                {carrello.items.reduce((tot, elem) => (tot += elem.quantita), 0) +
                  carrello.builds.reduce((tot, elem) => (tot += elem.quantita), 0)}
              </div>
            </Link>
          </div>
          <NavDropdown
            title={user ? user.nome : "User"}
            drop="down"
            align="end"
            id="basic-nav-dropdown"
            className="me-2"
          >
            {user && user.ruolo !== "INATTIVO" && (
              <NavDropdown.Item>
                <Link to={"/my_builds"}>My Builds</Link>
              </NavDropdown.Item>
            )}
            {user && user.ruolo !== "INATTIVO" && (
              <NavDropdown.Item>
                <Link to={"/my_orders"}>Miei Ordini</Link>
              </NavDropdown.Item>
            )}

            {user && user.ruolo !== "INATTIVO" && (
              <NavDropdown.Item>
                <Link to={"/preferiti"}>Preferiti</Link>
              </NavDropdown.Item>
            )}
            {user && user.ruolo !== "INATTIVO" && (
              <NavDropdown.Item>
                <Link to={"/settings"}>Settings</Link>
              </NavDropdown.Item>
            )}
            {user && user.ruolo !== "INATTIVO" && (
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
            {(!user || user.ruolo === "INATTIVO") && (
              <NavDropdown.Item>
                <Link to={"/login"}>Login</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
          <Image
            src={
              user && user.ruolo !== "INATTIVO"
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
        <Navbar.Collapse id="basic-navbar-nav" className="mt-4 mt-lg-0">
          <Nav className="me-auto d-flex justify-content-center align-items-center">
            <Link
              to={"/"}
              className={
                loc.pathname === "/"
                  ? "topbarSelected ms-3 ms-lg-0 mb-2 mb-lg-0  mt-lg-0"
                  : "ms-3 ms-lg-0 mb-2 mb-lg-0  mt-lg-0"
              }
            >
              Home
            </Link>
            <Link
              to={"/store"}
              className={
                loc.pathname === "/store" ? "topbarSelected ms-3 mb-2 mb-lg-0  mt-lg-0" : "ms-3 mb-2 mb-lg-0 mt-lg-0"
              }
            >
              Store
            </Link>
            <Link
              to={"/build"}
              className={
                loc.pathname === "/build" ? "topbarSelected ms-3 mb-2 mb-lg-0  mt-lg-0" : "ms-3 mb-2 mb-lg-0 mt-lg-0"
              }
            >
              Build
            </Link>
            {user && user.ruolo === "ADMIN" && (
              <Link
                to={"/statistiche"}
                className={
                  loc.pathname === "/statistiche"
                    ? "topbarSelected ms-3 mb-2 mb-lg-0  mt-lg-0"
                    : "ms-3 mb-2 mb-lg-0 mt-lg-0"
                }
              >
                Statistiche
              </Link>
            )}
            {user && user.ruolo !== "INATTIVO" && user.ruolo === "ADMIN" && (
              <Link
                to={"/all_orders"}
                className={
                  loc.pathname === "/all_orders"
                    ? "topbarSelected ms-3 mb-2 mb-lg-0  mt-lg-0"
                    : "ms-3 mb-2 mb-lg-0 mt-lg-0"
                }
              >
                All Orders
              </Link>
            )}
            {user && user.ruolo !== "INATTIVO" && user.ruolo === "ADMIN" && (
              <Link
                to={"/modifica_items"}
                className={
                  loc.pathname === "/modifica_items"
                    ? "topbarSelected ms-3 mb-2 mb-lg-0  mt-lg-0"
                    : "ms-3 mb-2 mb-lg-0 mt-lg-0"
                }
              >
                Magazzino
              </Link>
            )}
            {user && user.ruolo !== "INATTIVO" && user.ruolo === "ADMIN" && (
              <DropdownButton
                align="middle"
                variant="outline-primary"
                id="dropdown-basic-button"
                title="Aggiungi"
                className="ms-3"
              >
                <Dropdown.Item
                  onClick={() => {
                    setCat("Scheda_madre");
                    setLgShow(true);
                  }}
                >
                  Scheda madre
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Cpu");
                    setLgShow(true);
                  }}
                >
                  Cpu
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Ram");
                    setLgShow(true);
                  }}
                >
                  Ram
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Case");
                    setLgShow(true);
                  }}
                >
                  Case
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Scheda_grafica");
                    setLgShow(true);
                  }}
                >
                  Scheda grafica
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Hard_disk");
                    setLgShow(true);
                  }}
                >
                  Hard disk
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Ventole");
                    setLgShow(true);
                  }}
                >
                  Ventole
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCat("Alimentatore");
                    setLgShow(true);
                  }}
                >
                  Alimentatore
                </Dropdown.Item>
              </DropdownButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => {
          svuotaCampi();
          setLgShow(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
        {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Aggiungi {cat}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Row className="mb-3 g-3" xs={2}>
              <InserimentoGenerico
                nome={nome}
                marca={marca}
                descrizione={descrizione}
                data_rilascio={data_rilascio}
                image={image}
                prezzo={prezzo}
                setNome={setNome}
                setMarca={setMarca}
                setDescrizione={setDescrizione}
                setData_rilascio={setData_rilascio}
                setImage={setImage}
                setPrezzo={setPrezzo}
                potenzaPicco={potenzaPicco}
                setPotenzaPicco={setPotenzaPicco}
                quantita={quantita}
                setQuantita={setQuantita}
              />
              <hr className="mt-4" />
              <hr className="mt-4" />
              {cat === "Scheda_madre" && (
                <InserimentoSchedaMadre
                  input1={input1}
                  setInput1={setInput1}
                  input2={input2}
                  setInput2={setInput2}
                  input3={input3}
                  setInput3={setInput3}
                  input4={input4}
                  setInput4={setInput4}
                  input5={input5}
                  setInput5={setInput5}
                  input6={input6}
                  setInput6={setInput6}
                  input7={input7}
                  setInput7={setInput7}
                  input8={input8}
                  setInput8={setInput8}
                  input9={input9}
                  setInput9={setInput9}
                  input10={input10}
                  setInput10={setInput10}
                />
              )}
              {cat === "Cpu" && (
                <InserimentoCpu
                  input1={input1}
                  setInput1={setInput1}
                  input2={input2}
                  setInput2={setInput2}
                  input3={input3}
                  setInput3={setInput3}
                  input4={input4}
                  setInput4={setInput4}
                  input5={input5}
                  setInput5={setInput5}
                  input6={input6}
                  setInput6={setInput6}
                  input7={input7}
                  setInput7={setInput7}
                  input8={input8}
                  setInput8={setInput8}
                  input9={input9}
                  setInput9={setInput9}
                />
              )}
            </Row>

            <Button type="submit" className="my-4">
              Submit form
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TopBar;
