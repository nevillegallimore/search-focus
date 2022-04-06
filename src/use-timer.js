// import external dependencies
import { useRef } from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

export const useTimer = () => {
    const timeout = useRef(null);

    const abort = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    };

    const trigger = (callback, delay) => {
        abort();
        timeout.current = setTimeout(callback, delay);
    };

    return { abort, trigger };
};
