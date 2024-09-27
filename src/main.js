const render = (html) =>{
  document.querySelector('#root').innerHTML = html
}

const Header = () =>{
  const login = localStorage.getItem('login')
  const path = window.location.pathname

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${path === '/' ? 'text-blue-600' : 'text-gray-600'}">홈</a></li>
        ${
          login === 'T'
            ? `<li><a href="/profile" class="${
                path === '/profile' ? 'text-blue-600' : 'text-gray-600'
              }">프로필</a></li>
              <li><a href="" id="logout" class="text-gray-600">${login === 'T' ?`로그아웃` : '로그인'}</a></li>`
            : `<li><a href="/login" class="${
                path === '/login' ? 'text-blue-600' : 'text-gray-600'
              }">로그인</a></li>`
        }
      </ul>
    </nav>
  `
}

// 공통 푸터
const Footer= () =>{
  return `
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`
}

const Main = () =>{
  const homeHtml = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>
          <div class="space-y-4">
            <!-- 게시물 리스트 -->
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `
  render(homeHtml)
  const logoutButton = document.getElementById('logout')
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout)
  }
}

const Login = () =>{
  const loginTemplate = `
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded" required>
        </div>
        <div class="mb-4">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
    </div>
  </div>
`
render(loginTemplate)

 const loginForm = document.getElementById('login-form')
 loginForm.addEventListener('submit', (event) => {
   event.preventDefault()
   const username = document.getElementById('username').value
   if (username) {
     localStorage.setItem('login', 'T')
     localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }))
     route('/profile')
   }
 })
}

const Profile = () =>{
  let user = JSON.parse(localStorage.getItem('user'))
  
  const html = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()} 
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" value="${user.username}" class="w-full p-2 border rounded" required>
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" value="${user.email}" class="w-full p-2 border rounded">
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" rows="4" class="w-full p-2 border rounded required">${user.bio}</textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>
        ${Footer()} 
      </div>
    </div>
  `
  render(html)

  const logoutButton = document.getElementById('logout')
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout)
  }
  
  const profileForm = document.getElementById('profile-form')
  profileForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const bio = document.getElementById('bio').value

    // 업데이트된 사용자 정보 로컬 스토리지에 저장
    localStorage.setItem(
      'user',
      JSON.stringify({
        username,
        email,
        bio,
      }),
    )
  })
}

const NotFound = () =>{
  const html = `
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">홈으로 돌아가기</a>
    </div>
  </div>
`
render(html)
}


function handleLogout() {
  localStorage.removeItem("user")
  localStorage.setItem("login", 'F')
  redirectTo('/')
}

// 라우팅 처리
const route = async (pathUrl) => {
  let path = pathUrl || window.location.pathname
  window.history.pushState({}, '', path)

  if(path === '/' ) {
    Main()
  } else if(path === '/login') {
    Login()
  } else if(path === '/profile') {
    localStorage.getItem('login')==='T' ? Profile() : Login()
  } else if (path === '/404') {
    NotFound()
  } else {
    NotFound() 
  }
};



  // 경로 이동 함수
    function redirectTo(path) {
      window.history.pushState({}, "", path) // url 변경
      route(path)
    }

  // popstate 이벤트 처리
  window.addEventListener('popstate', () => {
    route(window.location.pathname);
  });




    // 네비게이션 이벤트 처리
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('a[data-link]')) {
        e.preventDefault();
        redirectTo(e.target.getAttribute('href'));
      }
    });

  // 초기 페이지 렌더링
  route();


