import React, {FC} from 'react';
import cls from './AuthPage.module.scss'
import {LoginForm} from "../../../features/Login";

interface AuthPageProps {

};

export const AuthPage: FC<AuthPageProps> = ({}) => {
    return (
        <div className={cls.auth}>
            <LoginForm />
        </div>
    );
};