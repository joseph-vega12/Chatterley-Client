import { useState, useEffect } from "react";
import axios from "axios";
import SendMessagesForm from "./SendMessagesForm";
import { Container, Row, Col } from "react-bootstrap";

function Messages({ selectedRoom }) {
  const [messages, setMessages] = useState([]);
  // const socket = io("http://localhost:4000");
  // socket.on("send-message", ({ name, message }) => {
  //   setChat([...chat, { name, message }])
  useEffect(() => {
    if (selectedRoom != null) {
      axios
        .get(`http://localhost:4000/chat/messages/${selectedRoom}`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedRoom]);

  return selectedRoom === null ? (
    <div className="SelectRoomMessage">
      <h1>Select A Room</h1>
    </div>
  ) : (
    <Container fluid>
      <div className="Messages">
        <Row>
          {messages.map((message) => (
            <Col
              key={message.id}
              lg="12"
              className="d-flex justify-content-end"
            >
              <h4>{message.message}</h4>
            </Col>
          ))}
        </Row>
      </div>
      <SendMessagesForm selectedRoom={selectedRoom} />
    </Container>
  );
}
export default Messages;
