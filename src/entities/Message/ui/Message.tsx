import React, {FC} from 'react';
import cls from './Message.module.scss'
import {Avatar} from "../../../shared/ui/Avatar";

interface IMessage {
    className?: string,
    isSelf?: boolean
}

export const Message: FC<IMessage> = ({isSelf, className = ''}) => {
    return (
        <div className={`${cls.message} ${isSelf && cls.isSelf} ${className}`}>
            <div className={cls.user}>
                <Avatar />
            </div>
            <div className={cls.body}>
                Значит, мастеру должно изготовлять руль под присмотром кормчего, если он намерен сделать хороший руль?
            </div>
        </div>
    );
};

