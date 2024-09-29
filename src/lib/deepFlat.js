export function deepFlat(arr) {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(deepFlat(val)) : acc.concat(val);
  }, []);
}
