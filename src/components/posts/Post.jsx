/** @jsx createVNode */
import { createVNode } from '@/lib';

export const Post = ({ posts }) => {
  return createVNode(
    'div',
    { id: 'posts-container', class: 'space-y-4' },
    posts.map((post) => {
      return createVNode('div', { class: 'bg-white rounded-lg shadow p-4 mb-4' }, [
        createVNode('div', { class: 'flex items-center mb-2' }, [
          createVNode('img', {
            src: 'https://via.placeholder.com/40',
            alt: '프로필',
            class: 'rounded-full mr-2',
          }),
          createVNode('div', null, [
            createVNode('div', { class: 'font-bold' }, post.author),
            createVNode('div', { class: 'text-gray-500 text-sm' }, post.time),
          ]),
        ]),
        createVNode('p', null, post.content),
        createVNode('div', { class: 'mt-2 flex justify-between text-gray-500' }, [
          createVNode('span', { class: 'like-button', 'data-post-id': post.id }, '좋아요'),
          createVNode('span', null, '댓글'),
          createVNode('span', null, '공유'),
        ]),
      ]);
    }),
  );
};
