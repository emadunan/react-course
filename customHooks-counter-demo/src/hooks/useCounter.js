import { useState, useEffect } from 'react';

function useCounter(counterDirFn) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counterDirFn);
        }, 1000);

        return () => clearInterval(interval);
    }, [counterDirFn]);

    return counter;
}

export default useCounter;