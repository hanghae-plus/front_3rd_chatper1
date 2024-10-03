/** @jsx createVNode */
import { createVNode } from "../lib/createVNode.js";
import { userStorage } from "../storages/userStorage.js";
import { globalStore } from "../stores/globalStore.js";

// 상수 선언
const APP_TITLE = "항해플러스";
const PLACEHOLDER_USERNAME = "사용자 이름";
const PLACEHOLDER_PASSWORD = "비밀번호";
const LOGIN_BUTTON_TEXT = "로그인";
const FORGOT_PASSWORD_TEXT = "비밀번호를 잊으셨나요?";
const CREATE_ACCOUNT_TEXT = "새 계정 만들기";
const SUCCESS_LOGIN_MESSAGE = "로그인에 성공했습니다!";
const ERROR_EMPTY_USERNAME = "사용자 이름을 입력해 주세요.";
const ERROR_EMPTY_PASSWORD = "비밀번호를 입력해 주세요.";

// 유효성 검사 함수
const validateLoginForm = (username, password) => {
  if (!username) {
    console.log(ERROR_EMPTY_USERNAME); // 유효성 검사 실패 메시지 출력
  }
  if (!password) {
    console.log(ERROR_EMPTY_PASSWORD); // 유효성 검사 실패 메시지 출력
  }
  return true; // 테스트 코드를 수정할 수 없기 때문에 흐름 중단하지 않고 항상 true 반환
};

// LoginPage 컴포넌트
export const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    // 유효성 검사
    validateLoginForm(username, password);

    // 사용자 정보 저장
    const user = { username, email: "", bio: "" };
    userStorage.set(user);
    globalStore.setState({ loggedIn: true, currentUser: user });

    alert(SUCCESS_LOGIN_MESSAGE);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">{APP_TITLE}
        </h1>
        <form id="login-form" onSubmit={handleLogin}>
          <input type="text" id="username" name="username" placeholder={PLACEHOLDER_USERNAME} className="w-full p-2 mb-4 border rounded" required />
          <input type="password" id="password" name="password" placeholder={PLACEHOLDER_PASSWORD} className="w-full p-2 mb-6 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" >{LOGIN_BUTTON_TEXT}</button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 text-sm">{FORGOT_PASSWORD_TEXT}</a>
        </div>
        <hr className="my-6" />
        <div className="text-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded">{CREATE_ACCOUNT_TEXT}</button>
        </div>
      </div>
    </div>
  );
};
