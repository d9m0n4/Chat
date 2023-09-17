import { getActiveDialog } from 'entities/Dialog';
import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import React, { lazy, memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Send } from 'shared/assets/icons/paper-airplane.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Button } from 'shared/ui/Button';

import { sendMessage } from '../model/services/sendMessage';
import { FilePreviewer } from './FilePreviewer/FilePreviewer';
import { FileUpload } from './FileUpload/FileUpload';
import cls from './MessageInput.module.scss';

const EmojiPicker = lazy(() => import('./EmojiPicker/EmojiPicker'));

export const MessageInput = memo(() => {
  const placeholder = 'Введите сообщение...';

  const inputDiv = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const dispatch = useAppDispatch();
  const dialogId = useSelector(getActiveDialog);
  const partner = useSelector(getDialogPartner);
  const dialog = useSelector(getActiveDialog);
  const { socket } = useSocket();

  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[] | null>(null);

  const handleChangeEmoji = useCallback((emoji: string) => {
    if (inputDiv.current) {
      if (placeholderRef.current && emoji) {
        placeholderRef.current.style.display = 'none';
      } else if (placeholderRef.current && !emoji) {
        placeholderRef.current.style.display = 'block';
      }
      const currentText = inputDiv.current.textContent || '';
      const newText = currentText + emoji;
      inputDiv.current.textContent = newText;
      setMessage(newText);
      socket?.emit('on_typing_message', {
        partner: partner?.id,
        dialog: dialog?.id,
      });
    }
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    const { textContent } = e.currentTarget;
    if (placeholderRef.current && textContent) {
      placeholderRef.current.style.display = 'none';
    } else if (placeholderRef.current && !textContent) {
      placeholderRef.current.style.display = 'block';
      setMessage('');
    }
    if (textContent) {
      setMessage(textContent);
      socket?.emit('on_typing_message', {
        partner: partner?.id,
        dialog: dialog?.id,
      });
    } else {
      socket?.emit('on_stop_typing_message', {
        partner: partner?.id,
        dialog: dialog?.id,
      });
    }
  };

  const handleFocusInput = () => {
    if (!inputDiv.current) {
      return;
    }
    inputDiv.current.focus();
  };

  const onSendMessage = async () => {
    if (!dialogId || !message) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('dialogId', String(dialogId.id));
      formData.append('content', message);

      if (files) {
        files.forEach((file, index) => {
          formData.append(`file`, file);
        });
      }
      await dispatch(sendMessage(formData));
    } catch (e) {
      console.log(e);
    }

    setMessage('');
    setFiles(null);
    if (inputDiv.current) {
      inputDiv.current.textContent = null;
      inputDiv.current.focus();
      socket?.emit('on_stop_typing_message', {
        partner: partner?.id,
        dialog: dialog?.id,
      });
    }
  };

  return (
    <>
      <div className={cls.messages__input}>
        <div className={cls.input__block}>
          <div className={cls.attach}>
            <FileUpload onSetPreview={setFiles} />
            <EmojiPicker onSelect={handleChangeEmoji} />
          </div>

          <div className={cls.input__body}>
            <div className={cls.input__scroller}>
              <div
                ref={inputDiv}
                onClick={handleFocusInput}
                onInput={handleInputChange}
                onChange={handleInputChange}
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
            <Button disabled={!message} onClick={onSendMessage}>
              <Send className="icon" />
            </Button>
          </div>
        </div>
        {files && <FilePreviewer files={files} />}
      </div>
    </>
  );
});

MessageInput.displayName = 'MessageInput';
