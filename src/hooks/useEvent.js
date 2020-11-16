import { useEffect } from 'react';

export default function useEvent(event, handler, element = window) {
  useEffect(() => {
    element.addEventListener(event, handler);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      element.removeEventListener(event, handler);
    };
  });
}
