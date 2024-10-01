export const camelToKebab = (str) => {
	return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};
