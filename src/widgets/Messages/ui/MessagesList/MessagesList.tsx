import cls from '../Messages.module.scss'
import { Message } from 'entities/Message/ui/Message'
import React from 'react'

// interface MessagesListProps {
//     message: IMessage
// }

export const MessagesList = ({ messages }: { messages: number[] }) => {
  return (
    <div className={cls.messages}>
      {messages.map((message) => (
        <Message key={message} />
      ))}
    </div>
  )
}
