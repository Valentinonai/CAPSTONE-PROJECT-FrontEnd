import { useEffect, useRef, useState } from "react";
import { Button, Form, Image, Offcanvas, Spinner } from "react-bootstrap";
import { ChevronCompactUp, ChevronCompactDown } from "react-bootstrap-icons";
import "../style/message.css";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { aggiungiMessaggio, ottieniRisposta } from "../redux/action/ChatActions";

const Message = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const isLoadingChat = useSelector((state) => state.mainReducer.isLoadingChat);
  const thread = useSelector((state) => state.userReducer.thread);
  const messages = useSelector((state) => state.chatReducer.messages);
  const toggleOffcanvas = () => {
    scrollToBottom();
    setShow(!show);
  };
  const inviaRichiesta = () => {
    dispatch(aggiungiMessaggio(message));
    dispatch(ottieniRisposta(message, token, thread));
    setMessage("");
  };
  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message, messages]);
  return (
    <>
      {user && (
        <>
          <Button variant="light" onClick={toggleOffcanvas} className="me-2 in-basso" style={{ width: "280px" }}>
            <div className="d-flex justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center">
                <Image src={user.immagineUrl} width={30} height={30} roundedCircle className="me-2" />
                <p className="m-0"> Chat</p>
              </div>
              <ChevronCompactUp />
            </div>
          </Button>
          <Offcanvas
            show={show}
            toggleOffcanvas={toggleOffcanvas}
            placement="bottom"
            scroll="true"
            style={{ width: "280px" }}
          >
            <Offcanvas.Header
              className="d-flex justify-content-between align-items-center buttonClick"
              onClick={toggleOffcanvas}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <Image src={user.immagineUrl} width={30} height={30} roundedCircle className="me-2" />
                <p className="m-0"> Chat</p>
              </div>
              <ChevronCompactDown />
            </Offcanvas.Header>
            <hr className="m-0" />
            <Offcanvas.Body className="d-flex flex-column justify-content-between ">
              <div className="d-flex flex-column " id="chatBody" ref={chatBodyRef}>
                {" "}
                <Chat />
                {isLoadingChat && (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" variant="secondary" className="mb-3">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
              </div>
              <div>
                <hr className="m-0" />
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    inviaRichiesta();
                  }}
                >
                  <Form.Group className="mt-3">
                    <Form.Label>Messaggio</Form.Label>
                    <Form.Control
                      required
                      value={message}
                      type="text"
                      placeholder="Message"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      style={{ boxShadow: "none", fontSize: "12px" }}
                      className="inputSettings"
                    />
                  </Form.Group>
                </Form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
};
export default Message;
