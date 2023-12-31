import React, { MutableRefObject, useEffect } from 'react';

interface IUseInfiniteScrollProps {
  trigger: React.RefObject<HTMLDivElement>;
  callback: () => void;
  root: React.RefObject<HTMLDivElement>;
}
export const useInfiniteScroll = ({
  trigger,
  root,
  callback,
}: IUseInfiniteScrollProps) => {
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: root.current,
      threshold: 1.0,
      rootMargin: '10px',
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log(entry);
        callback();
      }
    }, options);
    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      if (trigger.current) {
        observer.unobserve(trigger.current);
      }
    };
  }, [callback, trigger, root]);
};
