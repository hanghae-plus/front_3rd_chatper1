/** @jsx createVNode */
import { createVNode } from '../lib';
import { router } from '../main';
import { userStorage } from '../storages';
import { globalStore } from '../stores';

const login = (username) => {
  globalStore.setState({ currentUser: { username, email: '', bio: '' } });
  globalStore.setState({ loggedIn: true });
  userStorage.set({ username, email: '', bio: '' });
  router.push('/profile');
};
export const LoginPage = () => {
  const submitLogin = () => {
    const username = document.getElementById('username').value;
    if (username) login(username);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full">
        <main className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
            <form id="login-form" onSubmit={submitLogin}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="이메일 또는 전화번호"
                  className="w-full p-2 border rounded"
                  id="username"
                  name="username"
                />
              </div>
              <div className="mb-6">
                <input type="password" placeholder="비밀번호" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">
                로그인
              </button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 text-sm">
                비밀번호를 잊으셨나요?
              </a>
            </div>
            <hr className="my-6" />
            <div className="text-center">
              <button className="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
