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

import Background from "./images/mailbox.svg";

const axios = require("axios");

function App() {
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [recipientError, setRecipientError] = useState("");

  const CHAR_FINAL = 50;
  const ERROR_MESSAGE = "Something went wrong, please try again";

  const resetFields = () => {
    setMessageText("");
    setIsSendingMessage(false);
    setRecipient("");
  };

  const sendMessage = async () => {
    if (!messageText) {
      alert("Don't leave the message blank");
      return;
    }

    //My D1 Lite can only store a single byte before I need to store a number higher than 255 in more than one byte
    //I'm lazy. So let's limit it here
    let id = Math.floor(Math.random() * 254);

    let data = {
      id,
      message: messageText,
    };

    try {
      const url = `${API_ENDPOINT}users/${recipient}/sendMessage`;
      const response = await axios.post(url, data);

      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      window.alert(ERROR_MESSAGE);

      resetFields();
      return;
    }

    window.alert("Message successfully sent");
    resetFields();
  };

  const getMessage = () => {
    axios.get(API_ENDPOINT + "users/matt/getMessage").then(function (res) {
      console.log(res);
    });
  };

  const submitRecipient = (e) => {
    e.preventDefault();

    const { value } = e?.target?.elements?.recipient || {};

    if (value === "") {
      // window.alert("Please enter the recipients name");
      setRecipientError("Please enter the recipients name");
      setTimeout(() => setRecipientError(""), 2000);
      return;
    }

    if (!value) {
      window.alert(ERROR_MESSAGE);
      return;
    }

    setRecipient(value);
    setIsSendingMessage(true);
  };

  return (
    <div className="wrapper">
      <Container className="formHolder" fluid="md">
        <div className="header-container">
          <h1 className="header">LoveNote</h1>
        </div>
        {!recipient && (
          <div>
            <Form onSubmit={(e) => submitRecipient(e)} className="form">
              <Form.Group>
                <Form.Label>
                  Who do you want to send a message to?
                  <div className="text-muted">(enter a name/id)</div>
                  <div
                    className={`${recipientError ? "text-red" : "fade-in"}`}
                  >
                    {recipientError || ""}
                  </div>
                </Form.Label>
                <Form.Control
                  className="messageText"
                  type="text"
                  rows="3"
                  maxLength={CHAR_FINAL}
                  name="recipient"
                />
                <Form.Text className="text-muted">
                  {messageText.length}/{CHAR_FINAL}
                </Form.Text>
              </Form.Group>

              <ButtonGroup>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </ButtonGroup>
            </Form>
            {recipient}
          </div>
        )}

        {/* Message Text */}
        {isSendingMessage && (
          <>
            <Form className="form">
              <Form.Group>
                <Form.Label>Message to send to {recipient}</Form.Label>
                <Form.Control
                  className="messageText"
                  type="text"
                  rows="3"
                  maxLength={CHAR_FINAL}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Form.Text className="text-muted">
                  {messageText.length}/{CHAR_FINAL}
                </Form.Text>
              </Form.Group>

              <ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => sendMessage()}>
                  Send Message
                </Button>
              </ButtonGroup>
            </Form>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
