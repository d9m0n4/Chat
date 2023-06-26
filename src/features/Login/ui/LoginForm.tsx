import React, {FC} from 'react';
import cls from './LoginForm.module.scss'
import {Input} from "../../../shared/ui/Input/Input";
import {Button} from "../../../shared/ui/Button";
import {ReactComponent as Arrow} from "shared/assets/icons/arrowR.svg";
import {ButtonVariants} from "../../../shared/ui/Button/ui/Button";

interface LoginFormProps {

};

export const LoginForm: FC<LoginFormProps> = ({}) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.title}>Войти</div>
            <form className={cls.form}>
                <Input placeholder='Имя' />
                <Input placeholder='Пароль' />
                <Button variant={ButtonVariants.PRIMARY} className={cls.button}>
                    <Arrow />
                </Button>
            </form>
        </div>
    );
};