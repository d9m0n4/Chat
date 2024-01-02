import React, { useEffect } from 'react';

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
  useEffect(() => {
    const rootElement = root?.current;
    const triggerElement = trigger?.current;
    let observer: IntersectionObserver;

    if (callback) {
      const options: IntersectionObserverInit = {
        root: rootElement,
        threshold: 1.0,
        rootMargin: '100px',
      };
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      if (triggerElement) {
        observer.observe(triggerElement);
      }
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, trigger, root]);
};
