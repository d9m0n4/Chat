import React from 'react';
import { ReactComponent as Emoji } from 'shared/assets/icons/emoji.svg';
import { ReactComponent as Send } from 'shared/assets/icons/paper-airplane.svg';
import { ReactComponent as Attach } from 'shared/assets/icons/paper-clip.svg';
import { Button } from 'shared/ui/Button';

import cls from './MessageInput.module.scss';

export const MessageInput = () => {
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
              className={cls.input}
              contentEditable
              placeholder="Введите сообщение..."
              role="textbox"
            />
          </div>
        </div>

        <div className={cls.send}>
          <Button>
            <Send className="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};
