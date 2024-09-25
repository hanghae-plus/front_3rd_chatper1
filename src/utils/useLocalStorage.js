const useLocalStorage = (function () {
  function createLocalStorageHandler(key, initialValue) {
    function getStoredValue() {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    function setValue(value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    function removeValue() {
      localStorage.removeItem(key);
    }
    return {
      getStoredValue,
      setValue,
      removeValue,
    };
  }
  return createLocalStorageHandler;
})();

export default useLocalStorage;
