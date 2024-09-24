export class Router {
  constructor() {
    this.routes = {}; // 경로 테이블 저장
    window.addEventListener('popstate', this.handlePopState.bind(this)); // popstate 이벤트를 감지
  }

  addRoute(path, handler) {
    this.routes[path] = handler; // 경로에 따른 핸들러 저장
  }

  navigateTo(path) {
    history.pushState(null, '', path); // 경로를 변경 (새로고침 없이)
    this.handleRoute(path); // 해당 경로에 맞는 페이지를 렌더링
  }

  handlePopState() {
    this.handleRoute(window.location.pathname); // popstate 이벤트 발생 시 경로 처리
  }

  handleRoute(path) {
    const handler = this.routes[path] || this.routes['/404']; // 경로에 맞는 핸들러가 없으면 404 페이지로 이동
    document.querySelector('#root').innerHTML = handler(); // #root 요소에 해당 경로의 HTML 삽입
  }

  initializeRouter() {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        // data-link 속성이 있는 링크 클릭 시
        e.preventDefault();
        this.navigateTo(e.target.getAttribute('href')); // href를 읽어 경로 이동
      }
    });
  }
}
