/** @jsx createVNode */
import { Header, Navigation, Footer } from "../components";
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { userStorage } from "../storages";

export const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username = "", email = "", bio = "" } = currentUser ?? {};

  // userInfo 객체 생성
  let userInfo = {
    username,
    email,
    bio,
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // 폼 제출 시, 값 가져오기
    const updatedUsername = document.getElementById("username").value;
    const updatedEmail = document.getElementById("email").value;
    const updatedBio = document.getElementById("bio").value;

    // 사용자 정보 업데이트
    const updatedUser = {
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    };

    // 로그인 정보 저장
    globalStore.setState({ currentUser: updatedUser });
    userStorage.set(updatedUser);

    // 상태 업데이트
    userInfo = { ...updatedUser };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    userInfo[name] = value;
  };

  if (!loggedIn) {
    return (
      <div classsName="bg-gray-100 min-h-screen flex justify-center items-center">
        <h2 classsName="text-xl text-red-500">로그인이 필요합니다.</h2>
      </div>
    );
  }

  return (
    <div classsName="bg-gray-100 min-h-screen flex justify-center">
      <div classsName="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />

        <main classsName="p-4">
          <div classsName="bg-white p-8 rounded-lg shadow-md">
            <h2 classsName="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form" onSubmit={handleProfileUpdate}>
              <div classsName="mb-4">
                <label
                  for="username"
                  classsName="block text-gray-700 text-sm font-bold mb-2"
                >
                  사용자 이름
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  classsName="w-full p-2 border rounded"
                  value={userInfo.username}
                  onInput={handleChange}
                  required
                />
              </div>
              <div classsName="mb-4">
                <label
                  for="email"
                  classsName="block text-gray-700 text-sm font-bold mb-2"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  classsName="w-full p-2 border rounded"
                  value={userInfo.email}
                  onInput={handleChange}
                  required
                />
              </div>
              <div classsName="mb-6">
                <label
                  for="bio"
                  classsName="block text-gray-700 text-sm font-bold mb-2"
                >
                  자기소개
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  classsName="w-full p-2 border rounded"
                  value={userInfo.bio}
                  onInput={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                classsName="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
