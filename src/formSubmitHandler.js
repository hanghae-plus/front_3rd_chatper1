import { navigateTo, router } from "./router";

export const formSubmitHandler = (
  form,
  nameInput,
  passwordInput,
  loginButton
) => {
  const checkInputTrim = () => {
    // 입력 필드 값 가져오기
    const isUserName = nameInput.value.trim() !== "";
    const isUserPassword = passwordInput.value.trim() !== "";

    console.log("isUserName:", isUserName);
    console.log("isUserPassword", isUserPassword);

    if (isUserName && isUserPassword) {
      loginButton.removeAttribute("disabled");
    } else {
      loginButton.setAttribute("disabled", "true");
    }
  };

  nameInput.addEventListener("change", checkInputTrim);
  passwordInput.addEventListener("change", checkInputTrim);

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    localStorage.setItem(
      "user",
      JSON.stringify({ username: nameInput.value, email: "", bio: "" })
    );
    navigateTo("/");
  });
};

export const logoutHandler = (logoutButton) => {
  const removeUser = () => {
    localStorage.removeItem("user");
    router();
  };

  logoutButton.addEventListener("click", removeUser);
};
