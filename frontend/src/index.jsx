import React, { useState, useRef, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './header';
import Sidebar from './sidebar';
import Chat from "./chat";
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
      <Header user={user}/>
      <div className='main'>
        <div className='main-left'>
          <Sidebar initialWidth={250} minWidth={90} maxWidth={400}>
            <Chat chaters={chatData} />
          </Sidebar>
        </div>
        <div className='main-rigth'>
        </div>
      </div>
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
