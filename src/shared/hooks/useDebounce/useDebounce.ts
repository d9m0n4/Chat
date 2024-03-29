import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay = 500
) => {
  const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  return useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
