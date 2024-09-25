  // 변수선언
  const isUserLoggedIn = () => !!localStorage.getItem('user');
  // 전역 변수로 이벤트 리스너 참조를 저장(렌더 후 이벤트 바인딩)
  let globalClickListener = null;

  /*
  * 컴포넌트 START
  */
  const Header = () => {
    return (
    `<header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a
            id="goMainBtn" 
            href="/"
            class="text-blue-600"
          >홈</a>
        </li>
        <li>
          <a 
            id="goProfileBtn"
            href="/profile"
            class="text-gray-600"
          >프로필</a>
        </li>
        <li>
          <a 
            id="${isUserLoggedIn() ? 'logout' : 'goLogInBtn'}" 
            href="${isUserLoggedIn() ? '/' : '/login'}"
            class="text-gray-600">
            ${isUserLoggedIn() ? '로그아웃' : '로그인'}
            </a>
        </li>
      </ul>
    </nav>`
    )
  }
  
  const Footer = () => {
    return (
      `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
      `
    )
    
  }
  
  const Main = () => {
    return (
      `
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            <!--header -->
            ${Header()}
            <main class="p-4">
              <div class="mb-4 bg-white rounded-lg shadow p-4">
                <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
                <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
              </div>
  
              <div class="space-y-4">
  
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center mb-2">
                    <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                    <div>
                      <p class="font-bold">홍길동</p>
                      <p class="text-sm text-gray-500">5분 전</p>
                    </div>
                  </div>
                  <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
                  <div class="mt-2 flex justify-between text-gray-500">
                    <button>좋아요</button>
                    <button>댓글</button>
                    <button>공유</button>
                  </div>
                </div>
  
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center mb-2">
                    <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                    <div>
                      <p class="font-bold">김철수</p>
                      <p class="text-sm text-gray-500">15분 전</p>
                    </div>
                  </div>
                  <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
                  <div class="mt-2 flex justify-between text-gray-500">
                    <button>좋아요</button>
                    <button>댓글</button>
                    <button>공유</button>
                  </div>
                </div>
  
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center mb-2">
                    <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                    <div>
                      <p class="font-bold">이영희</p>
                      <p class="text-sm text-gray-500">30분 전</p>
                    </div>
                  </div>
                  <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
                  <div class="mt-2 flex justify-between text-gray-500">
                    <button>좋아요</button>
                    <button>댓글</button>
                    <button>공유</button>
                  </div>
                </div>
  
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center mb-2">
                    <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                    <div>
                      <p class="font-bold">박민수</p>
                      <p class="text-sm text-gray-500">1시간 전</p>
                    </div>
                  </div>
                  <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
                  <div class="mt-2 flex justify-between text-gray-500">
                    <button>좋아요</button>
                    <button>댓글</button>
                    <button>공유</button>
                  </div>
                </div>
  
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center mb-2">
                    <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                    <div>
                      <p class="font-bold">정수연</p>
                      <p class="text-sm text-gray-500">2시간 전</p>
                    </div>
                  </div>
                  <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
                  <div class="mt-2 flex justify-between text-gray-500">
                    <button>좋아요</button>
                    <button>댓글</button>
                    <button>공유</button>
                  </div>
                </div>
              </div>
            </main>
            ${Footer()}
            <!--footer-->
          </div>
        </div>
      `
    )
  }
  const Login = () => {
    return (
    `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input 
                id="username"
                type="text" 
                placeholder="이메일 또는 전화번호" 
                class="w-full p-2 border rounded"
                >
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
            </div>
            <button 
              id="logInSubmitBtn"
              type="submit" 
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
            >
              로그인
            </button>
          </form>
          <div class="mt-4 text-center">
            <a 
              href="javascript:void(0)"
              class="text-blue-600 text-sm"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
    `
  )
  }
  const Profile = () => {
    return (
      `<div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <!--header-->
          ${Header()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
              <form>
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="홍길동" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="hong@example.com" class="w-full p-2 border rounded">
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea>
                </div>
                <button 
                  id="updateProfileBtn"
                  type="submit" 
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                프로필 업데이트</button>
              </form>
            </div>
          </main>
  
          ${Footer()}
          <!--footer-->
        </div>
      </div>
      `
    )
  }
  const Error = () => {
    return (
      `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <a
            id="goMainBtn"
            href="/" 
            class="bg-blue-600 text-white px-4 py-2 rounded font-bold"
          >
            홈으로 돌아가기
          </a>
        </div>
      </main>
      `
    )
  }

  /*
  * 초기 설정 및 이벤트 리스너
  */
  // 뒤로가기 시 설정
  window.addEventListener('popstate', handleLocation);
  window.addEventListener('DOMContentLoaded', () => {
    handleLocation();
  });


  /*
  * 라우트 정의 START
  */
  const routes = {
    '/': { title: 'Main', render: Main(), hasHeader: true },
    '/login': { title: 'Login', render: Login(), hasHeader: false},
    '/profile': { title: 'Profile', render: Profile(), hasHeader: true},
    '/404': { title: '404', render: Error(), hasHeader: false },
  };
    
  // 라우트 변경 처리 함수
  function handleLocation() {
    const path = window.location.pathname;
    
    let route = routes[path] || routes['/404']; // 존재하지 않은 경로로 접근하면 404 페이지가 렌더링됨

    if(!isUserLoggedIn() && path === '/profile') {//url로 비로그인일 때 프로필 페이지 접근 시 
      route = routes['/login']
      navigate('/login'); // URL을 login으로 변경하며 handleLocation 호출
      return;
    } 
    renderContent(route);
  }


  // 라우트 렌더링 함수
  function renderContent(route) {
    const root = document.getElementById('root');

    root.innerHTML = route.render;
    document.title = route.title;


    if(route.title === 'Profile') {
      setuUserInfo()
    }

    // 기존 이벤트 리스너 제거
    if (globalClickListener) {
      document.removeEventListener('click', globalClickListener);
    }

    // 렌더링 후 이벤트 리스너 설정(동적으로 DOM이 생성되므로 이벤트위임)
    // 새로운 이벤트 리스너 생성 및 추가
    globalClickListener = function(e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {

        e.preventDefault()
        e.stopPropagation(); // 이벤트버블링 막기

        switch(e.target.id) {
          case 'logout': 
            goLogOut(e);
            break;
        
          case 'logInSubmitBtn':
            loginSubmit(e);
            break;
          case 'updateProfileBtn':
            updateProfile(e);
            break
          case 'goLogInBtn':
          case 'goProfileBtn':
          case 'goMainBtn':
            navigate(e.target.getAttribute('href'));
            break;
          default:
        }
      } 
    }

    document.addEventListener('click', globalClickListener);
    
  }


  // 네비게이션 함수
  function navigate(path) {
    
    if(path === '/profile' && !isUserLoggedIn()){
      path = '/login'
    }
    window.history.pushState({}, '', path);
    handleLocation();
  }


  /*
  * 로그인/로그아웃 관련 로직
  */
 function loginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('username').value
  localStorage.setItem('user', JSON.stringify({"username":username, "email":"", "bio":""}))
  navigate('/profile');
 }

 function goLogOut(e) {
  e.preventDefault();
  localStorage.removeItem('user')
  renderContent(routes['/login']); 
  navigate('/login');
 }

/*
* 프로필페이지 관련 로직
*/
// 프로필 페이지 로그인한 사용자의 이름과 소개 초기 주입
function setuUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo.username
  const email = userInfo.email
  const bio = userInfo.bio

  document.getElementById('username').value = username
  document.getElementById('email').value = email
  document.getElementById('bio').value = bio
}

// 프로필 업데이트
function updateProfile(e) {
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const bio = document.getElementById('bio').value
  
  localStorage.setItem('user', JSON.stringify({username, email, bio}))

  alert('프로필이 업데이트 되었습니다.')
}

