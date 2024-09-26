
const Header = (isLogin) => {
  const homePage = window.location.pathname === "/"
  // console.log(isLogin)
  // 부모 컴포넌트가 자식 컴포넌트에 props 전달하는 방법 : 콜백함수에 담아서 

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav id="gnb" class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
        <li><a href="/" class="${
          homePage ? "text-blue-600 font-bold" : "text-gray-600 font-bold"
        }">홈</a></li>
        ${ isLogin ? `
          <li><a href="/profile" id="login" class="${
              !homePage ? "text-blue-600 font-bold" : "text-gray-600 font-bold"
            }">프로필</a></li>
          <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
          `
            : `
          <li><a href="/login" class="text-gray-600">로그인</a></li>
          `
        }
      </ul>
      </nav>
      `;
    
};

export default Header;