import { useEffect, useState } from "react";

/**
 * 判断是否为空值，0 不是空值
 * @param {*} value
 * @returns
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 删除对象中的空值，0除外
 * @param {*} object
 * @returns
 */
export const cleanObject = (object: Object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    if (isFalsy(object[key])) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const newValue = [...value];
      newValue.splice(index, 1);
      setValue(newValue);
    },
    add: (person: T) => {
      setValue([...value, person]);
    },
  };
};