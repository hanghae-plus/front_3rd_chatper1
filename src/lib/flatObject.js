export function flatObject(obj) {
  return Object.entries(obj || {}).map(([name, value]) => ({
    name,
    value,
  }));
}
