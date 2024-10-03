export const createObserver = () => {
  const listeners = new Set();
  const subscribe = (fn) => listeners.add(fn);
  const notify = () => listeners.forEach(listener => listener());

  console.log(listeners)
  return { subscribe, notify }
}
