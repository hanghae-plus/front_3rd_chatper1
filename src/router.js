
export const createRouter = () => {
    const routes = {};
    
    // 경로 추가
    const addRoute = (path, handler) => {
        routes[path] = handler;
    };

    // Popstate 이벤트 핸들러
    // const handlePopState = () => {
    //     render(window.location.pathname);
    // };

    // 랜더!!!
    const render = () => {
        const path = window.location.pathname

        // 로그인 정보 체크
        const isUser = JSON.parse(localStorage.getItem("user"))
    
        // 로그인 상태에서 로그인 페이지로 이동시
        if (isUser && path === "/login") {
          return navigateTo("/")
        }
        // 비로그인 상태에서 프로필 페이지로 이동시
        if (!isUser && path === "/profile") {
          return navigateTo("/login")
        }

        const component = routes[path] || routes["/404"];
        document.querySelector("#root").innerHTML = component(); // 컴포넌트 호출하여 HTML 삽입
    };


    // 경로 변경
    const navigateTo = (path) => {
        window.history.pushState({}, path, window.location.origin + path)
        render()
    };


    // popstate 이벤트 리스너 등록
    // window.addEventListener('popstate', handlePopState);

    // 외부에서 접근할 수 있는 함수들을 반환
    return {
        addRoute,
        navigateTo,
        render,
    };
      
      
}

