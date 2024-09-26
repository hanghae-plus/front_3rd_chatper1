import { UserPreferences } from '../services/UserPreferences.js';
import Router from '../router/Router.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { PostList } from '../components/PostList.js';

export const renderHomePage = (isLoggedIn) => {
  document.querySelector('#root').innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header(isLoggedIn)}  
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>  
          <div class="space-y-4">
            <div class="space-y-4">${PostList()}</div>
          </div>
        </main>  
        ${Footer()}
      </div>
    </div>
  `;

  // 로그아웃 버튼 클릭 이벤트 리스너 추가
  if (isLoggedIn) {
    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();

      // LocalStorage에서 데이터 삭제
      UserPreferences.delete();

      const router = Router.getInstance();
      router.handleLogout();
      router.navigateTo('/');
    });
  }
};
