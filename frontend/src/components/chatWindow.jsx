import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import { api } from '../api';
import { mergeMessages } from '../messages';
import { handleAvatarError } from '../avatar';

export default function ChatWindow({ chat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [connection, setConnection] = useState('connecting');
  const [reload, setReload] = useState(0);
  const bottomRef = useRef(null);

  if (!chat) {
    return <div className="chat-window empty"><p>Выберите чат слева</p></div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={chat.imageUrl} alt={chat.name} onError={handleAvatarError} />
        <div className="chat-header-info">
          <h3>{chat.name}</h3>
          <span className="status" role="status">
            {connection === 'connected' ? 'Соединение установлено' : connection === 'connecting' ? 'Подключение…' : 'Нет соединения с обновлениями'}
          </span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${Number(message.sender_id) === Number(currentUser?.id) ? 'out' : 'in'}`}
          >
            <div className="bubble">
              <p>{message.text}</p>
              <span className="time">
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {(historyError || connection === 'disconnected') && <div className="chat-error" role="alert">
        {historyError || 'Обновления недоступны. Пробуем подключиться снова.'}
        <button onClick={() => setReload((value) => value + 1)}>Повторить</button>
      </div>}
      {error && <p className="chat-error" role="alert">{error}</p>}
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          aria-label="Сообщение"
          maxLength={10000}
          disabled={isSending}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Написать сообщение..."
        />
        <button type="submit" disabled={!inputValue.trim() || isSending}>
          Отправить
        </button>
      </form>
    </div>
  );
}
