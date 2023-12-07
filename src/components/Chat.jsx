import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Chat = () => {
  const messages = useSelector((state) => state.chatReducer.messages);
  return (
    messages &&
    messages.map((elem, index) =>
      index % 2 === 0 ? (
        <Row>
          <Col xs={10}>
            <p className="chatBot">{elem}</p>{" "}
          </Col>
          <Col xs={2}>{/* <p>bot</p> */}</Col>
        </Row>
      ) : (
        <Row>
          <Col xs={2}>{/* <p>you</p> */}</Col>
          <Col xs={10}>
            <p className="chatUtente ">{elem}</p>{" "}
          </Col>
        </Row>
      )
    )
  );
};
export default Chat;
