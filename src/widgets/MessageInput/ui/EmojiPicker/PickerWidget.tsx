// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef } from 'react';

import { Picker } from 'emoji-mart';

export function PickerWidget(props) {
  const ref = useRef(null);
  const instance = useRef(null);

  if (instance.current) {
    instance.current.update(props);
  }

  useEffect(() => {
    instance.current = new Picker({ ...props, ref });

    return () => {
      instance.current = null;
    };
  }, []);

  return React.createElement('div', { ref });
}
