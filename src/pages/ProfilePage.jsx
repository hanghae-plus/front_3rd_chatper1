/** @jsx createVNode */
import { createVNode } from "../lib";
import { globalStore } from "../stores/globalStore.js";
import { Footer, Header, Navigation } from "../components/index.js";
import { userStorage } from "../storages/userStorage.js";

// 상수 선언
const PAGE_TITLE = "내 프로필";
const SUCCESS_MESSAGE = "프로필이 성공적으로 업데이트되었습니다.";
const USER_NAME = "사용자 이름";
const EMAIL = "이메일";
const BIO = "자기소개";
``;
const PROFILE_UPDATE = "프로필 업데이트";

// ProfilePage 컴포넌트
export const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username = "", email = "", bio = "" } = currentUser ?? {};

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const form = document.getElementById("profile-form");
    const formData = new FormData(form);
    const updatedUsername = formData.get("username").trim();
    const updatedEmail = formData.get("email").trim();
    const updatedBio = formData.get("bio").trim();

    // 사용자 정보 저장
    userStorage.set({
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    });
    globalStore.setState({
      currentUser: {
        username: updatedUsername,
        email: updatedEmail,
        bio: updatedBio,
      },
    });

    alert(SUCCESS_MESSAGE);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">{PAGE_TITLE}</h2>
            <form id="profile-form" onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">{USER_NAME}</label>
                <input type="text" id="username" name="username" className="w-full p-2 border rounded" value={username} required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{EMAIL}</label>
                <input type="email" id="email" name="email" className="w-full p-2 border rounded" value={email} required />
              </div>
              <div className="mb-6">
                <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">{BIO}</label>
                <textarea id="bio" name="bio" rows="4" className="w-full p-2 border rounded" value={bio} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">{PROFILE_UPDATE}</button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
