import React, { useEffect, useState } from 'react';

import { config } from 'dotenv';
import { SocketContext } from 'shared/config/context/SocketContext';
import { Socket, io } from 'socket.io-client';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const jwtToken = localStorage.getItem('jwt');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(`${process.env.REACT_APP_SERVER_URL}`, {
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
