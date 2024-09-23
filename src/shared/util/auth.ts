import { router } from './Router';
import { safeLocalStorage } from './localStorage';

export const USER_INFO_KEY = 'user';

export type UserInfo = {
  /** 로그인 id */
  name: string;

  /** 프로필 */
  username?: string;

  /** 이메일 */
  email: string;

  /** 자기소개 */
  bio: string;
};

export const defaultUserInfo: UserInfo = {
  name: '',
  bio: '',
  email: '',
  username: '',
};

export const setUserInfo = (payload: UserInfo) => {
  safeLocalStorage.set(USER_INFO_KEY, JSON.stringify(payload));
};

export const getUserInfo = (): UserInfo | null => {
  const userInfoString = safeLocalStorage.get(USER_INFO_KEY);
  return userInfoString ? JSON.parse(userInfoString) : null;
};

export const logout = () => {
  safeLocalStorage.remove(USER_INFO_KEY);
  router.navigateTo('/');
};

export const login = (payload: Pick<UserInfo, 'name'>) => {
  setUserInfo({
    email: '',
    bio: '',
    ...payload,
  });
  router.navigateTo('/profile');
};

export const isLoggedIn = () => {
  return !!getUserInfo();
};
