function App() {
  const AppEl = document.createElement("div");
  AppEl.setAttribute("class", "bg-gray-100 min-h-screen flex justify-center");
  AppEl.appendChild(Layout());

  return AppEl;
}

function Layout() {
  const LayoutEl = document.createElement("div");
  LayoutEl.setAttribute("class", "max-w-md w-full");
  LayoutEl.appendChild(HeaderComponent());

  LayoutEl.appendChild(Nav());
  return LayoutEl;
}

function HeaderComponent() {
  const HeaderEl = document.createElement("header");
  HeaderEl.setAttribute("class", "bg-blue-600 text-white p-4 sticky top-0");

  const TitleEl = document.createElement("h1");
  TitleEl.setAttribute("class", "text-2xl font-bold");

  TitleEl.textContent = "항해플러스";

  HeaderEl.appendChild(TitleEl);

  return HeaderEl;
}

function Nav() {
  const { routerPush } = Router();

  const NavEl = document.createElement("nav");
  NavEl.setAttribute("class", "bg-white shadow-md p-2 sticky top-14");

  const NavUlEl = document.createElement("ul");
  NavUlEl.setAttribute("class", "flex justify-around");

  NavUlEl.addEventListener("click", ({ target }) => {
    const routePath = target.getAttribute("href");
    routerPush(routePath);
  });

  const NavList = [
    { title: "홈", href: "/main" },
    { title: "프로필", href: "/profile" },
    { title: "로그아웃", href: "/logout" },
    { title: "로그인", href: "/login" },
  ];

  NavList.forEach(({ title, href }) => {
    const LiEl = document.createElement("li");

    LiEl.className = "flex-center";

    const AEl = document.createElement("a");
    AEl.className = "block w-full h-full text-center";
    if (window.location.pathname === href) {
      AEl.className += " text-blue-600";
    }
    AEl.setAttribute("href", href);
    AEl.setAttribute("onclick", "return false;");

    AEl.textContent = title;

    LiEl.appendChild(AEl);
    NavUlEl.appendChild(LiEl);
  });

  NavEl.appendChild(NavUlEl);

  return NavEl;
}

function Router() {
  const routerPush = (path) => {
    history.pushState(null, null, path);
  };
  return { routerPush };
}

document.querySelector("#root").appendChild(App());

// document.querySelector("#root").innerHTML = `
// <div class="bg-gray-100 min-h-screen flex justify-center">
//     <div class="max-w-md w-full">
//       <header class="bg-blue-600 text-white p-4 sticky top-0">
//         <h1 class="text-2xl font-bold">항해플러스</h1>
//       </header>

//       <nav class="bg-white shadow-md p-2 sticky top-14">
//         <ul class="flex justify-around">
//           <li><a href="./main.html" class="text-blue-600">홈</a></li>
//           <li><a href="./profile.html" class="text-gray-600">프로필</a></li>
//           <li><a href="#" class="text-gray-600">로그아웃</a></li>
//         </ul>
//       </nav>

//       <main class="p-4">
//         <div class="mb-4 bg-white rounded-lg shadow p-4">
//           <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
//           <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
//         </div>

//         <div class="space-y-4">

//           <div class="bg-white rounded-lg shadow p-4">
//             <div class="flex items-center mb-2">
//               <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
//               <div>
//                 <p class="font-bold">홍길동</p>
//                 <p class="text-sm text-gray-500">5분 전</p>
//               </div>
//             </div>
//             <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
//             <div class="mt-2 flex justify-between text-gray-500">
//               <button>좋아요</button>
//               <button>댓글</button>
//               <button>공유</button>
//             </div>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <div class="flex items-center mb-2">
//               <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
//               <div>
//                 <p class="font-bold">김철수</p>
//                 <p class="text-sm text-gray-500">15분 전</p>
//               </div>
//             </div>
//             <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
//             <div class="mt-2 flex justify-between text-gray-500">
//               <button>좋아요</button>
//               <button>댓글</button>
//               <button>공유</button>
//             </div>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <div class="flex items-center mb-2">
//               <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
//               <div>
//                 <p class="font-bold">이영희</p>
//                 <p class="text-sm text-gray-500">30분 전</p>
//               </div>
//             </div>
//             <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
//             <div class="mt-2 flex justify-between text-gray-500">
//               <button>좋아요</button>
//               <button>댓글</button>
//               <button>공유</button>
//             </div>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <div class="flex items-center mb-2">
//               <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
//               <div>
//                 <p class="font-bold">박민수</p>
//                 <p class="text-sm text-gray-500">1시간 전</p>
//               </div>
//             </div>
//             <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
//             <div class="mt-2 flex justify-between text-gray-500">
//               <button>좋아요</button>
//               <button>댓글</button>
//               <button>공유</button>
//             </div>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <div class="flex items-center mb-2">
//               <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
//               <div>
//                 <p class="font-bold">정수연</p>
//                 <p class="text-sm text-gray-500">2시간 전</p>
//               </div>
//             </div>
//             <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
//             <div class="mt-2 flex justify-between text-gray-500">
//               <button>좋아요</button>
//               <button>댓글</button>
//               <button>공유</button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer class="bg-gray-200 p-4 text-center">
//         <p>&copy; 2024 항해플러스. All rights reserved.</p>
//       </footer>
//     </div>
//   </div>
// `;
