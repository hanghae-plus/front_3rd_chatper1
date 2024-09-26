export function memoize(fn: () => void) {
  const cache = new Map();
  return function (...args: any) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

export function throttle(func: (args: any) => void, limit: number) {
  let inThrottle: boolean;
  return function (...args: any) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function debounce(func: (args: any) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

interface objType {
  [key: string]: any;
}

export function isEqual(obj1: objType, obj2: objType) {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;

  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  for (const key in obj2) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}
