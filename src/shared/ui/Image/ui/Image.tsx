import React, {
  FC,
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

import clsx from 'classnames';

import cls from './Image.module.scss';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
}

export const AppImage: FC<ImageProps> = ({
  fallback,
  className,
  alt = 'altImage',
  width,
  src,
  height,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => setIsLoading(false);
    }
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  return (
    <img
      className={clsx(cls.image, className)}
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={'lazy'}
    />
  );
};
