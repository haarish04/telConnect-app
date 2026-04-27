import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/ChatWindow.css";
import { CustomerContext } from "../context/CustomerContext"; // adjust path as needed

export default function ChatWindow() {
  const { customerData } = useContext(CustomerContext);
  const [isOpen, setIsOpen] = useState(false);

  const getWelcomeMessage = () => {
    const name = customerData?.customerName;
    return name
      ? `Hi ${name}! 👋 How can we help you today?`
      : "Hi there! 👋 How can we help you today?";
  };

  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chatMessages");
    if (stored) return JSON.parse(stored);
    return [
      {
        id: 1,
        sender: "agent",
        text: getWelcomeMessage(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  // Update welcome message when login state changes
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === 1 && msg.sender === "agent"
          ? { ...msg, text: getWelcomeMessage() }
          : msg
      )
    );
  }, [customerData]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Sync messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
  const handleLogout = () => {
    setMessages([
      {
        id: 1,
        sender: "agent",
        text: "Hi there! 👋 How can we help you today?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  window.addEventListener("logout", handleLogout);
  return () => window.removeEventListener("logout", handleLogout);
}, []);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Support Button */}
      <button
        className={`chat-fab ${isOpen ? "chat-fab--active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Customer Support"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-2 10H6v-2h12v2zm0-4H6V6h12v2z" />
          </svg>
        )}
        {!isOpen && <span className="chat-fab__badge">1</span>}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "chat-window--open" : ""}`}>
        {/* Header */}
        <div className="chat-window__header">
          <div className="chat-window__agent-info">
            <div className="chat-window__avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div>
              <p className="chat-window__agent-name">Support Team</p>
            </div>
          </div>
          <button className="chat-window__close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-window__messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message chat-message--${msg.sender}`}>
              <div className="chat-message__bubble">{msg.text}</div>
              <span className="chat-message__time">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-window__footer">
          <textarea
            className="chat-window__input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="chat-window__send-btn"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}