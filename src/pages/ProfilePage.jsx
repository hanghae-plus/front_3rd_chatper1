/** @jsx createVNode */
import { createVNode } from "../lib";
import { Footer, Header, Navigation } from "../components";
import { userStorage } from "../storages";
import { globalStore } from "../stores";

export const ProfilePage = () => {
  const { username, email, bio } = userStorage.get("user");

  const labelInput = (name, label, value, type = "text") => (
    <div class="mb-4">
      <label for={name} class="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value ? value : ""}
        class="w-full p-2 border rounded"
      />
    </div>
  );

  const handleProfileUpdate = (event) => {
    event.preventDefault();

    const updatedUsername = document.getElementById("username").value;
    const updatedEmail = document.getElementById("email").value;
    const updatedBio = document.getElementById("bio").value;

    const updatedUserData = {
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    };

    userStorage.set(updatedUserData);

    alert("프로필이 업데이트되었습니다.");
  };

  return (
    <div className="max-w-md w-full min-h-screen">
      <Header />
      <Navigation />
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
            내 프로필
          </h2>
          <form
            id="profile-form"
            data-submit="profile-form"
            onSubmit={handleProfileUpdate}
          >
            {labelInput("username", "사용자 이름", username)}
            {labelInput("email", "이메일", email)}

            <div class="mb-6">
              <label
                for="bio"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                자기소개
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                class="w-full p-2 border rounded"
              >
                {bio ? bio : ""}
              </textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              data-submit="profile-form"
            >
              프로필 업데이트
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
