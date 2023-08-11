import React, { FC, memo, useMemo } from 'react';
import { ReactComponent as Chevron } from 'shared/assets/icons/cheveron-down.svg';
import { Attach } from 'shared/ui/Attach';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';

import cls from './Interlocutor.module.scss';

type InterlocutorProps = {
  name?: string;
  avatar?: string | null;
  id?: number;
  nickName?: string;
};

export const Interlocutor: FC<InterlocutorProps> = memo(
  ({ id, avatar, nickName, name }) => {
    const attachItems = useMemo(
      () => (
        <>
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
          <Attach />
        </>
      ),
      []
    );
    return (
      <div className={cls.interlocutor}>
        <div className={cls.info}>
          <Avatar width={100} height={100} src={avatar} />
          <div className={cls.name}>
            {name} {nickName}
          </div>
          <span className={cls.isOnline}>в сети {id}</span>
        </div>
        <div className={cls.attaches}>
          <div className={cls.attaches__heading}>
            <p>Вложения</p>
            <Button>
              <Chevron className={'icon'} />
            </Button>
          </div>
          <div className={cls.attaches__body}>
            <ul className={cls.attaches__list}>{attachItems}</ul>
          </div>
        </div>
      </div>
    );
  }
);

Interlocutor.displayName = 'Interlocutor';
