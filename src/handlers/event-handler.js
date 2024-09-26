/**
 * @class EventHandler
 * 전역 이벤트를 관리하고 처리하는 클래스. 클릭 및 제출 이벤트 처리.
 * @property {RouterManager} router - 경로 관리를 담당하는 라우터 인스턴스
 * @property {StateManager} state - 전역 상태 관리를 담당하는 상태 관리 인스턴스
 */
export default class EventHandler {
  constructor(router, state) {
    this.router = router;
    this.state = state;
  }

  /**
   * 모든 이벤트 리스너를 설정하는 메서드.
   * 클릭 및 제출 이벤트에 대한 리스너를 등록합니다.
   */
  setupEventListeners() {
    // 클릭 이벤트 처리
    document.addEventListener('click', (e) => {
      if (e.target.matches('#logout')) {
        this.handleLogout(e);
      }

      if (e.target.matches('#link')) {
        this.handleNavigation(e);
      }
    });

    // 제출 이벤트 처리
    document.addEventListener('submit', (e) => {
      if (e.target.matches('#login-form')) {
        this.handleLoginFormSubmit(e);
      }

      if (e.target.matches('#profile-form')) {
        this.handleProfileUpdateSubmit(e);
      }
    });
  }

  /**
   * 로그아웃 버튼 클릭 시 실행되는 메서드
   * @param {Event} e - 클릭 이벤트 객체
   */
  handleLogout(e) {
    e.preventDefault();
    this.state.signOut();
    this.router.navigateTo('/login');
  }

  /**
   * 링크 클릭 시 경로를 처리하는 메서드
   * @param {Event} e - 클릭 이벤트 객체
   */
  handleNavigation(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    this.router.navigateTo(href);
  }

  /**
   * 로그인 폼 제출 시 실행되는 메서드
   * @param {Event} e - 제출 이벤트 객체
   */
  handleLoginFormSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    // 상태 변경 후 프로필 페이지로 이동
    this.state.signIn({ username, email: '', bio: '' });
    this.router.navigateTo('/profile');
  }

  handleProfileUpdateSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    this.state.updateUserProfile({ username, email, bio });
    alert('프로필이 업데이트 되었습니다.');
  }
}
