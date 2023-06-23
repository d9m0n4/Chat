import React from 'react';
import cls from "../Messsages.module.scss";
import {Message} from "../../../../entities/Message/ui/Message";

interface MessagesListProps {
    message: IMessage
}

export const MessagesList = ({}) => {
    return (
        <div className={cls.messages}>
            <Message isSelf={} />
        </div>
    );
};

