import React, { useEffect } from 'react';

export const useOutsideClick = ({
  ref,
  callback,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  callback: () => void;
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [callback, ref]);
};
