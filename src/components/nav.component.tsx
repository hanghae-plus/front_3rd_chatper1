import { h } from '../virtual-dom';

function nav() {
  return (
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="main" class="text-blue-600">
            홈
          </a>
        </li>
        <li>
          <a href="profile" class="text-gray-600">
            프로필
          </a>
        </li>
        <li>
          <a href="#" class="text-gray-600">
            로그아웃
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default nav;
