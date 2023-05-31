import { Avatar } from '../../../shared/ui/Avatar'
import cls from './Sidebar.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Bookmark } from 'shared/assets/icons/bookmark.svg'
import { ReactComponent as Chat } from 'shared/assets/icons/chat.svg'
import { ReactComponent as Settings } from 'shared/assets/icons/cog.svg'
import { ReactComponent as Logout } from 'shared/assets/icons/logout.svg'

export const Sidebar = () => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.user}>
        <Avatar />
      </div>
      <div className={cls.sidebar__nav}>
        <div className={cls.links}>
          <Link to={'/'}>
            <Chat className={cls.icon} />
          </Link>
          <Link to={'/'}>
            <Bookmark className={cls.icon} />
          </Link>
        </div>
        <div className={cls.links}>
          <Link to={'/'}>
            <Settings className={cls.icon} />
          </Link>
          <Link to={'/'}>
            <Logout className={cls.icon} />
          </Link>
        </div>
      </div>
    </div>
  )
}
