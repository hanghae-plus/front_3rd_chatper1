/** @jsx createVNode */
import { createVNode } from '../lib';
import { DefaultLayout } from '../layouts';
import { globalStore } from '../stores';

import { Post } from '../components';

export const HomePage = () => {
  const { posts } = globalStore.getState();

  return (
    <DefaultLayout>
      <main class="p-4">
        <div id="posts-container" class="space-y-4">
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </main>
    </DefaultLayout>
  );
};
