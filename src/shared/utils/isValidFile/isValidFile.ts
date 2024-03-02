import { fileSize } from '../fileSize/fileSize';

export const isValidFile = (
  files: FileList | null,
  maxSize: number,
  type: string
) => {
  if (!files) {
    return {
      isValid: false,
      message: `Ошибка загрузки файла`,
    };
  }
  const filesArray = Array.from(files);

  const isSizeValid = filesArray.every((file) => file.size <= maxSize);
  const isTypeValid = filesArray.every((file) => file.type.includes(type));

  if (!isSizeValid || !isTypeValid) {
    return {
      isValid: false,
      message: !isTypeValid
        ? `Не верный тип файла`
        : !isSizeValid
        ? `Размер фала не должен превышать ${fileSize(maxSize)}`
        : 'Ошибка загрузки файла',
    };
  }
  return { isValid: true, message: '' };
};
