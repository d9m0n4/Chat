import { Dialogs } from 'widgets/Dialogs'
import { Header } from 'widgets/Header'
import { Interlocutor } from 'widgets/Interlocutor'
import { Messages } from 'widgets/Messages'
import React, { FC } from 'react'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
  return (
    <div>
      <Header />
      <div className="main-section">
        <Dialogs />
        <Messages />
        <Interlocutor />
      </div>
    </div>
  )
}
