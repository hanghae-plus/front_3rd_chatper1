export default class Header {
  $target;
  state;
  constructor () { // 클래스 생성자 함수. mouted같아 
    // this.$target = $target;
    // this.menuList = menu;
    this.setup();
    // this.render();
  }
  setup () {
    this.state = ['홈'];
  };
  template () { 
    const { menuList } = this.state;

    return `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
          ${menuList.map(menu => `<li id="nav_link">${menu}</li>`).join('')}
            <li><a href="/" class="text-blue-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
            <li><a href="#" class="text-gray-600">로그아웃</a></li>
            <li><a href="#" class="text-gray-600">로그인</a></li>
          </ul>
        </nav>
    ` 
  }
  render () {
    // console.log(this.$target)
    // this.$target.innerHTML = this.template();
    // this.setEvent();
  }
  setEvent () {
    
  }
  setState (newState) {
    this.state ={ menuList:[...this.state, ...newState ]};
    // this.render();
  }
}