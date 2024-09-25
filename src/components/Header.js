import { isLoggedIn } from "../utils/auth";

/**
 * isLoggedIn(로그인 여부)에 따라 네비게이션 메뉴를 다르게 표시합니다.
 */
export default function Header() {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class="text-blue-600 font-bold">홈</a>
        </li>
        ${
          isLoggedIn()
            ? `
              <li><a href="/profile" class="text-gray-600">프로필</a></li>
              <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
              `
            : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
        }
      </ul>
    </nav>
  `;
}
``;
