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
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
