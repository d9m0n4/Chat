import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import cls from './RippleEffect.module.scss';

interface IRipple {
  x: number;
  y: number;
  size: number;
}
export const RippleEffect = () => {
  const [ripples, setRipples] = useState<Array<IRipple>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples([
      ...ripples,
      {
        x: e.clientX - rect.x - size / 2,
        y: e.clientY - rect.y - size / 2,
        size,
      },
    ]);
  };

  useEffect(() => {
    const removeRipples = () => {
      setRipples([]);
    };
    if (ripples.length > 1) {
      const timeout = setTimeout(removeRipples, 600);
      return () => clearTimeout(timeout);
    }
  }, [ripples]);

  return (
    <div
      className={cls.rippleContainer}
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      {ripples.map((ripple, index) => (
        <div
          key={index}
          className={cls.ripple}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};
