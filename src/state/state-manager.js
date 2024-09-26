import StorageManager from '../utils/storage-manager';

/**
 * @class StateManager
 * 애플리케이션 상태 관리 클래스
 * @property {Object|null} currentUser - 현재 로그인한 사용자 정보
 * @property {boolean} isLoggedIn - 로그인 상태 여부
 * @property {Function[]} listeners - 상태 변화에 반응할 리스너 함수 배열
 */
class StateManager {
  constructor() {
    this.currentUser = null;
    this.isLoggedInStatus = false;
    this.listeners = [];

    this.initialize();
  }

  /**
   * 상태 초기화 메서드 (LocalStorage에서 상태 로드)
   */
  initialize() {
    this.loadFromStorage();
  }

  /**
   * 사용자 로그인 처리
   * @param {Object} userData - 사용자 정보 객체 (예: { name: 'John', bio: 'Developer' })
   */
  signIn(userData) {
    this.currentUser = { ...userData };
    this.isLoggedInStatus = true;

    // LocalStorage에 사용자 정보 저장
    StorageManager.save('user', this.currentUser);

    // 상태 변경 알림
    this.notifyListeners();
  }

  /**
   * 로그아웃 처리 및 상태 초기화
   */
  signOut() {
    this.currentUser = null;
    this.isLoggedInStatus = false;

    // StorageManager를 통해 사용자 정보 삭제
    StorageManager.remove('user');

    // 상태 변경 알림
    this.notifyListeners();
  }

  /**
   * 로그인 상태 여부를 반환
   * @returns {boolean} 현재 사용자가 로그인 상태인지 여부
   */
  isLoggedIn() {
    return this.isLoggedInStatus;
  }

  /**
   * 현재 사용자 정보를 반환
   * @returns {Object|null} 현재 로그인된 사용자 정보 또는 null
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * 사용자 정보 업데이트
   * @param {Object} userData - 업데이트할 사용자 정보 객체
   */
  updateUserProfile(userData) {
    const updatedUser = { ...this.currentUser, ...userData };

    if (JSON.stringify(this.currentUser) !== JSON.stringify(updatedUser)) {
      this.currentUser = updatedUser;
      StorageManager.save('user', this.currentUser);
      this.notifyListeners();
    }
  }

  /**
   * 로컬 스토리지에서 사용자 정보를 불러와 상태를 업데이트
   */
  loadFromStorage() {
    const storedUser = StorageManager.load('user');
    if (storedUser) {
      this.currentUser = storedUser;
      this.isLoggedInStatus = true;
      this.notifyListeners();
    }
  }

  /**
   * 상태 변경 리스너 추가
   * @param {Function} listener - 상태가 변경될 때 호출될 함수
   */
  addChangeListener(listener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  /**
   * 상태 변경 리스너 제거
   * @param {Function} listener - 제거할 리스너 함수
   */
  removeChangeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * 상태가 변경될 때 모든 리스너 함수들을 호출
   */
  notifyListeners() {
    this.listeners.forEach(l => l.listener(this.currentUser));
  }
}

const state = new StateManager();
export default state;