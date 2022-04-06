// import external dependencies
import React, { useEffect, useRef } from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

export const useTimeout = (callback, delay) => {
    const timeoutRef = React.useRef(null);
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const callbackFn = () => callbackRef.current;

        if (typeof delay === 'number') {
            timeoutRef.current = setTimeout(callbackFn, delay);

            return () => window.clearTimeout(timeoutRef.current);
        }
    }, [delay]);

    return timeoutRef;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default useTimeout;
