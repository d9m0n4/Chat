export function fileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} байт`;
  } else if (bytes < 1024 * 1024) {
    const kilobytes = (bytes / 1024).toFixed(2);
    return `${kilobytes} Кб`;
  } else {
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return `${mb} Мб`;
  }
}
