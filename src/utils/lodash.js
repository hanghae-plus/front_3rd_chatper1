const isArray = (value) => Array.isArray(value);

const isBoolean = (value) => typeof value === 'boolean';

const isFunction = (value) => typeof value === 'function';

const isNil = (value) => value === null || value === undefined;

const isNumber = (value) => typeof value === 'number';

const isString = (value) => typeof value === 'string';

export { isArray, isBoolean, isFunction, isNil, isNumber, isString };
