import Logger from "./logger"

const AsyncStorage = (function () {
  async function saveData(key, value) {
    return new Promise((resolve, reject) => {
      try {
        const jsonValue = JSON.stringify(value)
        localStorage.setItem(key, jsonValue)
        Logger().log(`로컬 스토리지: ${key}에 저장 성공`)
        resolve(true)
      } catch (error) {
        Logger().log('로컬 스토리지: 저장 실패')
        console.error('로컬 스토리지: 저장 실패', error)
        reject(error)
      }
    })
  }

  async function loadData(key) {
    return new Promise((resolve, reject) => {
      try {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue) {
          const parsedValue = JSON.parse(jsonValue)
          Logger().log(`로컬 스토리지: ${key} 로드 성공`)
          resolve(parsedValue)
        } else {
          Logger().log(`로컬 스토리지: ${key}에 해당하는 데이터 없음`)
          resolve(null)
        }
      } catch (error) {
        Logger().log('로컬 스토리지 호출 실패')
        console.error('로컬 스토리지 호출 실패:', error)
        reject(error)
      }
    })
  }

  async function removeData(key) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key)
        Logger().log(`로컬 스토리지: ${key} 삭제 성공`)
        resolve(true)
      } catch (error) {
        Logger().log('로컬 스토리지 삭제 실패')
        console.error('로컬 스토리지 삭제 실패:', error)
        reject(error)
      }
    })
  }


  return {
    saveData, loadData, removeData,
  }
})()

export default AsyncStorage