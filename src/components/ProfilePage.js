import { renderNavBar } from './NavBar.js';

export function profilePage() {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">프로필</h1>
        </header>

        ${renderNavBar()}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-bold">프로필 페이지</h2>
            <p>사용자 정보 및 설정이 여기에 표시됩니다.</p>
          </div>
        </main>

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;
}
