import { formSubmitHandler } from "./formSubmitHandler";

export const Login = () => {
  const getHTML = () => {
    const main = document.createElement("main");
    main.setAttribute(
      "class",
      "bg-gray-100 flex items-center justify-center min-h-screen"
    );

    const container = document.createElement("div");
    container.setAttribute(
      "class",
      "bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    );

    // 제목 생성
    const title = document.createElement("h1");
    title.setAttribute(
      "class",
      "text-2xl font-bold text-center text-blue-600 mb-8"
    );
    title.textContent = "항해플러스";

    // 폼 생성
    const form = document.createElement("form");
    form.setAttribute("id", "login-form");

    // 이메일/전화번호 입력 필드 생성
    const userNameField = document.createElement("div");
    userNameField.setAttribute("class", "mb-4");

    const userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "username");
    userNameInput.setAttribute("placeholder", "사용자 이름");
    userNameInput.setAttribute("class", "w-full p-2 border rounded");

    userNameField.appendChild(userNameInput);

    // 비밀번호 입력 필드 생성
    const passwordField = document.createElement("div");
    passwordField.setAttribute("class", "mb-6");

    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("id", "password");
    passwordInput.setAttribute("placeholder", "비밀번호");
    passwordInput.setAttribute("class", "w-full p-2 border rounded");

    passwordField.appendChild(passwordInput);

    // 로그인 버튼 생성
    const loginButton = document.createElement("button");
    loginButton.setAttribute("type", "submit");
    loginButton.setAttribute(
      "class",
      "w-full bg-blue-600 text-white p-2 rounded font-bold button"
    );
    loginButton.textContent = "로그인";

    // 폼에 입력 필드와 버튼 추가
    form.appendChild(userNameField);
    form.appendChild(passwordField);
    form.appendChild(loginButton);

    formSubmitHandler(form, userNameInput, passwordInput, loginButton);

    // 비밀번호 찾기 링크 생성
    const forgotPasswordDiv = document.createElement("div");
    forgotPasswordDiv.setAttribute("class", "mt-4 text-center");

    const forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.setAttribute("href", "#");
    forgotPasswordLink.setAttribute("class", "text-blue-600 text-sm");
    forgotPasswordLink.textContent = "비밀번호를 잊으셨나요?";

    forgotPasswordDiv.appendChild(forgotPasswordLink);

    // 구분선 생성
    const hr = document.createElement("hr");
    hr.setAttribute("class", "my-6");

    // 새 계정 만들기 버튼 생성
    const createAccountDiv = document.createElement("div");
    createAccountDiv.setAttribute("class", "text-center");

    const createAccountButton = document.createElement("button");
    createAccountButton.setAttribute(
      "class",
      "bg-green-500 text-white px-4 py-2 rounded font-bold"
    );
    createAccountButton.textContent = "새 계정 만들기";

    createAccountDiv.appendChild(createAccountButton);

    // 컨테이너에 모든 요소 추가
    container.appendChild(title);
    container.appendChild(form);
    container.appendChild(forgotPasswordDiv);
    container.appendChild(hr);
    container.appendChild(createAccountDiv);

    // main에 컨테이너 추가
    main.appendChild(container);

    return main;
  };
  return { getHTML };
};
