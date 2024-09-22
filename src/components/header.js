import { routes } from "../router";
export default class Header {
  $target;
  state;
  constructor ($target,state) { // 클래스 생성자 함수. mouted같아 
    this.$target = $target;
    this.setup();
    // this.menuList = menu;
    this.setState(state);
    console.log(this.$target )
    this.render();
  }
  setup () {
    this.state = ['홈'];
    
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
    // this.setEvent();
    this.setTemplate()

  }
  setEvent () {
    
  }
  setTemplate() {
    const { menuList = [] } = this.state; // 기본값 처리
    if (!menuList.length) return; // menuList가 없을 경우 종료
    
    const menuRoutes = menuList.flatMap(menu => routes.filter(route => route.name === menu));
  
    const currentPath = location.pathname; // 현재 경로 캐싱
  
    // 템플릿을 생성할 때 현재 경로와 일치하는 항목에 스타일 추가
    this.$target.querySelector('#menu_list').innerHTML = menuRoutes
      .map(menu => `
        <li id="nav_link">
          <a href="${menu.path}" class="${menu.path === currentPath ? 'text-blue-600' : 'text-gray-600'}">
            ${menu.name}
          </a>
        </li>
      `).join('');
  }
  setState (newState) {
    console.log(newState)
    this.state ={ menuList:[...this.state, ...newState ]};

    // this.render();
  }
}