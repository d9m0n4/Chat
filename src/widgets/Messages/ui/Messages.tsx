import React from 'react';
import cls from './Messsages.module.scss'
import {Message} from "entities/Message/ui/Message";
import {Input} from "shared/ui/Input/Input";
export const Messages = () => {
    return (
        <div style={{width: '100%'}}>
            <div className={cls.messages}>
                <div>
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
            </div>
            <div>
                <Input />
            </div>
        </div>
    );
};

