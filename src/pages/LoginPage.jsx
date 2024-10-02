/** @jsx createVNode */
import { createVNode } from "../lib";
import { userStorage } from "../storages";
import { globalStore } from "../stores";

export const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;

    if (!username) {
      alert("아이디를 입력해주세요!");
      return;
    }

    // 로그인 처리
    const user = { username, email: "", bio: "" };
    globalStore.setState({ currentUser: user, loggedIn: true });
    userStorage.set(user);
  };

  return (
    <div classsName="bg-gray-100 flex items-center justify-center min-h-screen">
      <div classsName="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 classsName="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="사용자 이름"
            classsName="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            classsName="w-full p-2 mb-6 border rounded"
            required
          />
          <button
            type="submit"
            classsName="w-full bg-blue-600 text-white p-2 rounded"
          >
            로그인
          </button>
        </form>
        <div classsName="mt-4 text-center">
          <a href="#" classsName="text-blue-600 text-sm">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <hr classsName="my-6" />
        <div classsName="text-center">
          <button classsName="bg-green-500 text-white px-4 py-2 rounded">
            새 계정 만들기
          </button>
        </div>
      </div>
    </div>
  );
};
