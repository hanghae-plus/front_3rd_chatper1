type userInfoType = {
  username: string;
  email: string;
  bio: string;
};

export function userInfoStore() {
  let userInfo: userInfoType = {
    username: '',
    email: '',
    bio: '',
  };

  const setUser = (user: userInfoType) => (userInfo = user);
  const getUser = () => userInfo;

  return { setUser, getUser };
}
