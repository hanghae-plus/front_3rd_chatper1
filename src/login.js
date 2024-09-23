import { navigateTo } from './router.js';

function validate(id) {
  if (!id) {
    alert('아이디를 입력해주세요');
    return false;
  }

  return true;
}

export default function login(id) {
  if (!validate(id)) {
    return;
  }

  if (id === 'testuser') {
    localStorage.setItem('user', JSON.stringify({ 'name': 'testuser', 'email': '', 'bio': '' }));
    navigateTo('/');
  } else {
    alert('아이디 또는 비밀번호가 일치하지 않습니다');
  }
}