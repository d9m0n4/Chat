import { notificationActions } from 'entities/Notifications';
import { notificationReducer } from 'entities/Notifications/model/slices/notifications';
import { getUserState } from 'entities/User/model/selectors/getUserData';
import { updateUserInfo } from 'entities/User/model/services/updateUserInfo';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as EditIcon } from 'shared/assets/icons/pencil.svg';
import { BASE_URL } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ReducersList } from 'shared/types/Store';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { Skeleton } from 'shared/ui/Skeleton';

import cls from './EditProfile.module.scss';

const reducers: ReducersList = {
  notifications: notificationReducer,
};
export const EditProfile = () => {
  const { isLoading, user } = useSelector(getUserState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || '');
  const [nickName, setNickName] = useState(user?.nickName || '');

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
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickName', nickName);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      await dispatch(updateUserInfo(formData)).unwrap();
      setIsEditing(false);
      dispatch(
        notificationActions.setNotification({
          message: 'Профиль успешно обновлен',
        })
      );
    } catch (e: any) {
      dispatch(notificationActions.setNotification(e.message));
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setNickName(user.nickName || '');
    }
  }, [user]);

  console.log(avatarUrl);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={cls.profile__info}>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={cls.edit__btn}
        >
          <EditIcon className={'icon'} />
        </Button>
        {isLoading ? (
          <Skeleton width={100} height={100} borderRadius={'50%'} />
        ) : (
          <>
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
              src={
                avatarUrl
                  ? avatarUrl
                  : user?.avatar
                  ? `${BASE_URL}${user.avatar}`
                  : null
              }
              onClick={() => inputRef.current?.click()}
              className={cls.profile__avatar}
              name={user?.name}
            />
          </>
        )}
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
    </DynamicModuleLoader>
  );
};
