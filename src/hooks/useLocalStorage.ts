import { useState } from 'react';

type Value = { value: string };

const useLocalStorage = (key: string, initialValue: string | undefined) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const value = window.localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value: Value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore: string | undefined =
        value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
      console.log('value', value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
