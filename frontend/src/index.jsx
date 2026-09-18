import React, { useState, useRef, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './header';
import Sidebar from './sidebar';
import Chat from "./chat";
import ChatWindow from './chatWindow';
import ProfileModal from './profileModal';
import favicon from './image/Igor.png';
import './App.less';

const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.head.appendChild(link);

const chatData = {};

function addUser(id, name, imageUrl) {
  chatData[id] = {id, name, imageUrl };
}

addUser(2, 'roton4ik', 'https://igor.com/src/image/avatars/roton4ik.png')
addUser(3, 'Nastya', 'https://igor.com/src/image/avatars/Nastya.png')

function App() {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [messages, setMessages] = useState({}); // { chatId: [{id, text, fromMe, time}] }

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSendMessage = (chatId, text) => {
    const msg = { id: Date.now(), text, fromMe: true, time: getTime() };
    setMessages((prev) => ({ ...prev, [chatId]: [...(prev[chatId] || []), msg] }));

    // Временная имитация ответа собеседника.
    // Потом заменится на WebSocket / fetch к бэкенду.
    const chat = chatData[chatId];
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: `Привет! Это ${chat.name}.`,
        fromMe: false,
        time: getTime(),
      };
      setMessages((prev) => ({ ...prev, [chatId]: [...(prev[chatId] || []), reply] }));
    }, 1000);
  };

  useEffect(() => {
    setUser({
      id: 1,
      name: 'SHT1RL1TS',
      imageUrl: 'https://igor.com/src/image/avatars/SHT1RL1TS.png'
    });

    /* ПОТОМ (когда бэкенд будет готов, просто раскомментируете):
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Failed to load user:', err));
    */
  }, []);

  return (
    <div>
      <Header user={user} onAvatarClick={() => setIsProfileOpen(true)} />
      <div className='main'>
        <div className='main-left'>
          <Sidebar initialWidth={250} minWidth={90} maxWidth={400}>
            <Chat
              chaters={chatData}
              activeId={selectedChat?.id}
              onSelect={setSelectedChat}
            />
          </Sidebar>
        </div>
        <div className='main-rigth'>
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            onSend={handleSendMessage}
          />
        </div>
      </div>
      {isProfileOpen && (
        <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>);
}
