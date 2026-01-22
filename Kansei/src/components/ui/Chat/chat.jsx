import React, { useState, useEffect, useRef } from "react";
import "./Chat.css"; // стили чата

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = { text: input, time: new Date().toLocaleTimeString() };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <p key={index} className="message">
              <span className="time">{msg.time}</span> {msg.text}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chat-send">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
