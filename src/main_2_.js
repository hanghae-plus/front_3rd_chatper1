const Header = (login) => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
  
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-blue-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
             <li><a href="" id="logout" class="logout text-gray-600">${login === 'T' ?`로그아웃` : '로그인'}</a></li>
            
          </ul>
        </nav>
`;

const footer =  `
    <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
`;


const getHtml = (path, login) =>{
  console.log(JSON.parse(localStorage.getItem("user")))
  const mainPage = {
    title : '항해플러스 - 홈',
    content : `<div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
       ${Header(login)}
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
      ${footer}
      </div>
    </div>`
  }

  const profilePage = {
    title : '항해플러스 - 프로필',
    content : `  <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
       ${Header(login)}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
             <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${
                JSON.parse(localStorage.getItem("user"))?.username || ""
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${
                JSON.parse(localStorage.getItem("user"))?.email || ""
              }" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${
                JSON.parse(localStorage.getItem("user"))?.bio || ""
              }</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
          </form>
          </div>
        </main>
  
        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>`
  }
  
  const loginPage = {
    title : '항해플러스 - 로그인',
    content : ` <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form>
            <div class="mb-4">
              <input type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>`
  }
  
  const errorPage = {
    title : '항해플러스 - 오류',
    content : `<main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <a href="./main.html" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            홈으로 돌아가기
          </a>
        </div>
      </main>`
  }

  if(path === '/'){
    return mainPage
  }else if(path === '/login'){
    return loginPage
  }else if (path === '/profile'){
    // 로그인이 되지 않은 상태에서 "/profile" 경로로 접근하면, 로그인 페이지로 리다이렉션 된다.
    if(localStorage.getItem('login') === 'F'){
      return loginPage
    }else{
      return profilePage
    }
  }else{
    return errorPage
  }

}

// 페이지 렌더링 함수
const renderPage = async (pathUrl) => {

  // const page = routes[path] || 'error';

  let path = pathUrl || window.location.pathname
  const {title, content} = getHtml(path, localStorage.getItem('login'))

  const root = document.querySelector('#root');
  document.title = title;
  root.innerHTML = content


};

  // popstate 이벤트 처리
  window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
  });

  // 네비게이션 이벤트 처리
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('a[data-link]')) {
      console.log('네비게이션 이벤트 처리', e.target)
      e.preventDefault();
      const url = e.target.getAttribute('href');
      navigateTo(url);
    }
  });

  // 로그아웃 버튼 기능 구현
  window.addEventListener('click', (e)=>{

    const { tagName, id } = e.target
    console.log('id', id)
    console.log('tagName', tagName)
    if (tagName === "A") {
      console.log('로그아웃 버튼 기능 구현', e.target)

      // 기본 동작 방지
      e.preventDefault()
  
      // 로그아웃 버튼 클릭 시
      if (id === "logout") {
        ///localStorage 유저정보 삭제
        localStorage.removeItem("user")
        localStorage.setItem("login", 'F')
        goTo('/')

      }
    goTo(e.target.getAttribute("href"))
      
    }

    const thirdLi = document.querySelectorAll('nav li')[2];

  })

  //submit : 로그인 버튼 기능 구현
  window.addEventListener('submit', (e)=>{
    if(document.title.includes('로그인')){
      e.preventDefault()
      console.log('login submit', e.target)
      const username = e.target.querySelector("input")?.value
      console.log(username)
      if(!username){
      }else{
        localStorage.setItem('user', JSON.stringify({ username : username  }))
        localStorage.setItem('login', 'T')

        renderPage('/profile')
      }
    }

    if(document.title.includes('프로필')){
      e.preventDefault()
      console.log('프로필 submit', e.target)

      e.stopPropagation(); // click 이벤트가 실행되지 않도록 전파 방지
      const username = e.target.querySelector("#username")?.value
      const email = e.target.querySelector("#email")?.value
      const bio = e.target.querySelector("#bio")?.value
      localStorage.setItem('user', JSON.stringify({ username, email, bio }))
    }
  })

   // 페이지 이동 함수
  const navigateTo = (url) => {
    history.pushState(null, null, url);
    renderPage(url);
  };

  // 경로 이동 함수
    function goTo(path) {
      window.history.pushState({}, "", path) // url 변경
      renderPage(path)
    }

  // 초기 페이지 렌더링
  localStorage.setItem('login', 'F')
  renderPage();


