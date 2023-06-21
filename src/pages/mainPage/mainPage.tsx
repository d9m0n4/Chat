import React, { FC } from 'react'
import {Header} from "../../widgets/Header";
import {Dialogs} from "../../widgets/Dialogs";
import {Messages} from "../../widgets/Messages";
import {Interlocutor} from "../../widgets/Interlocutor";

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
  return <div>
    <Header />
    <div className="main-section">
      <Dialogs />
      <Messages />
      <Interlocutor />
    </div>
  </div>
}
