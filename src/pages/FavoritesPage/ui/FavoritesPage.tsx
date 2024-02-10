import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { FC, useEffect, useState } from 'react';
import { api } from 'shared/config/api/api';
import { MessagesGroup } from 'widgets/Messages/ui/MessagesGroup/MessagesGroup';
import { PageContainer } from 'widgets/PageContainer';

import cls from './Favorites.module.scss';

export const FavoritesPage: FC = () => {
  const [d, sd] = useState<GroupedMessages>();

  useEffect(() => {
    api.get('messages/favorites').then((data) => sd(data.data));
  }, []);

  return (
    <PageContainer>
      {d && (
        <div className={cls['favorite-messages']}>
          {Object.keys(d).map((date) => (
            <MessagesGroup key={date} date={date} messages={d[date]} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};
