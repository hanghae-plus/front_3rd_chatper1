export const createStorage = (key, storage = window.localStorage) => {
  const get = () => JSON.parse(localStorage.getItem(key));
  const set = (value) => localStorage.setItem(key, JSON.stringify(value));
  const reset = () => localStorage.removeItem(key);

  return { get, set, reset };
};
