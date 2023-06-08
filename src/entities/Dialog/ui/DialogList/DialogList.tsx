import React from 'react';
import cls from './DialogList.module.scss'
import {DialogItem} from "../DialogItem/DialogItem";

export const DialogList = () => {
    return (
        <ul className={cls.list}>
            <DialogItem  />
            <DialogItem />
            <DialogItem isActive />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
            <DialogItem />
        </ul>
    );
};

