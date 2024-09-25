import { setState } from './State';

const Nav = (currentPath) => {
    const user = JSON.parse(localStorage.getItem("user"))
    
      const isActive = (path) => currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
    
      return `
          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
               <li><a href="/" class="menu ${isActive("/")}">홈</a></li>
               ${user ? `<li><a href="/profile" class="menu ${isActive("/profile")}">프로필</a></li>` : ""}
               ${user ? `<li><a href="/login" id="logout" class="menu ${isActive("/login")}">로그아웃</a></li>` : `<li><a href="/login" id="login" class="menu ${isActive("/login")}">로그인</a></li>`}
            </ul>
          </nav>
      `;
    };
    
    // 로그아웃 함수
    const logoutEvent = () => {
      const logout = document.getElementById("logout");

      //위의 user가 localStorage에 값이 있을 때 logout 요소가 있어서 그때 로그아웃 클릭 시 실행 가능 
      if (logout) {
          logout.addEventListener("click", (event) => {
          event.preventDefault();
          //localStorage user 제거
          localStorage.removeItem("user");
          // 상태 변경
          setState({ user: null },"/login"); 

        });
      }
    };
    
    export { Nav, logoutEvent };
    