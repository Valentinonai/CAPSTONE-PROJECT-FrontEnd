import { Badge, Button, Card } from "react-bootstrap";
import "../style/Store.css";
import { Cart, DashCircle, Heart, HeartFill, PlusCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { aggiungiPreferiti, rimuoviPreferiti } from "../redux/action/MarketStoreAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addCarrello } from "../redux/action/CarrelloActions";

const CardItemBuild = ({ elem, selezionato, setSelezionato }) => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const addPreferiti = (elem) => {
    dispatch(aggiungiPreferiti(elem.id, token));
  };
  const removePreferiti = (elem) => {
    dispatch(rimuoviPreferiti(elem.id, token));
  };
  return (
    <Card className={selezionato && selezionato.id === elem.id ? "cardItem selezionato" : "cardItem"}>
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={elem.immagineUrl}
          className="imgCard"
          style={{ cursor: "pointer" }}
          onClick={() => {
            nav(`/dettaglio/${elem.id}`);
          }}
        />
        {elem.quantità === 0 && (
          <Badge bg="warning" className="align-self-end mb-3 soldout">
            Sold out
          </Badge>
        )}
        {user.items.find((x) => x.id === elem.id) ? (
          <HeartFill
            style={{ color: "red" }}
            onClick={() => {
              removePreferiti(elem);
            }}
            className="preferiti"
          />
        ) : (
          <Heart
            onClick={() => {
              addPreferiti(elem);
            }}
            className="preferiti"
          />
        )}
      </div>
      <Card.Body className="d-flex flex-column align-items-start">
        <Card.Title className="cardItemTitle">{elem.nome}</Card.Title>
        <Card.Text>{elem.marca}</Card.Text>
        <Card.Text>categoria: {elem.categoria}</Card.Text>

        <div className="d-flex justify-content-end align-items-center w-100">
          <Badge bg="info" className="align-self-end mb-3 p-2">
            {elem.prezzo}€
          </Badge>
        </div>
        <Button
          variant="primary"
          className={elem.quantità === 0 ? " cardButton disabled" : " cardButton "}
          onClick={() => {
            setSelezionato(elem);
          }}
        >
          Seleziona
        </Button>
      </Card.Body>
    </Card>
  );
};
export default CardItemBuild;
