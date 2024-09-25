export default function Header() {
  const template = () => {
    const isActive = (path) =>
      window.location.pathname === path
        ? "text-blue-600 font-bold"
        : "text-gray-600";
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${isActive("/")}">홈</a></li>
          <li><a href="/profile" class="${isActive("/profile")}">프로필</a></li>
          <li>
            <a href="/login" id="logout" class="${isActive("/login")}">
              로그아웃
            </a>
          </li>
        </ul>
      </nav>
    `;
  };

  return template();
}
