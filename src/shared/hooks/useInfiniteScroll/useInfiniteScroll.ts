import React, { useEffect, useRef } from 'react';

interface IUseInfiniteScrollProps {
  trigger: React.RefObject<HTMLDivElement>;
  callback?: () => void;
  root?: React.RefObject<HTMLDivElement>;
}
export const useInfiniteScroll = ({
  trigger,
  root,
  callback,
}: IUseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const rootElement = root?.current;
    const triggerElement = trigger?.current;

    if (callback) {
      const options: IntersectionObserverInit = {
        root: rootElement,
        threshold: 1.0,
        rootMargin: '100px',
      };
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      if (observer.current && triggerElement) {
        observer.current?.observe(triggerElement);
      }
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current?.unobserve(triggerElement);
      }
    };
  }, [callback, trigger, root]);
};
