import { Router } from './services/router.js';
import { homePage } from './components/HomePage.js';
import { profilePage } from './components/ProfilePage.js';
import { loginPage } from './components/LoginPage.js';
import { errorPage } from './components/ErrorPage.js';
import {
  saveUserData,
  clearUserData,
  setLoginStatus,
} from './services/auth.js';

// 전역 라우터 인스턴스 생성
export const router = new Router();

// 각 경로와 해당 컴포넌트를 연결
router.addRoute('/', homePage);
router.addRoute('/profile', profilePage);
router.addRoute('/login', loginPage);
router.addRoute('/404', errorPage);

// 페이지가 처음 로드되었을 때 라우터 실행
window.addEventListener('DOMContentLoaded', () => {
  router.handleRoute(window.location.pathname); // 현재 경로에 맞는 페이지 렌더링
  router.initializeRouter(); // 라우터 초기화 (이벤트 등록)
});

// 이벤트 위임을 통한 폼 제출 처리 및 로그아웃 처리
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'login-form') {
    e.preventDefault(); // 기본 폼 제출 방지

    const username = document.getElementById('username').value;

    if (username) {
      saveUserData({ username, email: '', bio: '' });
      console.log('저장된 사용자 데이터:', localStorage.getItem('user'));
      setLoginStatus(true);
      router.navigateTo('/profile');
    } else {
      alert('로그인 정보를 입력해주세요.');
    }
  }
});

// 로그아웃 클릭 이벤트 위임
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'logout') {
    e.preventDefault();
    let navContainer = document.querySelector('nav'); // 기존 네비게이션 바를 선택

    if (navContainer) {
      // 기존 네비게이션 바의 내용을 업데이트
      console.log('네비게이션 바 있음');
    } else {
      console.log('네비게이션 바 없음');
    }

    clearUserData();
    setLoginStatus(false);
    router.navigateTo('/login');
  }
});
