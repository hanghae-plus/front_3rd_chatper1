import { routes , navigateTo} from "../router";
import Common from "../common";
export default class Header extends Common {
  render () {
    this.$target.innerHTML = this.template();
    this.setTemplate();
    this.setEvent();
  }
  setup () {
    this.setState({menuList:['홈']});
    if(!this.state.isLogined){
      this.setState({menuList:[...this.state.menuList,'로그인']})
    }else this.setState({menuList:[...this.state.menuList,'프로필']})
  };
  template () { 
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
  setEvent () {
    this.$target.querySelectorAll("#nav_link").forEach(element => {
      element.addEventListener("click", (e) => {
        // if (e.target.matches("[data-link]")){
          e.preventDefault();
          navigateTo(e.target.href);
        // }
        console.log(e,e.target.matches("[data-link]"))
      })
    });
    // 로그아웃 클릭 이벤트 설정 (로그아웃 메뉴가 있을 때만)
    if (this.state.isLogined) {
      this.$target.querySelector('#logout').addEventListener('click', (e) => {
          e.preventDefault(); // 기본 동작 방지 (리다이렉트 방지)
          // 로그아웃 시 localStorage의 'user' 삭제
          localStorage.removeItem('user');
          navigateTo('/login');
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
        <li id="nav_link">
          <a data-link href="${menu.path}" class="${menu.path === currentPath ? 'text-blue-600 font-bold' : 'text-gray-600'}">
            ${menu.name}
          </a>
        </li>
      `),
      this.state.isLogined ?
      // 로그아웃 메뉴 추가
      `
        <li id="logout">
          <a data-link href="#" class="text-gray-600">
            로그아웃
          </a>
        </li>
      ` : ''
    ].join('');
  
  }
}