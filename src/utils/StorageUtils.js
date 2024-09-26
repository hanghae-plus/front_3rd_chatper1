export const LOCAL_STORAGE_KEYS = {
	USER: 'user',
};

export const getFromLocalStorage = (key) => {
	const item = localStorage.getItem(key);
	return JSON.parse(item);
};

export const saveInLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const clearInLocalStorage = (key) => {
	localStorage.removeItem(key);
};
