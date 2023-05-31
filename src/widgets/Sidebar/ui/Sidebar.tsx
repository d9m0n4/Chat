import cls from './Sidebar.module.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Chat } from 'shared/assets/icons/chat.svg'

export const Sidebar = () => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.user}>
        <img src="" alt="" />
      </div>
      <div className={cls.sidebar__links}>
        <div className={cls.top}>
          <Link to={'/'}>
            <Chat className={cls.icon} />
          </Link>
        </div>
        <div className={cls.bottom}></div>
      </div>
    </div>
  )
}
