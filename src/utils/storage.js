export const localSetItem = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const localGetItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const localRemoveItem = (key) => {
  return localStorage.removeItem(key);
};
