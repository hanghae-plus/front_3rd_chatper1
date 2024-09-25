export default function headerTemplate(isUserLoggedIn) {
  const currentPath = window.location.pathname;
  const homeClass =
    currentPath === "/" ? "text-blue-600 font-bold" : "text-gray-600";
  const profileClass =
    currentPath === "/profile" ? "text-blue-600 font-bold" : "text-gray-600";

  return `
    <header class="flex flex-col">
      <div class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </div>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${homeClass}">홈</a></li>
          <li><a href="/profile" class="${profileClass}">프로필</a></li>
          <li>
            ${
              isUserLoggedIn
                ? `<a href="#" id="logout" class="text-gray-600">로그아웃</a>`
                : `<a href="/login" id="login" class="text-gray-600">로그인</a>`
            }
          </li>
        </ul>
      </nav>
    </header>
  `;
}
