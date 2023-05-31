import React from 'react'
import cls from './Sidebar.module.scss'
import {Link} from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.user}>
        <img src="" alt=""/>
      </div>
      <div className={cls.sidebar__links}>
        <div className={cls.top}>
          <Link to={'/'}>
              123123
          </Link>
        </div>
        <div className={cls.bottom}>

        </div>
      </div>
    </div>
  )
}

