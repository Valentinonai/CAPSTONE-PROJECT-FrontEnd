import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Settings from "./components/Settings";

function App() {
  return (
    <Container fluid="sm" id="mainContainer" className="p-0 " style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <TopBar />
        <div className="p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
