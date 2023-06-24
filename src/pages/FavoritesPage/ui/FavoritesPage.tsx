import { MessagesList } from '../../../widgets/Messages'
import cls from './Favorites.module.scss'
import { DialogList } from 'entities/Dialog'
import React, { FC } from 'react'

interface FavoritesPageProps {}

export const FavoritesPage: FC<FavoritesPageProps> = ({}) => {
  return (
    <div className={cls.favorites}>
      <div>
        <DialogList />
      </div>
      <div>
        <MessagesList messages={[1]} />
      </div>
    </div>
  )
}
