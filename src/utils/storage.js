export const getStorage = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  return JSON.parse(value);
};

export const updateStorage = (key, value) => {
  if (value === undefined || value === null) {
    throw new Error('Storage에는 falsy값을 넣을 수 없습니다.');
  }

  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
