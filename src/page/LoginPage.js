import { router } from "../main";

export const Login = () => {
  return `
    <main class="p-4">
       <div class="mb-4 bg-white rounded-lg shadow p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-6">항해플러스</h1>
        <form id="login-form">
          <input id="username" type="text" class="rounded-md w-full border p-2" placeholder="이메일 또는 전화번호" name="" id="" />
          <input id="password" type="text" class="rounded-md w-full border p-2 my-4" placeholder="비밀번호" name="" id="" />
          <button class="rounded-md w-full bg-blue-600 text-white py-2">로그인</button>
        </form>
         <p class="my-6 text-blue-500">비밀번호를 잊으셨나요?</p>
         <div class="border border-gray-100"></div>
         <button class="mt-6 text-white bg-green-600 px-3 py-2 rounded-md">새 계정 만들기</button>
        </div>
      </main>
    
    `;
};

export const loginEvent = () => {
  document.getElementById("login-form").addEventListener("submit", (e) => {
    loginErrorHandler();
    e.preventDefault();
    const username = document.getElementById("username").value;

    if (username === "") return alert("정보를 입력해주세요.");
    else {
      const user = {
        username,
        email: "",
        bio: "",
      };
      localStorage.setItem("user", JSON.stringify(user));
      history.pushState({}, "", "/profile");
      router();
    }
  });
};

export const loginErrorHandler = () => {
  document.getElementById("username").addEventListener(
    "input",
    () => {
      try {
        throw new Error("의도적인 오류입니다.");
      } catch (e) {
        renderErrorMessage("오류 발생! 의도적인 오류입니다.");
        document.getElementById("root").innerHTML =
          " <h1>오류 발생! 의도적인 오류입니다.</h1>";
      }
    },
    { once: true }
  );
};

//login한 상태의 유저가 오면, 홈으로 이동
export const userLoginCheck = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    history.pushState({}, "", "/");
    router();
  }
};