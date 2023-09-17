import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, { FC, useState } from 'react';
import { ReactComponent as Emoji } from 'shared/assets/icons/emoji.svg';
import { Button } from 'shared/ui/Button';

import cls from './EmojiPicker.module.scss';

interface EmojiPickerProps {
  onSelect: (native: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          setIsOpened(!isOpened);
        }}
      >
        <Emoji className="icon" />
      </Button>
      {isOpened && (
        <div className={cls.EmojiPicker}>
          <Picker
            onClickOutside={() => setIsOpened(false)}
            autoFocus
            data={data}
            showPreview={false}
            showSkinTones={false}
            previewPosition="none"
            searchPosition="none"
            locale="ru"
            emojiSize="16"
            perLine={9}
            onEmojiSelect={(emoji: any) => {
              if (!emoji?.native) return;
              onSelect(emoji.native);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;