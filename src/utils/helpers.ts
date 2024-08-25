import { MY_STORAGE } from "./constants";

// Function to set a key-value pair in storage
export const setInStorage = (key: string, value: string) => {
  MY_STORAGE.setItem(key, value);
};

// Function to retrieve a value from storage by key
export const getFromStorage = (key: string) => {
  return MY_STORAGE.getItem(key);
};

// Function to remove a key-value pair from storage
export const removeFromStorage = (key: string) => {
  return MY_STORAGE.removeItem(key);
};

// Function to clear all key-value pairs from storage
export const clearStorage = () => {
  return MY_STORAGE.clear();
};
