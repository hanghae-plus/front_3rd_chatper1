/** @jsx createVNode */
import { createVNode } from '../lib';
import { useRouter } from '../router';
import { userStorage } from '../storages';
import { globalStore } from '../stores';

export const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // const username = e.target.username.value // 테스트 코드 오류 (dom이슈..?)

    // sol 1
    const username = e.target.querySelector('#username').value;

    // sol 2
    // const formData = new FormData(e.target);
    // const username = Object.fromEntries(formData);

    const updatedUser = { username, email: '', bio: '' };

    userStorage.set(updatedUser);

    globalStore.setState({
      currentUser: updatedUser,
      loggedIn: true
    });

    router.push('/profile');
  };

  return (
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="사용자 이름"
            class="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            class="w-full p-2 mb-6 border rounded"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded"
          >
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded">
            새 계정 만들기
          </button>
        </div>
      </div>
    </div>
  );
};
