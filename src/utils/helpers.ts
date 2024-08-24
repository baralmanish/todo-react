import { MY_STORAGE } from "./constants";

export const setInStorage = (key: string, value: string) => {
  MY_STORAGE.setItem(key, value);
};

export const getFromStorage = (key: string) => {
  return MY_STORAGE.getItem(key);
};

export const removeFromStorage = (key: string) => {
  return MY_STORAGE.removeItem(key);
};

export const clearStorage = () => {
  return MY_STORAGE.clear();
};
