import { isLoggedIn } from "../main";

export function Header() {
  const currentPath = window.location.pathname;

  const profileLinkClass =
    currentPath === "/profile" ? "text-blue-600" : "text-gray-600";

  const homeLinkeClass =
    currentPath === "/profile" ? "text-gray-600" : "text-blue-600";

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li>
        <a href="/" class="${homeLinkeClass} cursor-pointer">홈</a>
      </li>
      <li>
        <a href="/profile" class="${profileLinkClass} cursor-pointer"
          >프로필</a
        >
      </li>
      <li>
        <a href="/login" class="text-gray-600 cursor-pointer" id=${
          isLoggedIn() ? "logout" : "login"
        }
          >${isLoggedIn() ? "로그아웃" : "로그인"}</a
        >
      </li>
    </ul>
  </nav>`;
}
