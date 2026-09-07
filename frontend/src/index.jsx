import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.less';

function Messenger() {
  const [chats] = useState(mockChats);
  // const [activeChat, setActiveChat] = useState(mockChats[0]);
  // const [messages, setMessages] = useState(mockMessages);
  const [inputVal, setInputVal] = useState('');

  return (
    <div className="app-container">
      {/* Левая колонка */}
      <aside className="sidebar">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Поиск или новый чат..."
            className="search-input"
          />
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`chat-item ${activeChat.id === chat.id ? 'active' : ''}`}
            >
              <div className="avatar-wrapper">
                <span className="avatar">{chat.avatar}</span>
                {chat.online && <span className="online-badge" />}
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-last-msg-row">
                  <span className="last-msg-text">{chat.lastMsg}</span>
                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Правая колонка */}
      <main className="chat-area">
        <header className="header">
          <div className="avatar-wrapper">
            <span className="avatar">{activeChat.avatar}</span>
          </div>
          <div className="header-details">
            <div className="header-title">{activeChat.name}</div>
            <div className="header-subtitle">
              {activeChat.online ? 'в сети' : 'был(а) недавно'}
            </div>
          </div>
          <button className="icon-button">⋮</button>
        </header>

        <div className="message-feed">
          <div className="date-separator">Сегодня</div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bubble-wrapper ${msg.sender === 'me' ? 'me' : 'them'}`}
            >
              <div className="message-bubble">
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="input-area">
          <button type="button" className="icon-button">📎</button>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Написать сообщение..."
            className="message-input"
          />
          <button type="submit" className="send-button">➤</button>
        </form>
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<Messenger />);
}
