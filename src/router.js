
export const createRouter = () => {
    const routes = {};
    
    // 경로 추가
    const addRoute = (path, handler) => {
        routes[path] = handler;
    };

    // Popstate 이벤트 핸들러
    const handlePopState = () => {
        render(window.location.pathname);
    };

    // 랜더!!!
    const render = (path) => {
        const component = routes[path] || routes["/404"];
        document.querySelector("#root").innerHTML = component(); // 컴포넌트 호출하여 HTML 삽입
    };


    // 경로 변경
    const navigateTo = (path) => {
        history.pushState({}, '', path);
        render(path);
    };


    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // 외부에서 접근할 수 있는 함수들을 반환
    return {
        addRoute,
        navigateTo,
        render,
    };
      
      
}

