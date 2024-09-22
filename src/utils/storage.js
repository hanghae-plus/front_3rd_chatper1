const Storage = (function () {
  function saveData(key, value) {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('로컬 스토리지에 데이터 저장 실패', error)
    }
  }

  function loadData(key) {
    try {
      const jsonValue = localStorage.getItem(key)
      return jsonValue ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error('로컬 스토리지의 데이터 호출 실패:', error)
      return null
    }
  }

  function clearData() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('로컬 스토리지의 데이터 삭제 실패:', error)
    }
  }

  return {
    saveData,
    loadData,
    clearData,
  }
})()

export default Storage