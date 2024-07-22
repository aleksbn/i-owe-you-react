import { useEffect, useState } from "react";

/**
 * Custom hook that returns a stateful value and a function to update it.
 * The value is stored in the browser's local storage and persists across sessions.
 *
 * @param {any} initialState - The initial state value.
 * @param {string} key - The key to use for storing the value in local storage.
 * @return {[any, Function]} An array containing the current state value and a function to update it.
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
