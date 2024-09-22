import { router } from '../Router';
import { safeLocalStorage } from './localStorage';

export const USER_INFO_KEY = 'userInfo';

export type UserInfo = { name: string; email: string; bio: string };

export const logout = () => {
  safeLocalStorage.remove(USER_INFO_KEY);
  router.navigateTo('/');
};

export const login = (userInfo: UserInfo) => {
  safeLocalStorage.set(USER_INFO_KEY, JSON.stringify(userInfo));
  router.navigateTo('/profile');
};

export const isLoggedIn = () => {
  return !!safeLocalStorage.get(USER_INFO_KEY);
};
