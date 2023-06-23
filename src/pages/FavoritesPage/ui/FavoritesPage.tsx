import React, { FC } from 'react'
import {DialogList} from "entities/Dialog";
import { MessagesList} from "../../../widgets/Messages";
import cls from './Favorites.module.scss'
interface FavoritesPageProps {}

export const FavoritesPage: FC<FavoritesPageProps> = ({}) => {
  return (
      <div className={cls.favorites}>
        <div><DialogList /></div>
        <div><MessagesList /></div>
      </div>
  )
}
