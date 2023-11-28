import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import TopBar from "./components/TopBar";

function App() {
  return (
    <Container fluid="sm" id="mainContainer" className="p-0">
      <BrowserRouter>
        <TopBar />
        <div className="p-3">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
