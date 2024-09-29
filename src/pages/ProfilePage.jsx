/** @jsx createVNode */
import { createVNode } from '@/lib';
import { Header, Footer, Navigation } from '@/components';
import { userStorage } from '@/storages';
import { updateUserInfo } from '@/main';

export const ProfilePage = () => {
  const { username, bio, email } = userStorage.get();

  return createVNode('div', { class: 'bg-gray-100 min-h-screen flex justify-center' }, [
    createVNode('div', { class: 'max-w-md w-full' }, [
      createVNode(Header, null, null),
      createVNode(Navigation, { loggedIn: !!username }, null),
      createVNode('main', { class: 'p-4' }, [
        createVNode('div', { class: 'bg-white p-8 rounded-lg shadow-md' }, [
          createVNode('h2', { class: 'text-2xl font-bold text-center text-blue-600 mb-8' }, ['내 프로필']),
          createVNode('form', { id: 'profile-form', onsubmit: updateUserInfo }, [
            createVNode('div', { class: 'mb-4' }, [
              createVNode('label', { class: 'block text-gray-700 text-sm font-bold mb-2' }, ['사용자 이름']),
              createVNode('input', {
                type: 'text',
                id: 'username',
                name: 'username',
                class: 'w-full p-2 border rounded',
                required: true,
                defaultValue: username,
                value: username,
              }),
            ]),
            createVNode('div', { class: 'mb-6' }, [
              createVNode('label', { class: 'block text-gray-700 text-sm font-bold mb-2', for: 'email' }, ['이메일']),
              createVNode('input', {
                type: 'email',
                id: 'email',
                name: 'email',
                class: 'w-full p-2 border rounded',
                required: true,
                defaultValue: email ?? '',
                value: email ?? '',
              }),
            ]),
            createVNode(
              'div',
              { class: 'mb-4' },
              createVNode('label', { class: 'block text-gray-700 text-sm font-bold mb-2', for: 'bio' }, ['자기소개']),
              createVNode(
                'textarea',
                {
                  id: 'bio',
                  name: 'bio',
                  class: 'w-full p-2 border rounded',
                  rows: 4,
                },
                [bio ?? ''],
              ),
            ),
            createVNode(
              'button',
              {
                type: 'submit',
                class: 'w-full bg-blue-600 text-white p-2 rounded font-bold',
                id: 'profile-submit-button',
              },
              ['프로필 업데이트'],
            ),
          ]),
        ]),
      ]),
      createVNode(Footer, null, null),
    ]),
  ]);
};
