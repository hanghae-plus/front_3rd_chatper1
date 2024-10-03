/** @jsx createVNode */
import { createVNode } from '../lib';
import { DefaultLayout } from '../layouts';
import { globalStore } from '../stores';

import { Post, PostForm } from '../components';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();

  return (
    <DefaultLayout>
      <main class="p-4">
        {loggedIn && PostForm()}
        <div id="posts-container" class="space-y-4">
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </main>
    </DefaultLayout>
  );
};
