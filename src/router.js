export default function Router() {
  const routes = {};

  /**
   * 경로 추가
   * @param {string} path
   * @param {HTMLElement} element
   */
  const addRoute = (path, element) => {
    routes[path] = element;
  };

  /**
   * 화면 렌더링
   * @param {string} path
   */
  const render = (path) => {
    // 로그인 정보 체크
    const isUser = JSON.parse(localStorage.getItem("user"));
    const isLoginPage = path === "/login";

    if (isUser && isLoginPage) {
      // 로그인 사용자가 로그인 페이지로 접근한 경우 홈 화면으로 전환
      navigateTo("/");
    } else if (!isUser && !isLoginPage && routes[path]) {
      // 비로그인 사용자가 로그인 페이지 외에 접근한 경우 로그인 페이지로 전환
      navigateTo("/login");
    } else {
      // 정상 접근 시 렌더링 && 비정상 URL 접근 시 404 화면
      const route = routes[path] || routes["/404"];
      document.querySelector("#root").innerHTML = route();
    }
  };

  const init = () => {
    // 현재 경로에 맞는 페이지 렌더링
    render(window.location.pathname);

    // popstate(앞으로가기/뒤로가기) 라우터 처리
    window.addEventListener("popstate", () => {
      render(window.location.pathname);
    });

    //  a 태그가 동적으로 생성되므로, 이벤트 위임(bubbling) 방법 사용
    const root = document.getElementById("root");
    root.addEventListener("click", (e) => {
      if (e.target.id === "logout") {
        // 로그아웃 시 사용자 정보 제거
        localStorage.removeItem("user");
      }
      if (e.target.tagName === "A") {
        // 클릭 시 페이지 이동
        e.preventDefault();
        navigateTo(e.target.pathname);
      }
    });

    // 로그인/프로필 수정 시 사용자 정보 저장
    const setUserInfo = () => {
      const loginForm = {
        username: document.getElementById("username")?.value || "", // 이메일 또는 전화번호(사용자 이름)
        email: document.getElementById("email")?.value || "", // 이메일
        bio: document.getElementById("bio")?.value || "", // 자기소개
      };

      localStorage.setItem("user", JSON.stringify(loginForm));
    };
    root.addEventListener("submit", (e) => {
      if (e.target?.id === "login-form") {
        // 로그인 정보 저장
        e.preventDefault();
        setUserInfo();
        navigateTo("/profile");
      } else if (e.target?.id === "profile-form") {
        // 프로필 정보 수정
        e.preventDefault();
        setUserInfo();
        alert("프로필 수정이 완료되었습니다 :)");
      }
    });
  };

  /**
   * 페이지 이동
   * @param {string} path
   */
  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      history.pushState(null, "", path);
      render(path);
    }
  };

  return {
    addRoute,
    navigateTo,
    render,
    init,
  };
}
