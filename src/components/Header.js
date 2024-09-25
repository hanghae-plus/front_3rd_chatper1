export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const pathname = window.location.pathname;
  const selectNavCss = "text-blue-600 font-bold";
  const navCss = "text-gray-600";

  return `
        <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li class="${
            pathname === "/" ? selectNavCss : navCss
          }"><a href="/">홈</a></li>
         ${
           user?.username
             ? `<li class="${
                 pathname === "/profile" ? selectNavCss : navCss
               }"><a href="/profile">프로필</a></li>`
             : ``
         }
         
          <li><a href="/login" class="text-gray-600">
          ${renderAuthButton()}
          </a></li>
        </ul>
      </nav>
    `;
}

// 로그인/로그아웃 버튼 렌더링 함수
function renderAuthButton() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user
    ? `<button id="logout">로그아웃</button>`
    : `<button id="login">로그인</button>`;
}

export const logout = () => {
  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("user");
  });
};
