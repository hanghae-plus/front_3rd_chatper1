export const createStorage = (key, storage = window.localStorage) => {
  const get = (key) => JSON.parse(storage.getItem(key));
  const set = (value) => storage.setItem(key, JSON.stringify(value));
  const reset = (key) => storage.removeItem(key);

  return { get, set, reset };
}
