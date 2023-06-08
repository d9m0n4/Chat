import React, {FC} from 'react';
import {Avatar} from "shared/ui/Avatar";
import {Online} from "shared/ui/Online";
import cls from './DialogItem.module.scss'

interface IDialogItem {
    isActive?: boolean
}

export const DialogItem:FC<IDialogItem> = ({isActive}) => {
    return (
        <li className={`${cls.item} ${isActive && cls.active}`}>
            <div className={cls.user}>
                <Online className={cls.isOnline}/>
                <Avatar width={40} height={40} className={cls.avatar} />
                <span className={cls.count}>99</span>
            </div>
            <div className={cls.body}>
                <div className={cls.title}><span>Александр Пушкин</span></div>
                <div className={cls.subtitle}><span>Шо как мужуки???Шо как мужуки???</span></div>
            </div>
            <div className={cls.info}>
                <span className={cls.date}>21.04.2021</span>
            </div>
        </li>
    );
};