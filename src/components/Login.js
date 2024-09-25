import { setState } from './State';

const Login = (isError = false) => {
  return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          ${isError ? `
            <div> 
              <h2>오류 발생!</h2>
              <p>의도적인 오류입니다.</p>
            </div>`
            : ''
          }
          <div class="mb-4">
            <input type="text" id="username" placeholder="이메일 또는 사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button id="createAccount" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;
};

//에러 발생 시 isError를 true로 만들어서 에러 메시지 부분 렌더링
const render = (root, isError = false) => {
  root.innerHTML = Login(isError);
};

const loginEvent = () => {

  const loginForm = document.getElementById("login-form");

  //login 페이지에 진입한 것 자체가 login-form이 있는 상황이지만 체크 후 login 로직 진행
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      //username을 trim()으로 처음과 마지막 값 잘라서 가져오기
      const username = document.getElementById("username").value.trim();

      //ID 입력 유효성 검사
      if (!username) {
        alert("이메일 또는 전화번호를 입력해 주세요.");
        return;
      }

      // 로그인 시에는 username만 저장해서 다른 값은 빈문자열로 저장하고 username만 input의 값으로 세팅
      const user = {
        username: username,
        email: '',
        bio: '',
      };
      
      //localStorage에 로그인 정보 저장
      localStorage.setItem('user', JSON.stringify(user));

      // 상태 변경
      setState({ user: user },'/profile'); 
    });

    //에러 발생 시 처리 추가
    window.addEventListener("error", () => {
      render(document.getElementById('root'), true); // 에러 메시지를 포함한 로그인 컴포넌트 렌더링
    });

  }
};

export default Login;
export { loginEvent };
