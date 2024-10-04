/** @jsx createVNode */
import { Footer, Header, Navigation } from "../components";
import { createVNode } from "../lib";
import { userStorage } from "../storages";
import { globalStore } from "../stores";

export const ProfilePage = () => {
  const { loggedIn, currentUser } = globalStore.getState();
  const { username, email, bio } = currentUser ?? {};

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const bio = document.getElementById("bio").value.trim();

    userStorage.set({
      username,
      email,
      bio,
    });

    globalStore.setState({
      currentUser: userStorage.get(),
    });
      alert("업데이트 되었습니다!")
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full min-h-screen">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  for="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  사용자 이름
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border rounded"
                  value={username ? username : ""}
                />
              </div>
              <div className="mb-4">
                <label
                  for="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full p-2 border rounded"
                  value={email ? email : ""}
                />
              </div>
              <div className="mb-6">
                <label
                  for="bio"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  자기소개
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className="w-full p-2 border rounded"
                >
                  {bio ? bio : ""}
                </textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded font-bold"
                data-submit="profile-form"
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
