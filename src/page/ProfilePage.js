export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return `<main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-6">내 프로필</h1>
        <form id="profile-form" class="text-left">
          <label for="">사용자 이름 </label>
          <input id="username" type="text" class="rounded-md w-full border p-2 mb-6" value="${user.username}" />
          <label  for="" >이메일</label>
          <input id="email" type="text" class="rounded-md w-full border p-2 mb-6" placeholder="이메일" value="${user.email}"  />
          <label for="">자기소개</label>
          <textarea id="bio" class="rounded-md w-full border p-2 mb-6" placeholder="자기소개" />${user.bio}</textarea>
          <button class="rounded-md w-full bg-blue-600 text-white py-2">프로필 업데이트</button>
        </form>
      </main>`;
};

export const profileUpdate = () => {
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    const user = {
      username,
      email,
      bio,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("프로필이 업데이트 되었습니다. ");
  });
};
