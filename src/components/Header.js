export default class Header {
    constructor() {
      document.title = "Header";
    }
    getStyle(linkPath) {
        const pathName = window.location.pathname;
        return pathName === linkPath ? 'text-blue-600' : 'text-gray-600';
    }
    getHtml() {
      return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            <header class="bg-blue-600 text-white p-4 sticky top-0">
              <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
  
            <nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li><a href="./" class="${this.getStyle('/')}">홈</a></li>
                <li><a href="./profile" class="${this.getStyle('/profile')}">프로필</a></li>
                <li>
                  <button id="logoutBtn" class="${this.getStyle('/login')}">로그아웃</button>
                </li>
              </ul>
            </nav>
        `;
    }
    addEventListeners() { //이벤트 모음
        const logoutBtn = document.getElementById('logoutBtn');
    
        // 로그인 버튼 클릭 시 이벤트 리스너 추가
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            this.reqLogout();
        });
    }
    reqLogout() { //로그아웃
        //사용자 정보 삭제
        window.localStorage.removeItem('userInfo');
        // window.localStorage.removeItem("userProfile");
        localStorage.setItem("loginYN", "N");
        
        let url = location.origin + '/login';
        history.pushState({page_id : 'LoginPage', data : 'test'}, null, url); //로그인페이지로
    }
  }
  