import cls from './Messsages.module.scss'
import { Message } from 'entities/Message/ui/Message'
import React from 'react'
import { Input } from 'shared/ui/Input/Input'
import { MessageInput } from 'widgets/MessageInput'

export const Messages = () => {
  return (
    <div className={cls.messages__wrapper}>
      <div className={cls.messages}>
        <Message />
        <Message isSelf />
        <Message />
        <Message isSelf />
        <Message />
        <Message isSelf />
        <Message />
        <Message isSelf />
        <Message />
        <Message isSelf />
        <Message />
        <Message isSelf />
      </div>
      <MessageInput />
    </div>
  )
}
