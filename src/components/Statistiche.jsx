import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler, isLoading } from "../redux/action/UserAction";
import { Alert, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import Footer from "./Footer";
import { clearAll } from "../redux/action/BuildActions";

const Statistiche = () => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const hasError = useSelector((state) => state.mainReducer.hasError);
  const hasMessage = useSelector((state) => state.mainReducer.hasMessage);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [vendite, setVendite] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [elementi, setElementi] = useState();
  // eslint-disable-next-line no-unused-vars
  const [quantita, setQuantita] = useState();
  const [dati, setDati] = useState();
  // eslint-disable-next-line no-unused-vars
  const [likes, setLikes] = useState();
  const [dati2, setDati2] = useState();
  const load = useSelector((state) => state.mainReducer.isLoading);

  const getAll = async () => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setItems(data);
        pezziVenduti(data);
        dispatch(isLoading(false));
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };

  const pezziVenduti = async (elementi) => {
    let x = [];
    for (let i = 0; i < elementi.length; i++) {
      try {
        dispatch(isLoading(true));
        const risp = await fetch(`${process.env.REACT_APP_BASEURL}/ordini/totale/${elementi[i].id}`, {
          method: "GET",
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await risp.json();
        if (risp.ok) {
          x.push({ nome: elementi[i].nome, id: elementi[i].id, pz_venduti: data });
          dispatch(isLoading(false));
        } else throw new Error(data.message);
      } catch (error) {
        dispatch(errorHandler(true, error.message));
        setTimeout(() => {
          dispatch(errorHandler(false, ""));
        }, 2000);
      }
    }
    x = x.filter((elem) => elem.pz_venduti > 0);
    x.sort((a, b) => {
      return b.pz_venduti - a.pz_venduti;
    });
    setVendite(x);
    preparaGrafico(x);
  };
  const getLikes = async () => {
    try {
      dispatch(isLoading(true));
      const risp = await fetch(`${process.env.REACT_APP_BASEURL}/users/likes`, {
        method: "GET",
        headers: {
          "content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await risp.json();
      if (risp.ok) {
        setLikes(data);
        dispatch(isLoading(false));
        graficoLikes(data.items_id, data.count_likes);
      } else throw new Error(data.message);
    } catch (error) {
      dispatch(errorHandler(true, error.message));
      setTimeout(() => {
        dispatch(errorHandler(false, ""));
      }, 2000);
    }
  };
  const getSingleItemByID = async (id) => {
    dispatch(isLoading(true));
    if (id !== undefined) {
      try {
        const risp = await fetch(`${process.env.REACT_APP_BASEURL}/items/${id}`, {
          method: "GET",
          headers: {
            "content-type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await risp.json();
        if (risp.ok) {
          dispatch(isLoading(false));
          return data;
        } else throw new Error(data.message);
      } catch (error) {
        dispatch(errorHandler(true, error.message));
        setTimeout(() => {
          dispatch(errorHandler(false, ""));
        }, 2000);
      }
    }
  };
  const graficoLikes = async (items_id, likes) => {
    const nomiItems = [];
    for (let i = 0; i < 12; i++) {
      const item = await getSingleItemByID(items_id[i]);
      nomiItems.push(item.nome);
    }
    setDati2({
      labels: nomiItems.slice(0, 12),
      datasets: [
        {
          indexAxis: "y",
          barPercentage: 0.8,
          barThickness: "30",
          offset: "200",
          label: "Quantità vendute",
          data: likes.slice(0, 12),
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          type: "bar",
        },
      ],
    });
  };
  const preparaGrafico = (x) => {
    const nomeElementi = [];
    const quantitaElementi = [];
    x.forEach((element) => {
      nomeElementi.push(element.nome);
      quantitaElementi.push(element.pz_venduti);
    });
    setElementi(nomeElementi.slice(0, 12));
    setQuantita(quantitaElementi.slice(0, 12));
    setDati({
      labels: nomeElementi.slice(0, 12),
      datasets: [
        {
          indexAxis: "y",
          barPercentage: 0.8,
          barThickness: "30",
          offset: "200",
          label: "Quantità vendute",
          data: quantitaElementi.slice(0, 12),
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          type: "bar",
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(clearAll());
    getAll();
    getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hasError.value && <Alert variant="danger">ERRORE: {hasError.message}</Alert>}
      {hasMessage.value && <Alert variant="success"> {hasMessage.message}</Alert>}
      {load && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {user && user.ruolo === "ADMIN" && !load && (
        <>
          <div className="mt-5 mx-1 pt-4 store" style={{ overflowX: "scroll" }}>
            <p className=" h1 ms-0 ms-sm-2 ms-md-4 mb-5 mt-3" style={{ fontWeight: "bold", fontSize: "50px" }}>
              {" "}
              STATISTICHE
            </p>
            <p className=" h2 ms-0 ms-sm-2 ms-md-4  my-5" style={{ fontWeight: "bold" }}>
              Prodotti più venduti
            </p>
            <div style={{ minWidth: "1200px" }} className="mb-5">
              {" "}
              <Bar data={dati} />
            </div>
            <hr />
            <p className=" h2 ms-0 ms-sm-2 ms-md-4  my-5" style={{ fontWeight: "bold" }}>
              Prodotti con più LIKE
            </p>
            <div style={{ minWidth: "1200px" }} className="mb-5">
              {" "}
              <Bar data={dati2} />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
export default Statistiche;
