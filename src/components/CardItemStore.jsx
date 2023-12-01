import { Badge, Button, Card } from "react-bootstrap";
import "../style/Store.css";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { aggiungiPreferiti, rimuoviPreferiti } from "../redux/action/MarketStoreAction";

const CardItemStore = ({ elem }) => {
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const addPreferiti = (elem) => {
    dispatch(aggiungiPreferiti(elem.id, token));
  };
  const removePreferiti = (elem) => {
    dispatch(rimuoviPreferiti(elem.id, token));
  };
  return (
    <Card className=" cardItem">
      <div style={{ position: "relative" }}>
        <Card.Img variant="top" src={elem.immagineUrl} className="imgCard" />
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
        <Badge bg="primary" className="align-self-end mb-3">
          {elem.prezzo}€
        </Badge>
        <Button variant="primary" className="align-self-end cardButton">
          Add
        </Button>
      </Card.Body>
    </Card>
  );
};
export default CardItemStore;
