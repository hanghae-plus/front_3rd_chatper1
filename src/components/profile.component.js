import { user } from "../main";
import { router } from "../router/router";

export default function Profile() {
  const templateName = "PROFILE";

  const initHTML = () => {
    // html 페이지 주입
    router.metadataInit("프로필");
    const html = router.templates[templateName];
    document.querySelector("#content").innerHTML = html;
  };

  const hydratePage = () => {
    // 전역 상태 적용 버튼 활성화
    document
      .querySelector("#global-state-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        user.set({
          username: "손흥민",
          email: "봉준호",
          bio: "김종현 let's go",
        });
      });

    // form 활성화
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const usernameInput = document.getElementById("username");
      const emailInput = document.getElementById("email");
      const bioInput = document.getElementById("bio");
      const userInfo = {
        username: usernameInput.value,
        email: emailInput.value,
        bio: bioInput.value,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      router.navigateTo("/");
    });
  };

  // 전역 변수 구독
  const subscribe = () => {
    user.subscribe(() => {
      initHTML();
      initForm();
      hydratePage();
      setForm(user.get());
    });
  };

  const initForm = () => {
    setForm(JSON.parse(localStorage.getItem("user")));
  };

  const setForm = ({ username, email, bio }) => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioInput = document.getElementById("bio");
    usernameInput.value = username ?? "";
    emailInput.value = email ?? "";
    bioInput.value = bio ?? "";
  };

  initHTML();
  initForm();
  hydratePage();
  subscribe();
}
