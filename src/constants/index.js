export const NOTFOUND = '404';

export const ROUTES = {
  HOME: { id: 'home', path: '/', name: '홈' },
  PROFILE: { id: 'profile', path: '/profile', name: '프로필' },
  LOGIN: { id: 'login', path: '/login', name: '로그인' },
  LOGOUT: { id: 'logout', path: '#', name: '로그아웃' },
  POST: { id: 'post', path: '/post/:id', name: '게시글'}
};

export const ERRORS = {
  [NOTFOUND]: { path: `/${NOTFOUND}`, name: 'notfound' },
};
