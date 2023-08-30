import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//   withCredentials: true,
//   query: { token: localStorage.getItem('user') },
// });
//
// export default socket;

export const connectToSocket = () => {
  const socket = io('http://localhost:5000', {
    withCredentials: true,
  });
  socket.on('connect', () => {
    console.log('Connected to socket');
  });
  return socket;
};
