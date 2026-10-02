import React, { useEffect, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Chat from "./components/chat";
import ChatWindow from './components/chatWindow';
import ProfileModal from './components/profileModal';
import { api } from './api';
import defaultAvatar from './public/image/avatars/standart_user.png';
import favicon from './public/image/Igor.png';
import './public/less/App.less';

const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.head.appendChild(link);

// These are chat IDs from postgres/init.sql, not user IDs.
const demoChats = [{ id: 2, name: 'roton4ik' }, { id: 3, name: 'Nastya' }];

function App() {
  const [user, setUser] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return (
    <div className="app-loading" role={loadError ? 'alert' : 'status'}>
      <p>{loadError || 'Загрузка Igor…'}</p>
      {loadError && <button onClick={() => setReload((value) => value + 1)}>Повторить</button>}
    </div>
  );

  return (
    <div>
      <Header user={user} search={search} onSearch={setSearch} onAvatarClick={() => setIsProfileOpen(true)} />
      <div className='main'>
        <div className='main-left'>
          <Sidebar initialWidth={250} minWidth={90} maxWidth={400}>
            <Chat
              chaters={chatData.filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase().trim()))}
              activeId={selectedChat?.id}
              onSelect={setSelectedChat}
            />
          </Sidebar>
        </div>
        <div className='main-rigth'>
          <ChatWindow
            key={selectedChat?.id ?? 'empty'}
            chat={selectedChat}
            currentUser={user}
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
