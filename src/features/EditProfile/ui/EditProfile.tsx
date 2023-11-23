import { getUserData } from 'entities/User';
import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './EditProfile.module.scss';

export const EditProfile = () => {
  const userData = useSelector(getUserData);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(userData?.name || '');
  const [nickName, setNickName] = useState(userData?.nickName || '');

  const [avatar, setAvatar] = useState<File | string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files;
    if (file) {
      const objectUrl = URL.createObjectURL(file[0]);
      setAvatar(file[0]);
      setAvatarUrl(objectUrl);
    } else {
      return;
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickName', nickName);
    formData.append('img', avatar);
    console.log(formData);
  };
  return (
    <>
      <input
        max={1}
        accept="image/png, image/gif, image/jpeg"
        type="file"
        ref={inputRef}
        hidden
        onChange={changeAvatar}
      />
      <Avatar
        width={100}
        src={userData?.avatar || avatarUrl}
        onClick={() => inputRef.current?.click()}
        className={cls.profile__avatar}
      />
      <form onSubmit={submitHandler} className={cls.profile__form}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Input value={nickName} onChange={(e) => setNickName(e.target.value)} />
        <Button type={'submit'} variant={ButtonVariants.PRIMARY}>
          Сохранить
        </Button>
      </form>
    </>
  );
};
