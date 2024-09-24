export default function Nav() {
  return `
    <nav class="w-full bg-white shadow-md p-2 sticky top-14">
      <ul id="nav-list" class="w-full flex justify-around">
        <li class="w-1/3">
          <a data-route="home" id="nav-item-home" class="w-full flex align-center justify-center text-blue-600">홈</a>
        </li>
        <li class="w-1/3">
          <a data-route="profile" id="nav-item-profile" class="w-full flex align-center justify-center text-gray-600">프로필</a>
        </li>
        <li class="w-1/3">
          <a data-route="logout" id="nav-item-logout" class="w-full flex align-center justify-center text-gray-600">로그아웃</a>
        </li>
      </ul>
    </nav>
  `;
}
