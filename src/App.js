import React, { useState, useEffect } from "react";
import "./App.css";
import { API_ENDPOINT } from "./config";
import {
  Button,
  Form,
  Container,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
const axios = require("axios");

function App() {
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {});

  const sendMessage = () => {
    if (!messageText) {
      alert("Don't leave the message blank");
      return;
    }

    let id = Math.floor(Math.random() * 10000);

    let data = {
      id,
      message: messageText,
    };

    axios
      .post(
        API_ENDPOINT +
          `users/${
            username.toLowerCase() === "matt" ? "rayanne" : "matt"
          }/sendMessage`,
        data
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    setMessageText("");
    setUsername("");
    setIsSendingMessage(false);
  };

  const getMessage = () => {
    axios.get(API_ENDPOINT + "users/matt/getMessage").then(function (res) {
      console.log(res);
    });
  };

  return (
    <Container className="formHolder" fluid="md">
      {/* Message Text */}
      {isSendingMessage ? (
        <>
          <Form>
            <Form.Group>
              <Form.Label>
                Message to send to{" "}
                {username.toLowerCase() === "matt" ? "Rayanne" : "Matt"}
              </Form.Label>
              <Form.Control
                className="messageText"
                type="text"
                rows="3"
                onChange={(e) => setMessageText(e.target.value)}
              />
            </Form.Group>
          </Form>

          <ButtonGroup>
            <Button
              variant="secondary"
              onClick={() => {
                setUsername("");
                setMessageText("");
                setIsSendingMessage(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={() => sendMessage()}>
              Send Text
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Container fluid>
            <Row>
              <Col xs={4}></Col>
              <Col>Who are you?</Col>
            </Row>
            <Row>
              <Col xs={3}></Col>
              <Col>
                <ButtonGroup>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSendingMessage(true);
                      setUsername("matt");
                    }}
                  >
                    Matt
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSendingMessage(true);
                      setUsername("rayanne");
                    }}
                  >
                    Rayanne
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
}

export default App;
