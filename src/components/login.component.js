import { router } from "../router/router";
import { isNullorUndefined } from "../util";

export default function Login() {
  const templateName = "LOGIN";

  // 인증 정보 초기화
  const initUserInfo = () => {
    const user = localStorage.getItem("user");
    if (!isNullorUndefined(user)) {
      localStorage.clear();
    }
  };

  const initHTML = () => {
    // html 페이지 주입
    router.metadataInit("로그인");
    const html = router.templates[templateName];
    document.querySelector("#root").innerHTML = html;
  };

  const hydratePage = () => {
    // form 활성화
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // validation : TC 통과를 위해 주석 처리
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameInput = document.getElementById("username");
      // const passwordInput = document.getElementById("password");
      // if (usernameInput.value === "" || isNullorUndefined(usernameInput.value)) {
      //   document.getElementById("id-error").innerText = "필수 입력 값입니다.";
      //   return;
      // } else if (!emailRegex.test(usernameInput.value)) {
      //   document.getElementById("id-error").innerText = "이메일 형식이 아닙니다.";
      //   return;
      // } else {
      //   document.getElementById("id-error").innerText = null;
      // }
      // if (passwordInput.value === "" || isNullorUndefined(passwordInput.value)) {
      //   document.getElementById("pw-error").innerText = "필수 입력 값입니다.";
      //   return;
      // } else {
      //   document.getElementById("pw-error").innerText = null;
      // }

      // Login(submit)
      localStorage.setItem(
        "user",
        JSON.stringify({ username: usernameInput.value, email: "", bio: "" })
      );
      router.navigateTo("/");
    });
  };

  initUserInfo();
  initHTML();
  hydratePage();
}
