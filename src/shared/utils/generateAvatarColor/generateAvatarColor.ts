export const generateAvatarColor = (initials: string) => {
  const lowercasedName = initials.toLowerCase();

  let hash = 0;
  for (let i = 0; i < lowercasedName.length; i++) {
    hash = lowercasedName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
};
