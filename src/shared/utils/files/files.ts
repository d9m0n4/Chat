export const ReturnFileExt = (file: File) => {
  return file.name.split('.').pop();
};
