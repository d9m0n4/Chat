import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Dots } from 'shared/assets/icons/dots-horizontal.svg';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { Online } from 'shared/ui/Online';

import cls from './ChatHeader.module.scss';

export const ChatHeader = () => {
  const [v, setV] = React.useState('');

  const partner = useSelector(getDialogPartner);
  const c = (s: string) => {
    setV(s);
    console.log(s);
  };

  return (
    <div className={cls.header}>
      <Input
        className={cls.search__field}
        placeholder="Поиск диалогов"
        value={v}
        onChange={c}
      />
      <div className={cls.name}>
        {partner && (
          <>
            {partner.name}
            <Online className={cls.online} />
          </>
        )}
      </div>
      <Button>
        <Dots className="icon" />
      </Button>
    </div>
  );
};
