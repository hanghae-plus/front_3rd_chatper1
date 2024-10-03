export const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;
export const isArray = Array.isArray;
export const isEventKey = (key) => key.startsWith('on');
