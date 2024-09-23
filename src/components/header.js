import { routes } from "../router";
export default class Header {
  $target;
  state;
  constructor ($target,menuList) { // 클래스 생성자 함수. mouted같아 
    this.$target = $target;
    this.setup();
    // this.menuList = menu;
    this.state.menuList.push(...menuList);
    console.log(this.$target )
    this.render();
  }
  setup () {
    this.state = {menuList:['홈'], isLogined : !!(JSON.parse(localStorage.getItem('user-info')))};
    
  };
  template () { 
    // const { menuList } = this.state;

    return `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around" id="menu_list">
          </ul>
        </nav>
    ` 
  }
  render () {
    // console.log(this.$target)
    this.$target.innerHTML = this.template();
    this.setTemplate();
    this.setEvent();
    

  }
  setEvent () {
    this.$target.addEventListener("click", (e) => {
      console.log(e.target,e.target.matches("#nav_link"))
      if (e.target.matches("#nav_link")) {
        // e.preventDefault();
        // e.stopPropagation()
        navigateTo(e.target.href);
      }
    });
    // 로그아웃 클릭 이벤트 설정 (로그아웃 메뉴가 있을 때만)
  if (this.state.isLogined) {
    this.$target.querySelector('#logout_link').addEventListener('click', (e) => {
      e.preventDefault(); // 기본 동작 방지 (리다이렉트 방지)
      // 로그아웃 시 localStorage의 'user-info' 삭제
      localStorage.removeItem('user-info');
    });
  }
  }
  setTemplate() {
    const { menuList = [] } = this.state; // 기본값 처리
    if (!menuList.length) return; // menuList가 없을 경우 종료
    
    const menuRoutes = menuList.flatMap(menu => routes.filter(route => route.name === menu));
    const currentPath = location.pathname; // 현재 경로 캐싱
  
    // 템플릿을 생성할 때 현재 경로와 일치하는 항목에 스타일 추가
    this.$target.querySelector('#menu_list').innerHTML = [
      ...menuRoutes.map(menu => `
        <li>
          <a id="nav_link" href="${menu.path}" class="${menu.path === currentPath ? 'text-blue-600' : 'text-gray-600'}">
            ${menu.name}
          </a>
        </li>
      `),
      this.state.isLogined ?
      // 로그아웃 메뉴 추가
      `
        <li>
          <a id="logout_link" href="#" class="text-gray-600">
            로그아웃
          </a>
        </li>
      ` : `
      <li>
          <a id="login_link" href="#" class="text-gray-600">
            로그인
          </a>
        </li>
        `
    ].join('');
  
  }
  setState (newState) {
    console.log(newState)
    this.state = { ...this.state, ...newState };

    // this.render();
  }
}