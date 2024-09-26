/**
 * @class StorageManager
 * LocalStorage 관리 클래스. 데이터 저장, 불러오기, 삭제 기능을 제공.
 */
export default class StorageManager {
  /**
   * LocalStorage에 데이터를 저장하는 메서드
   * @param {string} key - 저장할 데이터의 키
   * @param {Object} value - 저장할 데이터 (객체 또는 원시값)
   */
  static save(key, value) {
    try {
      if (value === undefined) {
        throw new Error('Cannot store undefined value');
      }
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to LocalStorage: ${error}`);
    }
  }

  /**
   * LocalStorage에서 데이터를 불러오는 메서드
   * @param {string} key - 불러올 데이터의 키
   * @returns {Object|null} 불러온 데이터 (없을 경우 null 반환)
   */
  static load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error loading from LocalStorage: ${error}`);
      return null;
    }
  }

  /**
   * LocalStorage에서 데이터를 제거하는 메서드
   * @param {string} key - 삭제할 데이터의 키
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from LocalStorage: ${error}`);
    }
  }

  /**
   * LocalStorage에서 모든 데이터를 지우는 메서드
   */
  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing LocalStorage: ${error}`);
    }
  }
}
