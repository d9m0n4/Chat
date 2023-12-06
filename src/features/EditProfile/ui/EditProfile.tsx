import { getUserData } from 'entities/User';
import { updateUserInfo } from 'entities/User/model/services/updateUserInfo';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as EditIcon } from 'shared/assets/icons/pencil.svg';
import { BASE_URL } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
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

  const [isEditing, setIsEditing] = useState(false);

  const [avatar, setAvatar] = useState<File | string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(null);

  const dispatch = useAppDispatch();

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files;
    if (file && file[0] instanceof Blob) {
      const objectUrl = URL.createObjectURL(file[0] as Blob);
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
    formData.append('avatar', avatar);

    dispatch(updateUserInfo(formData));
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setNickName(userData.nickName || '');
    }
  }, [userData]);

  return (
    <div className={cls.profile__info}>
      <Button onClick={() => setIsEditing(!isEditing)} className={cls.edit__btn}>
        <EditIcon className={'icon'} />
      </Button>
      <input
        disabled={!isEditing}
        max={1}
        accept="image/png, image/gif, image/jpeg"
        type="file"
        ref={inputRef}
        hidden
        onChange={changeAvatar}
      />
      <Avatar
        width={100}
        src={avatarUrl ? avatarUrl : userData?.avatar ? `${BASE_URL}${userData.avatar}` : null}
        onClick={() => inputRef.current?.click()}
        className={cls.profile__avatar}
        name={userData?.name}
      />
      <form onSubmit={submitHandler} className={cls.profile__form}>
        <Input
          placeholder={'Имя'}
          required={true}
          disable={!isEditing}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={'Никнейм'}
          required={true}
          disable={!isEditing}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        {isEditing && (
          <Button type={'submit'} variant={ButtonVariants.PRIMARY}>
            Сохранить
          </Button>
        )}
      </form>
    </div>
  );
};
