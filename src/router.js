
export const createRouter = () => {
    const routes = {};
    
    // 경로에 따른 페이지 
    const addRoute = (path, handler) => {
        // routes객체의 키를 path, 값을 handler(페이지컴포넌트)로 받아옴
        routes[path] = handler;
    }

    // 랜더!!!
    const render = () => {
        const path = window.location.pathname

        // 유저 정보 체크 이 아래부터 심화
    
        // 문제는 이렇게 할 경우 컴포넌트에 사용했던 isLogin 값이 바뀌지 않음..헤더에 영향
        // 로컬스토리지에서 데이터 가져오기
        const newisLogin = JSON.parse(localStorage.getItem("user"))
    
        // 로그인 상태에서 로그인 페이지로 이동시
        if (newisLogin && path === "/login") {
            return navigateTo("/")
        }

        // 비로그인 상태에서 프로필 페이지로 이동시
        if (!newisLogin === null && path === "/profile") {
            return navigateTo("/login")

        }

        const component = routes[path] || routes["/404"];
        document.querySelector("#root").innerHTML = component(); // 컴포넌트 호출하여 HTML 삽입
    }

    // 경로 변경
    const navigateTo = (path) => {
        window.history.pushState({}, path, window.location.origin + path)
        render()
    }


    return {
        addRoute,
        render,
        navigateTo,
    }
      
}

