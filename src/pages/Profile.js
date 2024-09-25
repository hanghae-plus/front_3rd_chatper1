import Header from "../components/Header";
import Footer from "../components/Footer";
import { logout } from "../auth/auth";
import { getState, navigateTo, setState, subscribe } from "../main";

export default function ProfilePage() {
  const init = () => {
    render();
    addEventListener();
  };

  const render = () => {
    document.querySelector("#root").innerHTML = template();
  };

  const addEventListener = () => {
    document.querySelector("nav").addEventListener("click", (e) => {
      // 클릭 시 페이지 이동
      if (e.target.tagName === "A") {
        // 로그아웃 시 사용자 정보 제거
        if (e.target.id === "logout") {
          logout();
        }
        e.preventDefault();
        navigateTo(e.target.pathname);
      }
    });

    document.getElementById("profile-form").addEventListener("submit", (e) => {
      e.preventDefault();
      setState({
        username: document.getElementById("username")?.value || "", // 이메일 또는 전화번호(사용자 이름)
        email: document.getElementById("email")?.value || "", // 이메일
        bio: document.getElementById("bio")?.value || "", // 자기소개
      });
      localStorage.setItem("user", JSON.stringify(getState()));
      alert("프로필 수정이 완료되었습니다 :)");
    });
  };

  const template = () => {
    const profileForm = getState();
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        ${Header()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="${profileForm.username}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="${profileForm.email}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >${profileForm.bio}</textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
  `;
  };

  subscribe(init);
  init();
}
