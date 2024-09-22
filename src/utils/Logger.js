const Logger = (function () {
  let instance;
  let logs = [];

  function logMessage(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${message}`;
    logs.push(logEntry);
    console.log(logEntry);
  }

  function getLogs() {
    return logs;
  }

  function createInstance() {
    return {
      log: logMessage,
      getLogs,
    };
  }

  return function getInstance() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

export default Logger