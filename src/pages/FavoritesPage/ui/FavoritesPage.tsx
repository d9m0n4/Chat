import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { FC, useEffect, useState } from 'react';
import { api } from 'shared/config/api/api';
import { MessagesList } from 'widgets/Messages';
import { PageContainer } from 'widgets/PageContainer';

export const FavoritesPage: FC = () => {
  const [d, sd] = useState<GroupedMessages>();

  useEffect(() => {
    api.get('messages/favorites').then((data) => sd(data.data));
  }, []);

  return (
    <PageContainer>
      {d && (
        <>
          <MessagesList messages={d} />
        </>
      )}
    </PageContainer>
  );
};
