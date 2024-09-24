import { renderPage } from '../src/main';

//로그인 정보 상태
const state = {
    user: JSON.parse(localStorage.getItem("user")) || null, // 새로고침되면 state가 초기화돼서 localStorage에 있는 데이터 가져오기
};

// 상태 업데이트 함수
const setState = (newState,path) => {
    //object 변경
    Object.assign(state, newState);
    //페이지 리렌더링
    renderPage(path)
};

export { state, setState}
