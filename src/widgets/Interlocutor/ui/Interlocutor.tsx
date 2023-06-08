import React from 'react';
import cls from './Interlocutor.module.scss'
import {Avatar} from "shared/ui/Avatar";
import {ReactComponent as Chevron} from "shared/assets/icons/cheveron-down.svg";
import {Button} from "shared/ui/Button";
import {Attach} from "shared/ui/Attach";

export const Interlocutor = () => {
    return (
        <div className={cls.interlocutor}>
            <div className={cls.info}>
                <Avatar width={100} height={100} />
                <div className={cls.name}>Сократ Сократ</div>
                <span className={cls.isOnline}>в сети</span>
            </div>
            <div className={cls.attaches}>
                <div className={cls.attaches__top}>
                    <p>Вложения</p>
                    <Button><Chevron className={'icon'}/></Button>
                </div>
                <div className={cls.attaches__body}>
                    <Attach />
                    <Attach />
                    <Attach />
                    <Attach />
                    <Attach />
                    <Attach />
                    <Attach />
                </div>
            </div>
        </div>
    );
};

