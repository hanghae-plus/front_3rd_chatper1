export default function Header() {
  const username = localStorage.getItem("username");

  const pathname = window.location.pathname;
  const selectNavCss = "text-blue-600";
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
           username
             ? `<li class="${
                 pathname === "/profile" ? selectNavCss : navCss
               }"><a href="/profile">프로필</a></li>`
             : ``
         }
         
          <li><a href="/login" class="text-gray-600">${
            username ? "로그아웃" : "로그인"
          }</a></li>
        </ul>
      </nav>
    `;
}
