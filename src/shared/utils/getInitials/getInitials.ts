export const getInitials = (name: string) => {
  const a = name
    .split(' ')
    .map((char) => char.charAt(0).toUpperCase())
    .join(',');
  return a;
};
