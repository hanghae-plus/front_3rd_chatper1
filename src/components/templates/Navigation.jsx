/** @jsx createVNode */
import { createVNode } from '../../lib';
import { getNavItemClass } from '../../utils/util';

export const Navigation = ({ loggedIn }) => {
    if (!loggedIn) {
        return `<li><a href="/login" class="${getNavItemClass('/login')}" data-link>로그인</a></li>`;
    }

    return `
      <li><a href="/profile" class="${getNavItemClass('/profile')}" data-link>프로필</a></li>
      <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
    `;
};
