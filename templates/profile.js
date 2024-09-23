import { html } from 'code-tag';

const template = html`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a class="text-gray-600" href="main.js">홈</a></li>
          <li><a class="text-blue-600" href="#">프로필</a></li>
          <li><a class="text-gray-600" href="#">로그아웃</a></li>
        </ul>
      </nav>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
            내 프로필
          </h2>
          <form>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >사용자 이름</label
              >
              <input
                class="w-full p-2 border rounded"
                id="username"
                name="username"
                type="text"
                value="홍길동"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >이메일</label
              >
              <input
                class="w-full p-2 border rounded"
                id="email"
                name="email"
                type="email"
                value="hong@example.com"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="bio"
              >자기소개</label
              >
              <textarea
                class="w-full p-2 border rounded"
                id="bio"
                name="bio"
                rows="4"
              >
안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea
              >
            </div>
            <button
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              type="submit"
            >
              프로필 업데이트
            </button>
          </form>
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>`;

export default template;