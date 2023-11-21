import * as yup from 'yup';

export const schema = yup.object({
  nickName: yup
    .string()
    .email('Введите корректный email')
    .required('Поле обязательно для заполнения'),
  password: yup
    .string()
    .min(8, 'Пароль должен содеражать минимум 8 символов')
    .required('Поле обязательно для заполнения'),
});
