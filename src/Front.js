import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Front.css";

const URL = "http://localhost:3000";

const socket = io(URL);

const Front = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages(messages.concat(message));
    });
  }, [messages]);

  return (
    <>
      <div>
        <h1>
          Chat App{" "}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h2>
          Created with React, Express, Node and Socket.IO{" "}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h2>
      </div>
      <div className="container">
        <ul>
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
      <div className="starting">
        <form id="form" className="validate" onSubmit={handleSubmit}>
          <label>Chatting: </label>
          <input
            type="text"
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default Front;
