/** @jsx createVNode */
import { Footer, Header, Navigation, Post, PostForm } from '@/components';
import { createVNode } from '@/lib';
import { userStorage } from '@/storages';
import { globalStore } from '@/stores';

export const HomePage = () => {
  const posts = globalStore.getState().posts;
  const loggedIn = userStorage.get();

  return createVNode('div', { class: 'bg-gray-100 min-h-screen flex justify-center' }, [
    createVNode('div', { class: 'max-w-md w-full' }, [
      createVNode(Header, null, null),
      createVNode(Navigation, { loggedIn }, null),
      createVNode('main', { class: 'p-4' }, [loggedIn && PostForm(), Post({ posts })]),
      createVNode(Footer, null, null),
    ]),
  ]);
};
