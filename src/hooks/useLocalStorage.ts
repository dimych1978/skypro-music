import { useState } from 'react';

type Value = { value: string };

const useLocalStorage = (key: string, initialValue: string | undefined) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.warn(error);
    }
  });

  const setValue = (value: Value) => {
    try {
      const valueToStore: string | undefined =
        value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.warn(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
