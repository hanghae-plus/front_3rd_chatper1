/** @jsx createVNode */
import { createVNode } from "../lib";
import { router } from "../main";
import { userStorage } from "../storages";
import { globalStore } from "../stores";

export const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    if (username) {
      const currentUser = { username, email: "", bio: "" };
      // user 정보를 "user" 키로 localStorage에 저장
      userStorage.set(currentUser);
      console.log("userStorage after set:", userStorage.get("user"));

      // 글로벌 스토어 업데이트
      globalStore.setState({ currentUser, loggedIn: true });
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-md w-full">
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
            항해플러스
          </h1>
          <form
            id="login-form"
            data-submit="login-form"
            onSubmit={handleSubmit}
          >
            <div class="mb-4">
              <input
                type="text"
                placeholder="이메일 또는 전화번호"
                class="w-full p-2 border rounded"
                id="username"
                name="username"
              />
            </div>
            <div class="mb-6">
              <input
                type="password"
                placeholder="비밀번호"
                class="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              data-submit="login-form"
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
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
              새 계정 만들기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
