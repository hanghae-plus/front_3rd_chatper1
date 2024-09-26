type userInfoType = {
  username: string;
  email: string;
  bio: string;
};

export function userInfoStore() {
  let storage = localStorage.getItem('user') ?? '{}';
  let userInfoStorage = JSON.parse(storage);
  let userInfo: userInfoType = {
    username: userInfoStorage.username ?? '',
    email: userInfoStorage.email ?? '',
    bio: userInfoStorage.bio ?? '',
  };

  const setUser = (user: userInfoType) => (userInfo = user);
  const getUser = () => userInfo;

  return { setUser, getUser };
}
