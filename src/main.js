// 페이지 로더 함수
function pageLoader(template) {
  document.querySelector('#root').innerHTML = template
}

// 공통 헤더
function renderHeader() {
  const user = JSON.parse(localStorage.getItem('user'))
  const currentPath = window.location.pathname

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${currentPath === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}">홈</a></li>
        ${
          user
            ? `<li><a href="/profile" class="${
                currentPath === '/profile' ? 'text-blue-600 font-bold' : 'text-gray-600'
              }">프로필</a></li>
              <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
            : `<li><a href="/login" class="${
                currentPath === '/login' ? 'text-blue-600 font-bold' : 'text-gray-600'
              }">로그인</a></li>`
        }
      </ul>
    </nav>
  `
}

// 공통 푸터
function renderFooter() {
  return `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `
}

// 홈 메인
function renderHome() {
  const homeTemplate = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${renderHeader()}
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
        ${renderFooter()}
      </div>
    </div>
  `
  pageLoader(homeTemplate)

  //동적으로  / Link 감지해서 클래스 넣어줌(테스트 코드에 맞게 수정)
  const homeLink = document.querySelector('nav a[href="/"]')
  if (homeLink) {
    homeLink.classList.add('text-blue-600', 'font-bold')
  }

  addLogoutListener()
}

// 로그인 페이지
function renderLogin() {
  //로그인 예외처리 추가
  if (isLogIn()) {
    route('/')
    return
  }
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

  pageLoader(loginTemplate)

  // 로그인 클릭 이벤트 리스너
  const loginForm = document.getElementById('login-form')

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    try {
      const username = document.getElementById('username').value
      if (username) {
        // 사용자 정보 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify({ username: username, email: '', bio: '' }))
        route('/profile')
      }
    } catch (error) {
      //오류발생! template 렌더링
      errorBoundary(error)
    }
  })

  //에러 바운더리 구현(의도적인 오류입니다.) - 심확과제
  const usernameInput = document.getElementById('username')
  usernameInput.addEventListener(
    'input',
    () => {
      //username이 1일 때 조건 추가
      if (usernameInput.value === '1') {
        try {
          throw new Error('의도적인 오류입니다.')
        } catch (error) {
          errorBoundary(error)
        }
      }
    },
    { once: true },
  )
}

// 프로필 페이지
function renderProfile() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (!user || !user.username) {
    route('/login')
    return
  }

  const profileTemplate = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${renderHeader()} 
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
        ${renderFooter()} 
      </div>
    </div>
  `

  pageLoader(profileTemplate)

  // 로그아웃 버튼 이벤트 리스너
  addLogoutListener()

  // 프로필 폼 이벤트 리스너
  const profileForm = document.getElementById('profile-form')
  profileForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const updatedUsername = document.getElementById('username').value
    const updatedEmail = document.getElementById('email').value
    const updatedBio = document.getElementById('bio').value

    // 업데이트된 사용자 정보 로컬 스토리지에 저장
    localStorage.setItem(
      'user',
      JSON.stringify({
        username: updatedUsername,
        email: updatedEmail,
        bio: updatedBio,
      }),
    )
    alert('프로필이 업데이트되었습니다')
  })
}

// 404 페이지 렌더링
function renderNotFound() {
  const notFoundTemplate = `
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
  pageLoader(notFoundTemplate)
}

// 라우팅 구현
function route(path = window.location.pathname) {
  window.history.pushState({}, '', path)
  if (path === '/' || path === '/main') {
    renderHome()
  } else if (path === '/login') {
    //라우트 가드(리다이렉트) - 심화과제
    if (isLogIn()) {
      renderHome()
    } else {
      renderLogin()
    }
  } else if (path === '/profile') {
    if (isLogIn()) {
      renderProfile()
    } else {
      renderLogin()
    }
  } else if (path === '/404') {
    renderNotFound()
  } else {
    renderNotFound() // 잘못된 경로 접근 시 바로 NotFound 렌더링
  }
}

// 로그인 여부 확인
function isLogIn() {
  const user = JSON.parse(localStorage.getItem('user'))
  return user && user.username
}

// 로그아웃 버튼
function addLogoutListener() {
  const logoutButton = document.getElementById('logout')
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout)
  }
}

// 로그아웃 함수
function handleLogout(event) {
  event.preventDefault()
  localStorage.removeItem('user')
  route('/login')
}

window.addEventListener('popstate', () => {
  route()
})

//초기 라우팅
document.addEventListener('DOMContentLoaded', () => {
  route()
})

//로그인 에러 innerHtml 렌더링
function errorBoundary(error) {
  const errorTemplate = `
    <div>
       <p>오류 발생!</p>
      <p>${error.message}</p>
    </div>
  `
  pageLoader(errorTemplate)
}
