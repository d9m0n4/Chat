import { getActiveDialog } from 'entities/Dialog';
import React, { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Emoji } from 'shared/assets/icons/emoji.svg';
import { ReactComponent as Send } from 'shared/assets/icons/paper-airplane.svg';
import { ReactComponent as Attach } from 'shared/assets/icons/paper-clip.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';

import { sendMessage } from '../model/services/sendMessage';
import cls from './MessageInput.module.scss';

export const MessageInput = memo(() => {
  const placeholder = 'Введите сообщение...';
  const inputDiv = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);

  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const { textContent, innerHTML } = e.currentTarget;
    if (placeholderRef.current && textContent) {
      placeholderRef.current.style.display = 'none';
    } else if (placeholderRef.current && !textContent) {
      placeholderRef.current.style.display = 'block';
    }
    if (textContent) {
      setMessage(textContent);
    }
  };

  const handleFocusInput = () => {
    if (!inputDiv.current) {
      return;
    }
    inputDiv.current.focus();
  };

  const dispatch = useAppDispatch();
  const dialogId = useSelector(getActiveDialog);

  const onSendMessage = () => {
    if (!dialogId) {
      return;
    }
    dispatch(sendMessage({ dialogId: dialogId.id, content: message }));
  };

  return (
    <div className={cls.messages__input}>
      <div className={cls.input__block}>
        <div className={cls.attach}>
          <Button>
            <Attach className="icon" />
          </Button>
          <Button>
            <Emoji className="icon" />
          </Button>
        </div>

        <div className={cls.input__body}>
          <div className={cls.input__scroller}>
            <div
              ref={inputDiv}
              onClick={handleFocusInput}
              onInput={handleInputChange}
              className={cls.input}
              contentEditable
              role="textbox"
              aria-label={'type'}
            />
            <span ref={placeholderRef} className={cls.placeholder}>
              {placeholder}
            </span>
          </div>
        </div>

        <div className={cls.send}>
          <Button onClick={onSendMessage}>
            <Send className="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
});

MessageInput.displayName = 'MessageInput';
