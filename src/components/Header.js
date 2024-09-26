export default class Header {
  constructor() {
    // document.title = "Header";
  }
  getStyle(linkPath) {
    const pathName = window.location.pathname;
    return pathName === linkPath ? "text-blue-600 font-bold" : "text-gray-600";
  }
  getHtml() {
    const isLoggedIn = localStorage.getItem("user") !== null; // 로그인 여부 확인
    const logoutText = isLoggedIn ? "로그아웃" : "로그인"; // 상태에 따라 텍스트 변경

    return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            <header class="bg-blue-600 text-white p-4 sticky top-0">
              <h1 class="text-2xl font-bold">항해플러스</h1>
            </header>
  
            <nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li><a href="/" class="${this.getStyle("/")}">홈</a></li>
                <li id="profileBtn"><a href="/profile" class="${this.getStyle(
                  "/profile"
                )}">프로필</a></li>
                <li id="logout"><a href="/login" class="${this.getStyle(
                  "/login"
                )}">${logoutText}</a></li>
              </ul>
            </nav>
        `;
  }
  addEventListeners() {
    // 로그인 버튼 클릭 시 이벤트 리스너 추가
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.reqLogout();
    });

    //프로필 버튼 클릭시
    const profileBtn = document.getElementById("profileBtn");
    profileBtn.addEventListener("click", (event) => {
      event.preventDefault();
      //로그인이 되지 않은 상태 & 프로필 페이지 진입시 -> 로그인 페이지로 이동
      if (!localStorage.getItem("user")) {
        let url = location.origin + "/login";
        history.pushState({ page_id: "LoginPage" }, null, url); //로그인페이지로
      } else {
        let url = location.origin + "/profile";
        history.pushState({ page_id: "ProfilePage" }, null, url);
      }
      window.dispatchEvent(new Event("popstate"));
    });
  }
  reqLogout() {
    //로그아웃
    //사용자 정보 삭제
    window.localStorage.removeItem("user");

    let url = location.origin + "/login";
    history.pushState({ page_id: "LoginPage" }, null, url); //로그인페이지로
    window.dispatchEvent(new Event("popstate"));
  }
}
