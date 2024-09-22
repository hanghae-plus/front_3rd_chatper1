const Logger = (function () {
  let instance
  let logs = []

  function createInstance() {
    function log(message) {
      const timestamp = new Date().toISOString()
      logs.push(`${timestamp}: ${message}`)
      console.log(`${timestamp}: ${message}`)
    }

    function getLogs() {
      return logs
    }

    return {
      log,
      getLogs,
    }
  }

  return function () {
    if (!instance) {
      instance = createInstance()
    }
    return instance
  }
})()

export default Logger
