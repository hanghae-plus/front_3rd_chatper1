/** @jsx createVNode */
import { createElement, createRouter, createVNode, renderElement } from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { userStorage } from "./storages";
import { addEvent, registerGlobalEvents } from "./utils";
import { App } from "./App";

const getRouteComponent = (path) => {
  const { loggedIn } = globalStore.getState();
  
  if(path === "/") {
      return <HomePage/>;
  }else if(path === "/login") {
    if(loggedIn){
      window.history.pushState('', '', '/')
      return <HomePage/>
    }
    return <LoginPage/>
  }else if(path === "/profile") {
    if(!loggedIn){
      window.history.pushState('', '', '/login')
      return <LoginPage/>
    }
    return <ProfilePage/>
  }else{
    return null
  }
  
};

const router = createRouter({ 
  "/": () => getRouteComponent("/"), 
  "/login": () => getRouteComponent("/login"), 
  "/profile": () => getRouteComponent("/profile"), 
});

function logout() {
  globalStore.setState({ currentUser: null, loggedIn: false });
  router.push('/login');
  userStorage.reset();
}

function handleError(error) {
  globalStore.setState({ error });
}

// 초기화 함수
function render() {
  const $root = document.querySelector('#root');
  try {
    renderElement(<App targetPage={router.getTarget()} />, $root);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      router.push("/");
      return;
    }
    if (error instanceof UnauthorizedError) {
      router.push("/login");
      return;
    }

    console.error(error);

    // globalStore.setState({ error });
  }
  registerGlobalEvents();
}

function main() {
  router.subscribe(render);
  globalStore.subscribe(render);
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleError);

  addEvent('click', '[data-link]', (e) => {
    e.preventDefault();
    router.push(e.target.href.replace(window.location.origin, ''));
  });

  addEvent('click', '#logout', (e) => {
    e.preventDefault();
    logout();
  });

  addEvent('click', '#error-boundary', (e) => {
    e.preventDefault();
    globalStore.setState({ error: null });
  });

  addEvent('submit', '#login-form', (e) => {
    e.preventDefault();
    try{
      const username = document.querySelector('#username').value.trim();

      if(!username){
        alert('이메일 또는 전화번호를 입력해 주세요.')
        return
      }
  
      const userInfo = {
        username : username,
        email : '',
        bio : ''
      }
      setStore(userInfo)
      router.push('/profile');
    }catch(e){
      globalStore.setState({
        error : e
      });
    }

  });


  addEvent('submit', '#profile-form', (e) => {
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
    e.preventDefault();

    const username = document.querySelector('#username')?.value.trim();
    const email = document.querySelector('#email')?.value.trim();
    const bio = document.querySelector('#bio').value;

    const userInfo = {
      username: username,
      email: email,
      bio: bio,
    };
    alert("프로필이 성공적으로 업데이트되었습니다.");
    setStore(userInfo);
    }
  })
  render();
}

const setStore = (userInfo)=>{
  userStorage.set(userInfo)
  globalStore.setState({
    currentUser: userInfo,
    loggedIn : true
  });
}

main();
