import React, { FC, useState } from 'react';

import { ReactComponent as Emoji } from 'shared/assets/icons/emoji.svg';
import useMediaQuery from 'shared/hooks/useMediaQuery/useMediaQuery';
import { Button } from 'shared/ui/Button';

import cls from './EmojiPicker.module.scss';
import { PickerWidget } from './PickerWidget';

interface EmojiPickerProps {
  onSelect: (native: string) => void;
}
const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect }) => {
  const [isOpened, setIsOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 425px)');

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
            showPreview={false}
            showSkinTones={false}
            previewPosition="none"
            searchPosition="none"
            locale="ru"
            emojiSize="16"
            perLine={isMobile ? 6 : 9}
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
