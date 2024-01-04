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
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);

      if (socketInstance.recovered) {
        console.log('was recovered');
      } else {
        console.log('new session');
      }
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [jwtToken]);

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  useEffect(() => {
    socket?.on('unauth', (s) => {
      s.io.reconnect();
      console.log('kek');
    });
    return () => {
      socket?.off('unauth');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
