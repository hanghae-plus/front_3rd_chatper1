// /** @jsx createVNode */
// import { createVNode } from '../../lib';

// const NavItem = ({ href, label, isLogout }) => {
//   const getNavItemClass = (href) => {
//     return location.pathname === href
//       ? 'text-blue-600 font-bold'
//       : 'text-gray-600';
//   };
//   return (
//     <li>
//       <a
//         href={isLogout ? undefined : href}
//         class={isLogout ? 'text-gray-600' : getNavItemClass(href)}
//         data-link
//       >
//         {label}
//       </a>
//     </li>
//   );
// };

// export const Navigation = ({ loggedIn }) => {
//   const navItems = [
//     { href: '/', label: '홈', show: true },
//     { href: '/login', label: '로그인', show: !loggedIn },
//     { href: '/profile', label: '프로필', show: loggedIn },
//     { href: '#', label: '로그아웃', show: loggedIn, isLogout: true }
//   ];

//   return (
//     <nav class="bg-white shadow-md p-2 sticky top-14">
//       <ul class="flex justify-around">
//         {navItems.map(({ href, label, show, isLogout }) =>
//           show ? (
//             <NavItem
//               key={label}
//               href={href}
//               label={label}
//               isLogout={isLogout}
//             />
//           ) : null
//         )}
//       </ul>
//     </nav>
//   );
// }; ///null 로 하면 테스트 코드 통과 안함.

/** @jsx createVNode */
import { createVNode } from '../../lib';

export const Navigation = ({ loggedIn }) => {
  const currentPath = window.location.pathname;

  const getNavItemClass = (path) => {
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-md p-2 sticky top-14">
      <ul className="flex justify-around">
        <li>
          <a href="/" className={getNavItemClass('/')} data-link="true">
            홈
          </a>
        </li>
        {!loggedIn && (
          <li>
            <a
              href="/login"
              className={getNavItemClass('/login')}
              data-link="true"
            >
              로그인
            </a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a
              href="/profile"
              className={getNavItemClass('/profile')}
              data-link="true"
            >
              프로필
            </a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a href="#" id="logout" className="text-gray-600">
              로그아웃
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
