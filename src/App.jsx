import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Settings from "./components/Settings";
import MarketStore from "./components/MarketStore";
import DettaglioItem from "./components/DettaglioItem";
import Carrello from "./components/Carrello";
import Build from "./components/Build";
import SchedaMadre from "./components/SchedaMadre";
import Cpu from "./components/Cpu";
import Ram from "./components/Ram";
import Case from "./components/Case";
import SchedaGrafica from "./components/SchedaGrafica";
import HardDisk from "./components/HardDisk";
import Ventole from "./components/Ventole";
import Alimentatore from "./components/Alimentatore";
import BuildDettaglio from "./components/BuildDettaglio";
import MyBuilds from "./components/MyBuilds";
import MyOrders from "./components/MyOrders";

function App() {
  return (
    <Container fluid="xxl" id="mainContainer" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/store" element={<MarketStore />} />
          <Route path="/dettaglio/:item_id" element={<DettaglioItem />} />
          <Route path="/carrello" element={<Carrello />} />
          <Route path="/build" element={<Build />} />
          <Route path="/build/scheda_madre" element={<SchedaMadre />} />
          <Route path="/build/cpu" element={<Cpu />} />
          <Route path="/build/ram" element={<Ram />} />
          <Route path="/build/case" element={<Case />} />
          <Route path="/build/scheda_grafica" element={<SchedaGrafica />} />
          <Route path="/build/hard_disk" element={<HardDisk />} />
          <Route path="/build/ventole" element={<Ventole />} />
          <Route path="/build/alimentatore" element={<Alimentatore />} />
          <Route path="/build/dettaglio/:state" element={<BuildDettaglio />} />
          <Route path="/my_builds" element={<MyBuilds />} />
          <Route path="/my_orders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
