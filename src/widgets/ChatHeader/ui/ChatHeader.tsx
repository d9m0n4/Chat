import React from 'react';
import { ReactComponent as Dots } from 'shared/assets/icons/dots-horizontal.svg';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { Online } from 'shared/ui/Online';

import cls from './ChatHeader.module.scss';

export const ChatHeader = () => {
  const [v, setV] = React.useState('');
  const c = (s: string) => {
    setV(s);
    console.log(s);
  };
  return (
    <div className={cls.header}>
      <Input className={cls.search__field} placeholder="Поиск диалогов" value={v} onChange={c} />
      <div className={cls.name}>
        Cokrat <Online className={cls.online} />
      </div>
      <Button>
        <Dots className="icon" />
      </Button>
    </div>
  );
};
