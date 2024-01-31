import React, { useEffect, useState } from 'react';
import { SocketContext } from 'shared/config/context/SocketContext';
import { Socket, io } from 'socket.io-client';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const jwtToken = localStorage.getItem('jwt');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        authorization: `Bearer ${jwtToken}`,
      },
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    if (socketInstance.recovered) {
      console.log('was recovered');
    } else {
      console.log('new session');
    }

    socketInstance.on('disconnect', (reason, description) => {
      setIsConnected(false);
      // socket?.connect();
      // socketInstance.connect();
      // console.log('reason', reason, 'description', description);
      // if (reason === 'transport close') {
      //   console.log('adsda21');
      //   socketInstance.connect();
      // }
    });

    // socketInstance.on('connect_failed', function () {
    //   console.log('connection failed. reconnecting...');
    //   socket?.connect();
    //   socketInstance?.connect();
    // });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
