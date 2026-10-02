import { io } from 'socket.io-client';

// Подключаемся к текущему хосту (Nginx сам перенаправит /socket.io/ на бэкенд)
export const socket = io({
  autoConnect: false,
  // Start with polling, then upgrade; polling also works without WebSocket support.
  transports: ['polling', 'websocket'],
});
