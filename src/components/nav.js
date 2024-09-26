import User from "../js/user";

export function Nav() {
  const path = window.location.pathname;
  const user = User.getUser();

  const homeActive = path === "/" ? "text-blue-600 font-bold" : "text-gray-600";
  const profileActive =
    path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600";
  const authLink = user
    ? `<li><a href="javascript:void(0)" id="logout" class="text-gray-600">로그아웃</a></li>`
    : `<li><a href="/login" class="text-gray-600">로그인</a></li>`;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${homeActive}">홈</a></li>
        <li><a href="/profile" class="${profileActive}">프로필</a></li>
       ${authLink}
      </ul>
    </nav>
  `;
}
