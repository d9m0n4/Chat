import * as yup from 'yup';

export const schema = yup.object({
  nickName: yup.string().required('Поле обязательно для заполнения'),
  password: yup
    .string()
    .min(4, 'Пароль должен содеражать минимум 8 символов')
    .required('Поле обязательно для заполнения'),
});
