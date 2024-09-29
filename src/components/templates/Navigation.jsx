/** @jsx createVNode */
import { createVNode } from '@/lib';
import { logout } from '@/main';

export const Navigation = ({ loggedIn }) => {
  if (loggedIn) {
    return createVNode('nav', { class: 'bg-white shadow-md p-2 sticky top-14' }, [
      createVNode('ul', { class: 'flex justify-around' }, [
        createVNode('li', null, [
          createVNode('a', { href: '/', class: 'text-blue-600 font-bold', 'data-link': true }, '홈'),
        ]),

        createVNode('li', null, [
          createVNode('a', { href: '/profile', class: 'text-gray-600', 'data-link': true }, '프로필'),
        ]),
        createVNode('li', {}, [
          createVNode('a', { id: 'logout', href: '#', class: 'text-gray-600', onClick: logout }, '로그아웃'),
        ]),
      ]),
    ]);
  } else {
    return createVNode('nav', { class: 'bg-white shadow-md p-2 sticky top-14' }, [
      createVNode('ul', { class: 'flex justify-around' }, [
        createVNode('li', null, [
          createVNode('a', { href: '/', class: 'text-blue-600 font-bold', 'data-link': true }, '홈'),
        ]),
        createVNode('li', null, [
          createVNode(
            'a',
            {
              href: '/login',
              class: 'text-gray-600',
              'data-link': true,
            },
            '로그인',
          ),
        ]),
      ]),
    ]);
  }
};
