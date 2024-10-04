/** @jsx createVNode */
import { createVNode } from '@/lib';
import { router } from '@/main';
import { userStorage } from '@/storages';
import { globalStore } from '@/stores';

export const LoginPage = () => {
  function handleLogin(e) {
    e.preventDefault();

    const { username } = e.target.elements;

    if (username.value) {
      const data = { username: username.value, email: '', bio: '' };

      userStorage.set(data);
      globalStore.setState({ currentUser: data, loggedIn: true });
      router.push('/');
    } else {
      alert('아이디를 입력해주세요');
    }
  }

  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" id="login-form" onSubmit={handleLogin}>
          <div className="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 전화번호" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-6">
            <input type="password" placeholder="비밀번호" className="w-full p-2 border rounded" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-bold"
            id="login-submit-button"
          >
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
  );
};
