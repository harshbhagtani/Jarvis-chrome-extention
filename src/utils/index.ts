import axios from "axios";

export const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const SetDataLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const debounced = (fn: any, wait: number) => {
  let tid: any = null;

  return (...args: Array<any>) => {
    if (tid) clearTimeout(tid);
    tid = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};
