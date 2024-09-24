export const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";
  const introduction = localStorage.getItem("introduction")
    ? localStorage.getItem("introduction")
    : "";

  return `<main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-6">내 프로필</h1>
        <form id="profile-form" class="text-left">
          <label for="">사용자 이름 </label>
          <input id="username" type="text" class="rounded-md w-full border p-2 mb-6" value="${username}" />
          <label  for="" >이메일</label>
          <input id="email" type="text" class="rounded-md w-full border p-2 mb-6" placeholder="이메일" value="${email}"  />
          <label for="">자기소개</label>
          <textarea id="introduction" class="rounded-md w-full border p-2 mb-6" placeholder="자기소개" />${introduction}</textarea>
          <button class="rounded-md w-full bg-blue-600 text-white py-2">프로필 업데이트</button>
        </form>
      </main>`;
};

export const profileUpdate = () => {
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const introduction = document.getElementById("introduction").value;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("introduction", introduction);

    alert("프로필이 업데이트 되었습니다. ");
  });
};
