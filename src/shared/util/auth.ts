import { router } from './Router';
import { safeLocalStorage } from './localStorage';

export const USER_INFO_KEY = 'user';

export type UserInfo = {
  username: string;

  email: string;

  bio: string;
};

export const defaultUserInfo: UserInfo = {
  bio: '',
  email: '',
  username: '',
};

export const setUserInfo = (payload: UserInfo) => {
  safeLocalStorage.set(USER_INFO_KEY, JSON.stringify(payload));
};

export const getUserInfo = (): UserInfo | undefined => {
  const userInfoString = safeLocalStorage.get(USER_INFO_KEY);
  return userInfoString ? JSON.parse(userInfoString) : undefined;
};

export const logout = () => {
  safeLocalStorage.remove(USER_INFO_KEY);
  router.navigateTo('/');
};

export const login = (payload: Pick<UserInfo, 'username'>) => {
  setUserInfo({
    ...payload,
    email: '',
    bio: '',
  });
  router.navigateTo('/profile');
};

export const isLoggedIn = () => {
  return !!getUserInfo();
};
