/** @jsx createVNode */
import { createVNode } from '@/lib';
import { handleLogin } from '@/main';

export const LoginPage = () => {
  return createVNode('div', null, [
    createVNode('main', { class: 'bg-gray-100 flex items-center justify-center min-h-screen' }, [
      createVNode('div', { class: 'bg-white p-8 rounded-lg shadow-md w-full max-w-md' }, [
        createVNode('h1', { class: 'text-2xl font-bold text-center text-blue-600 mb-8' }, ['항해플러스']),
        createVNode(
          'form',
          { class: 'bg-white p-8 rounded-lg shadow-md w-full max-w-md', id: 'login-form', onSubmit: handleLogin },
          [
            createVNode('div', { class: 'mb-4' }, [
              createVNode('input', {
                type: 'text',
                id: 'username',
                placeholder: '이메일 또는 전화번호',
                class: 'w-full p-2 border rounded',
              }),
            ]),
            createVNode('div', { class: 'mb-6' }, [
              createVNode('input', {
                type: 'password',
                placeholder: '비밀번호',
                class: 'w-full p-2 border rounded',
              }),
            ]),
            createVNode(
              'button',
              {
                type: 'submit',
                class: 'w-full bg-blue-600 text-white p-2 rounded font-bold',
                id: 'login-submit-button',
              },
              ['로그인'],
            ),
          ],
        ),
        createVNode('div', { class: 'mt-4 text-center' }, [
          createVNode('a', { href: '#', class: 'text-blue-600 text-sm' }, ['비밀번호를 잊으셨나요?']),
        ]),
        createVNode('hr', { class: 'my-6' }),
        createVNode('div', { class: 'text-center' }, [
          createVNode('button', { class: 'bg-green-500 text-white px-4 py-2 rounded font-bold' }, ['새 계정 만들기']),
        ]),
      ]),
    ]),
  ]);
};
