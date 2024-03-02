import React, { FC, useState } from 'react';

import data from '@emoji-mart/data';
import { BaseEmoji } from 'emoji-mart/index';
import { ReactComponent as Emoji } from 'shared/assets/icons/emoji.svg';
import { Button } from 'shared/ui/Button';

import cls from './EmojiPicker.module.scss';
import { PickerWidget } from './PickerWidget';

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
          <PickerWidget
            theme
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
            onEmojiSelect={(emoji: BaseEmoji) => {
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
