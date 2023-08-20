import { useEffect, useState } from 'react';

import { socket } from '../../config/api/ws';

export const useTypingIndicator = (dialogId: number | undefined) => {
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const handleStartTyping = (id: number) => {
      if (id === dialogId) {
        setIsTyping(true);
      }
    };
    const handleStopTyping = (id: number) => {
      if (id === dialogId) {
        setIsTyping(false);
      }
    };
    socket.on('on_typing_message', handleStartTyping);
    socket.on('on_stop_typing_message', handleStopTyping);
    return () => {
      socket.off('on_typing_message', handleStartTyping);
      socket.off('on_stop_typing_message', handleStopTyping);
    };
  }, [dialogId]);
  return isTyping;
};
