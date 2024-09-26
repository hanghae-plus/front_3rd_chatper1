const Storage = (function () {
  function save(key, value) {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('로컬 스토리지: 저장 실패', error)
    }
  }

  function load(key) {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('로컬 스토리지 호출 실패:', error)
      return null
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('로컬 스토리지 삭제 실패:', error)
    }
  }

  function clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('로컬 스토리지 삭제 실패:', error)
    }
  }

  return {
    save,
    load,
    remove,
    clear,
  }
})()

export default Storage
