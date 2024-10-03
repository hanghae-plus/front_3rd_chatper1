export const isNullish = (value) => value === null || value === undefined;
export const isFalsy = (value) =>
  typeof value === "boolean" || isNullish(value);
export function isTextNode(node) {
  return typeof node === "string" || typeof node === "number";
}
export function isEmpty(obj) {
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
}
