import React, { useState, useEffect } from "react";
import "./App.css";
import { API_ENDPOINT, IS_LOCAL } from "./config";
const axios = require("axios");

function App() {
  const [test, setTest] = useState("");
  const [messageText, setMessageText] = useState("");

  useEffect(() => {});

  const sendMessage = () => {
    axios
      .post(API_ENDPOINT + "users/matt/sendMessage?message=" + messageText)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getMessage = () => {
    axios.get(API_ENDPOINT + "users/matt/getMessage").then(function (res) {
      console.log(res);
      setTest(res.data);
    });
  };

  return (
    <div>
      <textarea
        type="text"
        onChange={(e) => setMessageText(e.target.value)}
      ></textarea>

      <button onClick={() => sendMessage()}>Send Text</button>

      {IS_LOCAL ? (
        <div>
          <button onClick={() => getMessage()}>Get Message</button>
          <h1>Test Text: {test}</h1>
        </div>
      ) : null}
    </div>
  );
}

export default App;
