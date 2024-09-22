const Logger = (function () {
  let instance;
  let logs = [];

  function createInstance() {
    function log(message) {;
      logs.push(`${message}`);
      console.log(`${message}`);
      console.log("저장 성공!")
    }

    return {
      log,
      getLogs: () => logs,
    };
  }

  return function () {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

export default Logger;
