import { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ chat, messages, onSend }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  // Автопрокрутка к последнему сообщению
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chat]);

  // Чат не выбран — показываем заглушку
  if (!chat) {
    return (
      <div className="chat-window empty">
        <p>Выберите чат, чтобы начать общение</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(chat.id, text.trim());
    setText('');
  };

  return (
    <div className="chat-window">
      {/* Шапка открытого чата */}
      <div className="chat-header">
        <img src={chat.imageUrl} alt={chat.name} />
        <div className="chat-header-info">
          <h3>{chat.name}</h3>
          <span className="status">online</span>
        </div>
      </div>

      {/* Лента сообщений */}
      <div className="chat-messages">
        {(messages[chat.id] || []).map((m) => (
          <div key={m.id} className={`message ${m.fromMe ? 'out' : 'in'}`}>
            <div className="bubble">
              <p>{m.text}</p>
              <span className="time">{m.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Поле ввода */}
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Написать сообщение..."
        />
        <button type="submit" disabled={!text.trim()}>Отправить</button>
      </form>
    </div>
  );
}
