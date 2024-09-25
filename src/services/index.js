export function UserApiService() {
  let users = [
    {
      username: 'testuser',
      email: '',
      bio: ''
    },
    {
      username: 'user',
      email: 'hello@world.com',
      bio: 'Hello, World!'
    }
  ];

  // 사용자 조회
  const getUser = (username = '') =>
      users.find((user) => user.username === username) || null;

  // 프로필 업데이트
  const patchUser = (username = '', userInfo = {}) => {
      const hasUser = users.some((user) => user.username === username);
      if (!hasUser) return null;
      users = users.map((user) =>
        user.username === username ? { ...userInfo } : user
      );
      return userInfo;
    };

  return {
    getUser,
    patchUser,
  };
}