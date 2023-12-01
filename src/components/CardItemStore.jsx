import { Badge, Button, Card } from "react-bootstrap";
import "../style/Store.css";
import { Cart, Heart, HeartFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { aggiungiPreferiti, rimuoviPreferiti } from "../redux/action/MarketStoreAction";
import { useNavigate } from "react-router-dom";

const CardItemStore = ({ elem }) => {
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
    <Card className=" cardItem">
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
        <Badge bg="info" className="align-self-end mb-3 p-2">
          {elem.prezzo}€
        </Badge>
        <Button variant="primary" className={elem.quantità === 0 ? " cardButton disabled" : " cardButton "}>
          <Cart />
        </Button>
      </Card.Body>
    </Card>
  );
};
export default CardItemStore;
