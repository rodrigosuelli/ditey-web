import { useEffect } from 'react';

export default function useEvent(event, handler, passive) {
    useEffect(() => {
        //initialize the event handler
        document.addEventListener(event, handler, passive);

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            document.removeEventListener(event, handler);
        }
    });
}