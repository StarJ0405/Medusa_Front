import { useState, useEffect } from "react";

function useLocalStorage(key, initialState) {
    const [state, setState] = useState(() => {
        let value = window.localStorage.getItem(key);
        if (value) {
            return window.localStorage.getItem(key);
        } else {
            if (initialState) {
                return initialState;
            } else {
                return;
            }
        }
    });

    useEffect(() => {
        if (state) {
            window.localStorage.setItem(key, state);
        }
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorage;