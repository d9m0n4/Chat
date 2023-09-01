import { useContext } from 'react';

import { SocketContext } from '../../config/context/SocketContext';

export const useSocket = () => {
  return useContext(SocketContext);
};
